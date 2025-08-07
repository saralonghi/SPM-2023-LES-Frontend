import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Producer } from '../../model/producer/producer';
import { DashboardManagerService } from '../../service/dashboardManager/dashboardManager.service';
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";
import {Admin} from "../../model/admin/admin";

@Component({
  selector: 'app-producer-history',
  templateUrl: './producer-history.component.html',
  styleUrl: './producer-history.component.css'
})
export class ProducerHistoryComponent implements OnInit {
  listProducerActive : Producer[];
  admin: Admin;
  pagesHtml: Number;
  p: number = 1;
    constructor(private serviceManager : DashboardManagerService,
                private router : Router,
                private loginService: LoginrequestService) {
      this.listProducerActive  = []
      this.admin= new Admin();
      this.pagesHtml = 0;
    }
    ngOnInit(): void {
      this.serviceManager.getLoggedAdmin().subscribe((data: Admin) => {
        console.log(data);
      }, () => {
        this.loginService.clearAll();
        this.router.navigate(["/home"]);
      });

      this.serviceManager.getAllProducersActive().subscribe((data : any) => {
        this.listProducerActive= Object.keys(data).map((key) => {
          this.pagesHtml = this.listProducerActive.length/6;
          return data [key]})
        this.sortProducer();
      },(e) => console.log(e.error) );
    }

  sortProducer() {
    this.listProducerActive = this.listProducerActive.map(item => {
      return {
        ...item,
        created: new Date(item.created!)
      };
    }).sort((a, b) => {
      return b.created.getTime() - a.created.getTime();
    });
  }

  restoreProducer(id : any){
      console.log(id);
      this.serviceManager.restoreProducer(id).subscribe ((data: any) => {
          console.log(data);
          this.router.navigate(['dashboardAdmin/producerhistory']).then(() => window.location.reload())
        }, (error) => {
          console.error(error);
        });
  }

  deleteProducer(id : any){
    this.serviceManager.deleteProducer(id).subscribe(
      (data: any) => {
        this.router.navigate(['dashboardAdmin/producerhistory']).then(() => window.location.reload(),)
      }, (exception) => {
        window.location.reload();
        console.log(exception.error.error);
      });
  }

  protected readonly console = console;
}
