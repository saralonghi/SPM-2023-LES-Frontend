import { Component } from '@angular/core';
import {LoginRequest} from "../model/loginRequest/login-request";
import {Router} from "@angular/router";
import {LoginrequestService} from "../service/loginrequest/loginrequest.service";
import {sha256} from "js-sha256";

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  loginRequest : LoginRequest
  logged = true
  showAlert: boolean = false;
  alertMessage: string = '';
  insertPassword: string = '';

  constructor(
    private router: Router,
    private authManager: LoginrequestService) {
    this.loginRequest = new LoginRequest();
    this.insertPassword = '';
  }
  onSubmit() {
    this.loginRequest.password = this.insertPassword;
    this.insertPassword = "";
    this.authManager.loginAdmin(this.loginRequest).subscribe((data: any)=>{
      sessionStorage.setItem('Bearer',"Bearer " + data.token);
      sessionStorage.setItem('role', "admin");
      this.router.navigate(["/dashboardAdmin/newsletter"]).then(() => window.location.reload());
    }, (error) => {
      if (error.status === 400) {
        this.showAlert = true;
        this.alertMessage = "Password o Email sbagliate, Riprova";
      } else {
        this.showAlert = true;
        this.alertMessage = "Unknown error occurred. Please try again later.";
      }
    });
  }

  cryptoPassword(password: string) : string {
    return sha256(password);
  }

//Hidden alert
  hideAlert() {
    this.showAlert = false;
  }

}
