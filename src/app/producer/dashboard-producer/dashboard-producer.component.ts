import {Component, OnInit} from '@angular/core';
import {DashboardManagerService} from "../../service/dashboardManager/dashboardManager.service";
import {Producer} from "../../model/producer/producer";
import {Router} from "@angular/router";
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";
import {Newsletter} from "../../model/newsletter/newsletter";

@Component({
  selector: 'app-dashboard-producer',
  templateUrl: './dashboard-producer.component.html',
  styleUrl: './dashboard-producer.component.css'
})
export class DashboardProducerComponent implements OnInit{

  producer : Producer;
  listDashboardProducer : any
  count = 0
  listNewsletterProducer : Newsletter[]

  constructor(private serviceManager: DashboardManagerService,
              private  router: Router,
              private  loginService: LoginrequestService) {
    this.producer = new Producer();
    this.listNewsletterProducer = [];
  }

    ngOnInit() {
    this.serviceManager.getLoggedProducer().subscribe((data: Producer) => {
      this.producer = data;
      this.serviceManager.getNewsletterProducer(this.producer.id).subscribe((data : any ) =>
      { this.listNewsletterProducer = Object.keys(data).map((key) => {return data [key]})});

    }, () => {
      this.loginService.clearAll();
      this.router.navigate(["/home"]);
    });

    this.listDashboardProducer  = this.serviceManager.getListDashboardProducer();


  }// ngOnInit

  onClick(i : number){
    for(let j = 0; j < this.listDashboardProducer.size(); j++){
      if( this.listDashboardProducer[j].isActive != "active"){}
      else {
        this.count++;
      }
      if (this.count == 0) {
        this.listDashboardProducer[i].isActive = "active";
      }
    }
  }



}//class
