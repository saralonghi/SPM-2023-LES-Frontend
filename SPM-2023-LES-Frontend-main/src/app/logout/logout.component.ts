import {Component, OnInit} from '@angular/core';
import {LoginrequestService} from "../service/loginrequest/loginrequest.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit{

  constructor(private authManager:LoginrequestService) {
  }

  ngOnInit() {
    this.authManager.clearAll();
  }
}
