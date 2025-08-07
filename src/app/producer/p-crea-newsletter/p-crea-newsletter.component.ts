import {Component, OnInit} from '@angular/core';
import {DashboardManagerService} from "../../service/dashboardManager/dashboardManager.service";
import {Router} from "@angular/router";
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Producer} from "../../model/producer/producer";
import {Newsletter} from "../../model/newsletter/newsletter";
import {Image} from "../../model/image/image";

@Component({
  selector: 'app-p-crea-newsletter',
  templateUrl: './p-crea-newsletter.component.html',
  styleUrl: './p-crea-newsletter.component.css'
})
export class PCreaNewsletterComponent implements  OnInit{

  producer: Producer;
  newsletter : Newsletter;
  selectedFile: any = null;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  titolo : string = '';
  testo: string = '';
  alertMessage: string = '';
  isSuccess: boolean = false;
  showAlert: boolean = false;

  constructor(private serviceManager: DashboardManagerService,
              private router: Router,
              private loginService: LoginrequestService,
              private sanitizer: DomSanitizer) {
    this.producer = new Producer();
    this.newsletter = new Newsletter();

  }


  ngOnInit() {
    this.serviceManager.getLoggedProducer().subscribe((data: Producer) => {
      this.producer = data;
    }, () => {
      this.loginService.clearAll();
      this.router.navigate(["/home"]);
    });
  }

  onKeyTitolo(event: any) { // without type info
    this.titolo= event.target.value ;
  }

  onKeyTesto(event: any) { // without type info
    this.testo = event.target.value ;
  }

  onFileChanged(event: any) {
    console.log(event)
    this.selectedFile = event.target.files[0];

    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }


//NEWSLETTER CREATION----------------------------------------------------------------------------------------------------
  creaNewsletter(){
    this.newsletter.titolo = this.titolo;
    this.newsletter.contenuto= this.testo;
    this.newsletter.producerID= this.producer.id;
    return this.newsletter;

  }

  prepareFormData(newsletter:Newsletter): FormData {
    const formData = new FormData();
    formData.append('newsletter', new Blob([JSON.stringify(newsletter)], {type: "application/json"}));
    if (this.selectedFile != null) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }else{
      formData.append('image', new Blob(["null"]), "null");
    }
    return formData;
  }


  /*
   prepareFormData(newsletter:Newsletter): FormData {
     const formData = new FormData();
     formData.append('newsletter', new Blob([JSON.stringify(newsletter)], {type: "application/json"}));
     if(this.selectedFile != null){
     formData.append('image', this.selectedFile , this.selectedFile.name);
     }
     return formData;
   }


   onUpload() {
     if(this.selectedFile == null) {
       const formData = this.prepareFormData(this.creaNewsletter());
       console.log(formData);

       this.serviceManager.createNewsletter(formData).subscribe(() => { },
         (err) => {
           console.log(err.error)
           alert("Errore nella creazione della newsletter senza immagini");
         });
     }
     else {
     const image = {
       file: this.selectedFile,
       url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedFile))
     }
       const formData = this.prepareFormData(this.creaNewsletter());
       console.log(formData);
       this.serviceManager.createNewsletterWithImage(formData).subscribe(() => { },
         (err) => {
         console.log(err.error)
         alert("Errore nella creazione della newsletter con immagini");
       });


       }

   }*/

  save() {
    if (!this.titolo || !this.testo) {
      this.showAlert = true;
      this.alertMessage = 'Titolo e Contenuto sono obbligatori';
      this.isSuccess = false;
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
      return; // Exit early if any component is missing
    }

    const formData = this.prepareFormData(this.creaNewsletter());
    this.serviceManager.createNewsletter(formData).subscribe(
      (data: any) => {
        this.showAlert = true;
        this.alertMessage = 'Newsletter creata con successo!';
        this.isSuccess = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
      },
      () => {
        this.showAlert = true;
        this.alertMessage = 'Errore nella creazione della newsletter';
        this.isSuccess = false;
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
      }
    );

    const form = document.getElementById('newsL-form') as HTMLFormElement;
    form.reset();
  }

}
