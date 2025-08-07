import { Component, OnInit } from '@angular/core';
import { DashboardManagerService } from '../../service/dashboardManager/dashboardManager.service';
import {Producer} from "../../model/producer/producer";
import {Admin} from "../../model/admin/admin";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrl: './producer.component.css'
})

export class ProducerComponent implements OnInit {

  listProducer: Producer[];
  admin: Admin;
  pagesHtml: Number;
  p: number = 1;
  constructor (private serviceManager : DashboardManagerService,
               private  route: ActivatedRoute,
               private router : Router,
               private loginService: LoginrequestService) {
    this.listProducer = [];
    this.admin= new Admin();
    this.pagesHtml = 0;
  }

  ngOnInit(): void {
    this.serviceManager.getLoggedAdmin().subscribe((data: Admin) => {
      console.log(data);
      this.admin = data;
    }, () => {
      this.loginService.clearAll();
      this.router.navigate(["/home"]);
    });

    this.serviceManager.getAllProducersNotActive().subscribe((data : any) => {
      this.listProducer = Object.keys(data).map((key) => {
        this.pagesHtml = this.listProducer.length/6;
        return data [key]})
      this.sortProducer();
    },(e) => console.log(e.error) );
  }

  sortProducer() {
    this.listProducer = this.listProducer.map(item => {
      return {
        ...item,
        created: new Date(item.created!)
      };
    }).sort((a, b) => {
      return b.created.getTime() - a.created.getTime();
    });
  }


}
