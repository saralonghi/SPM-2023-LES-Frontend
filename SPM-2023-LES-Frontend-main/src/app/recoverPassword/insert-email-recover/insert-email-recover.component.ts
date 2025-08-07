import { Component } from '@angular/core';
import {sha256} from "js-sha256";
import {Router} from "@angular/router";
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";
import {LoginRequest} from "../../model/loginRequest/login-request";

@Component({
  selector: 'app-insert-email-recover',
  templateUrl: './insert-email-recover.component.html',
  styleUrl: './insert-email-recover.component.css'
})
export class InsertEmailRecoverComponent {

  recoverRequest: LoginRequest;

  constructor(private router: Router,
    private authManager: LoginrequestService) {
    this.recoverRequest = new LoginRequest();
  }

  onSubmit() {
    this.authManager.recoverPasswordCheckEmail(this.recoverRequest).subscribe((data: any)=>{
      this.router.navigate(["/recoverConfirm"]).then(() => window.location.reload());
    }, (exception) => {
      //window.location.reload();
      this.alert(exception.error);
    });
  }

  cryptoPassword(password: string) : string {
    return sha256(password);
  }

  alert(error:string){
    alert(error)
  }
}
