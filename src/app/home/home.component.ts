import { Component, OnInit, AfterViewInit, ElementRef, Renderer2} from '@angular/core';
import { NgModule } from '@angular/core';
import { ngbCarouselTransitionIn } from '@ng-bootstrap/ng-bootstrap/carousel/carousel-transition';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProducerService} from "../service/producer/producer.service";
import {UserRequest} from "../model/userRequest/user-request";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent implements AfterViewInit{

  myForm: FormGroup;
  userRequest: UserRequest;
  alertMessage: string = '';
  isSuccess: boolean = false;
  showAlert: boolean = false;
  constructor(private fb: FormBuilder,
              private producerService: ProducerService,
              private renderer: Renderer2,
              private elementRef: ElementRef) {
    this.userRequest = new UserRequest();
    this.myForm = this.fb.group({email: ['', [Validators.required, Validators.email]]});
  }

  ngAfterViewInit(): void {
    const detachButtonHost = this.elementRef.nativeElement.querySelector('#detach-button-host');
    if (detachButtonHost) {
      this.renderer.removeChild(detachButtonHost.parentNode, detachButtonHost);
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.userRequest.email = this.myForm.value.email;
      this.producerService.createSubscriber(this.userRequest).subscribe(
        data => {
          console.log('Email salvata:', data);
          this.showAlert = true;
          this.alertMessage = 'Iscrizione Newsletter avvenuta con successo!';
          this.isSuccess = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 5000);
        },
        error => {
          this.showAlert = true;
          this.alertMessage = error.error;
          this.isSuccess = false;
          setTimeout(() => {
            this.showAlert = false;
          }, 5000);
        });
      console.log('Email valida:', this.myForm.value.email);
    } else {
      this.showAlert = true;
      this.alertMessage = 'Email non valida. Controlla il formato.';
      this.isSuccess = false;
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    }
  }
//ALERT
  hideAlert() {
    this.showAlert = false;
  }




}
