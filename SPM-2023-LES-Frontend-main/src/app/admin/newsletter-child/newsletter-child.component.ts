import { Component, OnInit } from '@angular/core';
import { DashboardManagerService } from '../../service/dashboardManager/dashboardManager.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Newsletter} from "../../model/newsletter/newsletter";
import {Admin} from "../../model/admin/admin";
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";
import {Producer} from "../../model/producer/producer";

@Component({
  selector: 'app-newsletter-child',
  templateUrl: './newsletter-child.component.html',
  styleUrl: './newsletter-child.component.css'
})
export class NewsletterChildComponent implements OnInit {

  id : any;
  newsletter : Newsletter = new Newsletter();
  urlImage : any = null;
  listNewsletter : Newsletter[];
  admin : Admin;
  producer: Producer;

  constructor(private serviceManager : DashboardManagerService,
              private  route: ActivatedRoute,
              private router : Router,
              private loginService: LoginrequestService) {
    this.listNewsletter= [];
    this.admin = new Admin();
    this.producer= new Producer();
  }

  ngOnInit(): void {
    this.serviceManager.getLoggedAdmin().subscribe({
      next:(data: Admin) => {
      this.admin = data;
      },
      error:() => {
        this.loginService.clearAll();
        this.router.navigate(["/home"]);
      }
    });

    this.route.paramMap.subscribe((params  : ParamMap) => {
      this.id = params.get('id')!;
    });

     this.serviceManager.getGetNewsletterURL(this.id).subscribe((data : any) =>{
       this.newsletter = data;

       if(this.newsletter.image){console.log("NL Image:" + this.newsletter.image);
          this.urlImage = 'data:image/*;base64,'+ this.newsletter.image;}
        this.serviceManager.getProducer(this.newsletter.producerID).subscribe( (data:Producer) =>{
        console.log("Producer:" + data);
        this.producer = data;});
     });
      }



  // BUTTONS--------------------------------------------
  onAccetta(id : any){

      this.serviceManager.approveNewsletter(id).subscribe({
        next:(data: any) => {
          console.log(data);
          this.router.navigate(['/dashboardAdmin/newsletter']).then(() => window.location.reload())
          this.serviceManager.sendNewsletter(id).subscribe(
            (data: any) => {
              alert(data.result)
              console.log(data);
            },
            (error: any) => { console.log(error.error);}
          )},
        error:(error) => console.log(error.error) });
  }

  onRifiuta(id: any){
    console.log(id);
      this.serviceManager.rejectNewsletter(id).subscribe({
        next:(data: any) => {
          console.log(data);
          this.router.navigate(['/dashboardAdmin/newsletter']).then(() => window.location.reload())
        },
        error:(error) => console.log(error.error) });
  }



}
