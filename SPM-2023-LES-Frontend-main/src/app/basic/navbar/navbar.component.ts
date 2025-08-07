import {Component, OnInit} from '@angular/core';
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
  constructor(public authManager: LoginrequestService) { }


  protected readonly LoginrequestService = LoginrequestService;
}
