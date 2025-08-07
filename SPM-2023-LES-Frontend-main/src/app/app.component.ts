import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'PNM';

  constructor(private modalService: NgbModal) {
  }
  public open(modal: any): void {
    this.modalService.open(modal);

  }
}
