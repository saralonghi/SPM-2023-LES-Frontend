import {Component, OnInit} from '@angular/core';
import {Producer} from "../../model/producer/producer";
import {Newsletter} from "../../model/newsletter/newsletter";
import {DashboardManagerService} from "../../service/dashboardManager/dashboardManager.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";
import {Admin} from "../../model/admin/admin";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-p-newsletter-history',
  templateUrl: './p-newsletter-history.component.html',
  styleUrl: './p-newsletter-history.component.css'
})
export class PNewsletterHistoryComponent implements OnInit{
  producer: Producer;
  listNewsletterProducer: Newsletter[]
  pagesHtml: Number;
  p: number = 1;

  constructor(private serviceManager : DashboardManagerService,
              private  route: ActivatedRoute,
              private router : Router,
              private loginService: LoginrequestService) {
    this.listNewsletterProducer = [];
    this.producer = new Producer();
    this.pagesHtml = 0;
  }

  ngOnInit(): void {
    this.serviceManager.getLoggedProducer().subscribe({
    next: (data: Producer) => {
      this.producer = data;
      this.serviceManager.getNewsletterProducer(this.producer.id).subscribe((data : any) => {
        this.listNewsletterProducer = Object.keys(data).map((key) =>{return data [key]});
        this.sortNewsletters();
      });
      console.log(this.producer.id)},
      error: () => {
        this.loginService.clearAll();
      this.router.navigate(["/home"]);
    }});

  }

  sortNewsletters() {
    this.listNewsletterProducer = this.listNewsletterProducer.map(item => {
      return {
        ...item,
        created: new Date(item.created!)
      };
    }).sort((a, b) => {
      return b.created.getTime() - a.created.getTime();
    });
  }

  deleteNewsletter(id : any){
    this.serviceManager.deleteProducerNewsletter(id).subscribe({
      next:(data: any) => {
        this.router.navigate(['dashboardProducer/prod-newsletterhistory']).then(() => window.location.reload())},
     error: (exception) => console.log(exception.error())
      });
  }


}
