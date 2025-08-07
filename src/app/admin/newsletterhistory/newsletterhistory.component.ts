import {Component, OnInit} from '@angular/core';
import {Producer} from "../../model/producer/producer";
import {DashboardManagerService} from "../../service/dashboardManager/dashboardManager.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Newsletter} from "../../model/newsletter/newsletter";
import {Admin} from "../../model/admin/admin";
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";

@Component({
  selector: 'app-newsletterhistory',
  templateUrl: './newsletterhistory.component.html',
  styleUrl: './newsletterhistory.component.css'
})


export class NewsletterhistoryComponent implements OnInit{

  listNewsletterActive : Newsletter[];
  admin:Admin;
  pagesHtml: Number;
  p: number = 1;

  constructor (private serviceManager : DashboardManagerService,
               private  route: ActivatedRoute,
               private router : Router,
               private loginService: LoginrequestService){
    this.listNewsletterActive = [];
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

    this.serviceManager.getAllNewsletterActive().subscribe((data : any) => {
      this.listNewsletterActive = Object.keys(data).map((key) => {
        this.pagesHtml = this.listNewsletterActive.length/6; return data [key]});
        this.sortNewsletters();

    });
  }

  sortNewsletters() {
    this.listNewsletterActive = this.listNewsletterActive.map(item => {
      return {
        ...item,
        created: new Date(item.created!)
      };
    }).sort((a, b) => {
      return b.created.getTime() - a.created.getTime();
    });
  }


  restoreNewsletter(id : any){
    console.log(id);
    this.serviceManager.restoreNewsletter(id).subscribe({
      next:(data:any) => {
      console.log(data);
      this.router.navigate(['dashboardAdmin/newsletterhistory']).then(() => window.location.reload())
    },
    error: (e) => console.error(e),
    });
  }

  deleteNewsletter(id : any){
    this.serviceManager.deleteNewsletter(id).subscribe(
      (data: any) => {
        this.router.navigate(['dashboardAdmin/newsletterhistory']).then(() => window.location.reload(),)
      }, (exception) => {
        console.log(exception.error);
      });
  }

//  protected readonly console = console;



}
