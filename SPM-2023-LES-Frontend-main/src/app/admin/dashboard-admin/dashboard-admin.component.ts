import {Component, OnInit} from '@angular/core';
import {DashboardManagerService} from "../../service/dashboardManager/dashboardManager.service";
import {Admin} from "../../model/admin/admin";
import {Producer} from "../../model/producer/producer";
import {Newsletter} from "../../model/newsletter/newsletter";
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit{
  admin: Admin;

  constructor(private serviceManager: DashboardManagerService,
              private  router: Router,
              private  loginService: LoginrequestService) {
    this.admin = new Admin();
    this.listProducers = [];
    this.listActiveProducers = [];
    this.listNotActiveNewsletter = [];
    this.listActiveNewsletter = [];
  }

  listDashboard : any
  listProducers : Producer[];
  listActiveProducers : Producer[];
  listNotActiveNewsletter : Newsletter [];
  listActiveNewsletter : Newsletter [];
  count = 0


  ngOnInit() {
    this.listDashboard  = this.serviceManager.getListDashboard();

    this.serviceManager.getLoggedAdmin().subscribe((data: Admin) => {
      console.log(data);
      this.admin = data;
    }, () => {
      this.loginService.clearAll();
      this.router.navigate(["/home"]);
    });

    this.serviceManager.getAllProducersNotActive().subscribe((data : any ) =>
    { this.listProducers = Object.keys(data).map((key) => {return data [key]})});

    this.serviceManager.getAllProducersActive().subscribe((data : any ) =>
    { this.listActiveProducers = Object.keys(data).map((key) => {return data [key]})});

    this.serviceManager.getAllNewsletterNotActive().subscribe((data : any ) =>
    { this.listNotActiveNewsletter = Object.keys(data).map((key) => {return data [key]})});

    this.serviceManager.getAllNewsletterActive().subscribe((data : any ) =>
    { this.listActiveNewsletter = Object.keys(data).map((key) => {return data [key]})});

  }//ngOnInit




  }//class
