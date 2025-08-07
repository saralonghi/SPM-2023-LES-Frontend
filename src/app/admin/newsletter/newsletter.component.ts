import { Component, OnInit } from '@angular/core';
import { DashboardManagerService } from '../../service/dashboardManager/dashboardManager.service';
import {Producer} from "../../model/producer/producer";
import {Newsletter} from "../../model/newsletter/newsletter";
import {Admin} from "../../model/admin/admin";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})

export class NewsletterComponent implements OnInit {
  admin:Admin;
  listNewsletter: Newsletter[];
  pagesHtml: Number;
  p: number = 1;

  constructor(private serviceManager : DashboardManagerService,
              private  route: ActivatedRoute,
              private router : Router,
              private loginService: LoginrequestService) {
  this.listNewsletter = [];
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

    this.serviceManager.getAllNewsletterNotActive().subscribe((data: any) => {
      this.listNewsletter = Object.keys(data).map((key) =>  {
        this.pagesHtml = this.listNewsletter.length/6;
        return data[key]});
      this.sortNewsletters();
    }, error =>
      console.log('Error fetching the newsletter : ' + error.error));

  }//ngOnInit

  sortNewsletters() {
    this.listNewsletter = this.listNewsletter.map(item => {
      return {
        ...item,
        created: new Date(item.created!)
      };
    }).sort((a, b) => {
      return b.created.getTime() - a.created.getTime();
    });
  }

  protected readonly toString = toString;
}
