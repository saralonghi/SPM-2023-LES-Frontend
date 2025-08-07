import {Component, OnInit} from '@angular/core';
import {DashboardManagerService} from "../../service/dashboardManager/dashboardManager.service";
import {Router} from "@angular/router";
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Producer} from "../../model/producer/producer";
import {Newsletter} from "../../model/newsletter/newsletter";

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'

})
export class LogoComponent implements OnInit {

  selectedFile: any;
  imgURL: any;

  constructor(private manager: DashboardManagerService,
              private router: Router,
              private loginService: LoginrequestService,
              private sanitizer: DomSanitizer) {
  }
  ngOnInit() {
  }

  onFileChanged(event: any) {
    console.log(event)
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  prepareFormData(newsletter:Newsletter): FormData {
    const formData = new FormData();
    formData.append('newsletter', new Blob([JSON.stringify(newsletter)], {type: "application/json"}));
    formData.append('image', this.selectedFile , this.selectedFile.name);
    return formData;
  }
  onUpload() { }

  save(){
    this.onUpload();
  }


  onDelete(){

  }
}
