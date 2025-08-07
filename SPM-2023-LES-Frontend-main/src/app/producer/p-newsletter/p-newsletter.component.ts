import {Component, OnInit} from '@angular/core';
import {DashboardManagerService} from "../../service/dashboardManager/dashboardManager.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Producer} from "../../model/producer/producer";
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";
import {Newsletter} from "../../model/newsletter/newsletter";
import {Admin} from "../../model/admin/admin";

@Component({
  selector: 'app-p-newsletter',
  templateUrl: './p-newsletter.component.html',
  styleUrl: './p-newsletter.component.css'
})
export class PNewsletterComponent implements OnInit{

  id : any;
  newsletter : Newsletter;
  urlImage : any = null;
  listNewsletterProducer: Newsletter[];
  producer: Producer;

  constructor(private serviceManager : DashboardManagerService,
              private  route: ActivatedRoute,
              private loginService: LoginrequestService,
              private router: Router) {
    this.listNewsletterProducer = [];
    this.newsletter = new Newsletter();
    this.producer = new Producer();
  }


  ngOnInit() {
    this.serviceManager.getLoggedProducer().subscribe(
      (data: Producer) => {
      this.producer = data;

        this.route.paramMap.subscribe((params  : ParamMap) => {
          this.id = params.get('id')!;
        })

      this.serviceManager.getNewsletterProducer(this.producer.id).subscribe({
        next: (data : any) => {
        this.listNewsletterProducer = Object.keys(data).map((key) => {return data [key];});
        this.findNewsletter();

        if(this.newsletter){ this.urlImage = 'data:image/*;base64,'+ this.newsletter.image;}
        },
      error: () => {
      this.loginService.clearAll();
      this.router.navigate(["/home"]);
      }});
      });
  }
  findNewsletter(){
    for (let i =0 ; i < this.listNewsletterProducer.length; i ++){
      if(this.listNewsletterProducer[i].id == this.id)
        this.newsletter = this.listNewsletterProducer[i];
    }
  }

}
