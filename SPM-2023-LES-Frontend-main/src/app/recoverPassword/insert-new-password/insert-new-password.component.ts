import {Component, OnInit} from '@angular/core';
import {LoginRequest} from "../../model/loginRequest/login-request";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";
import {sha256} from "js-sha256";
import {ChangePasswordRequest} from "../../model/changePasswordRequest/change-password-request";

@Component({
  selector: 'app-insert-new-password',
  templateUrl: './insert-new-password.component.html',
  styleUrl: './insert-new-password.component.css'
})
export class InsertNewPasswordComponent implements OnInit{
  changePasswordRequest : ChangePasswordRequest
  confPassword: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authManager: LoginrequestService) {
    this.changePasswordRequest = new ChangePasswordRequest();
    this.confPassword = "";
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.changePasswordRequest.token = params.get('token')!;
      console.log(this.changePasswordRequest);
    })
    this.authManager.validateToken(this.changePasswordRequest.token!).subscribe((data: any)=>{
      console.log(data);
    }, (exception) => {
      this.router.navigate(["/error/token-expired"]);
    });
  }
  onSubmit() {
    if(this.validatePassword() && this.changePasswordRequest.password != null){
      this.authManager.recoverPasswordChangePassword(this.changePasswordRequest).subscribe((data: any)=>{
        alert("Password changed successfully");
        this.router.navigate(["/dashboardProducer"]).then(() => window.location.reload());
      }, (exception) => {
        window.location.reload();
        this.alert(exception.error.error);
      });
    }else{
      alert("Password not matched");
    }
  }



  validatePassword(){
    return this.changePasswordRequest.password == this.confPassword;
  }
  alert(error:string){
    alert(error)
  }
}
