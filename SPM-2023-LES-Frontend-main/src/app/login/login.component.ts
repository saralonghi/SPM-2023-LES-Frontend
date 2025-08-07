import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginrequestService} from "../service/loginrequest/loginrequest.service";
import {LoginRequest} from "../model/loginRequest/login-request";
import {sha256} from "js-sha256";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginRequest : LoginRequest
  logged = true
  showAlert: boolean = false;
  alertMessage: string = '';
  insertPassword: string;

  constructor(
  private router: Router,
  private authManager: LoginrequestService) {
    this.loginRequest = new LoginRequest();
    this.insertPassword = "";
  }
  onSubmit() {
    if(this.insertPassword != null && this.insertPassword != "")
      this.loginRequest.password = this.cryptoPassword(this.insertPassword);
      this.insertPassword = "";
    this.authManager.loginProducer(this.loginRequest).subscribe((data: any)=>{
      sessionStorage.setItem('Bearer',"Bearer " + data.token);
      sessionStorage.setItem('role', "producer");
      this.router.navigate(["/dashboardProducer/dati"]).then(() => window.location.reload());
    }, (error) => {
        this.showAlert = true;
        console.log('Errore:', error.error.error);
        this.alertMessage = error.error.error;
    });
  }

  cryptoPassword(password: string) : string {
    return sha256(password);
  }

  //hidden alert
  hideAlert() {
    this.showAlert = false;
  }
}
