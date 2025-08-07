import { Component, OnInit } from '@angular/core';
import { DashboardManagerService } from '../../service/dashboardManager/dashboardManager.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { Producer } from '../../model/producer/producer';
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";
import {Admin} from "../../model/admin/admin";

@Component({
  selector: 'app-producer-child',
  templateUrl: './producer-child.component.html',
  styleUrl: './producer-child.component.css'
})
export class ProducerChildComponent implements OnInit {

  id : any;
  listProducer : Producer[];
  producer : Producer;
  admin: Admin;
  base64Image : any;
  producerID :any;

  constructor(private serviceManager : DashboardManagerService,
              private  route: ActivatedRoute,
              private router : Router,
              private loginService: LoginrequestService) {
    this.listProducer = [];
    this.producer = new Producer();
    this.admin= new Admin();
  }

  ngOnInit(): void {
    this.serviceManager.getLoggedAdmin().subscribe(
      (data: Admin) => { this.admin = data;},
      () => {
      this.loginService.clearAll();
      this.router.navigate(["/home"]);
    });

    this.route.paramMap.subscribe((params  : ParamMap) => {
    this.id = params.get('id')!;
    console.log(this.id)
    });

    this.serviceManager.getProducer(this.id).subscribe(
      (data : any) => {this.producer = data;});
}

  onAccetta(){
    if(this.producer.id != null)
      this.serviceManager.acceptProducer(this.producer.id).subscribe(
        (data: any) => {
          this.router.navigate(['/dashboardAdmin/producer']).then(() => window.location.reload())
        }, (error) => {
          console.log(error.error.error);
        });
}

  onRifiuta(){
    if(this.producer.id != null)
      this.serviceManager.rejectProducer(this.producer.id).subscribe(
      (data: any) => {
        this.router.navigate(['/dashboardAdmin/producer']).then(() => window.location.reload())
      }, (error) => {
        console.log(error.error);
      });
}


}









/*

  ngOnInit(): void {
    this.route.paramMap.subscribe((params  : ParamMap) => {
    this.id = +params.get('id')!;
    })

  this.serviceManager.getProducersNotActive().subscribe((data : any ) =>{
  this.listProducer = Object.keys(data).map((key) => {return data [key]})});

}

*/
