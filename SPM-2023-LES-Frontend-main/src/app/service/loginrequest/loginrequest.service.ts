import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginRequest} from "../../model/loginRequest/login-request";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {ChangePasswordRequest} from "../../model/changePasswordRequest/change-password-request";
import {sha256} from "js-sha256";

@Injectable({
  providedIn: 'root'
})
export class LoginrequestService {


  recoverPasswordCheckEmailURL=`${environment.apiUrl}/producer/passwordRecovered/checkEmail`;
  authenticateAdminURL=`${environment.apiUrl}/admin/login`;
  authenticateProducerURL=`${environment.apiUrl}/producer/login`;
  recoverPasswordChangePasswordURL=`${environment.apiUrl}/producer/passwordRecovered/changePassword`;
  recoverPasswordURL=`${environment.apiUrl}/producer/passwordRecovered`;

  constructor(private route: Router, private http: HttpClient) {
  }


  loginProducer(authRequest: LoginRequest): Observable<any> {
    return this.http.post(this.authenticateProducerURL, authRequest)
  }

  loginAdmin(authRequest: LoginRequest): Observable<any> {
    return this.http.post(this.authenticateAdminURL, authRequest)
  }

  recoverPasswordCheckEmail(authRequest: LoginRequest): Observable<any> {
    return this.http.post(this.recoverPasswordCheckEmailURL, authRequest);
    }

  recoverPasswordChangePassword(changeRequest: ChangePasswordRequest): Observable<any> {
    changeRequest.password = this.cryptoPassword(changeRequest.password!);
    return this.http.post(this.recoverPasswordChangePasswordURL, changeRequest);
  }

  validateToken(token: string): Observable<any> {
    return this.http.get(this.recoverPasswordURL + '/' + token);
  }
  cryptoPassword(password: string) : string {
    return sha256(password);
  }
  // Ritorna true se l'utente è loggato, false altrimenti
  isLoggedProducer = () => (sessionStorage.getItem("Bearer") != null)
     && sessionStorage.getItem("role") == "producer";
  isLoggedAdmin = () =>
    (sessionStorage.getItem("Bearer") != null
      && sessionStorage.getItem("role") == "admin")

  // Pulisce il session storage e il local storage
  clearAll() {sessionStorage.clear(); localStorage.clear();}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.isLoggedProducer() || !this.isLoggedAdmin()) {
      this.route.navigate(['login']);
      return false;
    } else { return true; }
  }
}
