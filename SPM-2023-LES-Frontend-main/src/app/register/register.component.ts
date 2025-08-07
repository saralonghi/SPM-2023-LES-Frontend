import { Component, OnInit } from '@angular/core';
import {Producer} from "../model/producer/producer";
import {ActivatedRoute, Router} from "@angular/router";
import {ProducerService} from "../service/producer/producer.service";
import { sha256 } from 'js-sha256'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  producer: Producer;
  success: string = "Producer registered successfully";
  insertPassword: string;
  confPassword: string;
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private producerService: ProducerService) {
    this.insertPassword = ""
    this.confPassword = ""
    this.producer = new Producer();
  }
  ngOnInit(): void {

  }


  onSubmit() {

    if(this.validatePassword() && this.insertPassword != null){

     this.producer.password = this.cryptoPassword(this.insertPassword);

     this.producerService.save(this.producer).subscribe(
      (data) => {
        this.sendMessage(JSON.stringify(data));
        console.log('Post:', data);
      },
      (exception) => {
        console.log(exception.error.error)
        this.showAlert = true;
        this.alertMessage = exception.error.error;
      });
    }else {
      this.showAlert = true;
      this.alertMessage = "Le password inserite non sono uguali";
    }
  }

  cryptoPassword(password: string) : string {
    return sha256(password);
  }
  sendMessage(result : string) {
    if (result.includes(this.success)) {
      this.router.navigate(['/successSignup']).then(() => window.location.reload())
    }
  }

  validatePassword(){
     return this.insertPassword == this.confPassword;
  }
//HIdden alert
  hideAlert() {
    this.showAlert = false;
  }

}
