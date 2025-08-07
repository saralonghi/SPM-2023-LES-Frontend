import { Component, OnInit } from '@angular/core';
import {DashboardManagerService} from "../../service/dashboardManager/dashboardManager.service";
import {DomSanitizer} from "@angular/platform-browser";
import {News} from "../../model/news/news";
import {Admin} from "../../model/admin/admin";
import {Router} from "@angular/router";
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  selector: 'app-crea-news',
  templateUrl: './crea-news.component.html',
  styleUrl: './crea-news.component.css'
})


export class CreaNewsComponent implements OnInit{
  news : News;
  admin : Admin;
  log : boolean;
  selectedFile: any = null;
  imgURL: any;
  titolo : string = '';
  testo: string = '';
  value : string = '';
  // Custom alert properties
  alertMessage: string = '';
  isSuccess: boolean = false;
  showAlert: boolean = false;

  constructor(private serviceManager: DashboardManagerService,
              private loginService: LoginrequestService,
              private router: Router,
              private sanitizer: DomSanitizer,
              ) {
    this.log = false;
    this.news = new News();
    this.admin = new Admin();
  }
  ngOnInit() {
    this.serviceManager.getLoggedAdmin().subscribe((data: Admin) => {
      console.log(data);
      this.admin = data;
    }, () => {
      this.loginService.clearAll();
      this.router.navigate(["/home"]);
    });
  }

  onKeyTitolo(event: any) { // without type info
    this.titolo = event.target.value ;
  }
  onKeyTesto(event: any) { // without type info
    this.testo = event.target.value ;
  }

  prepareFormData(news:News): FormData {
    const formData = new FormData();
    formData.append('news', new Blob([JSON.stringify(news)], {type: "application/json"}));
    formData.append('image', this.selectedFile , this.selectedFile.name);
    return formData;
  }

  onUpload(news: News) {
    const formData = this.prepareFormData(news);
    return this.serviceManager.createNews(formData).subscribe(
      (data: any) => {
         this.showAlertMessage('News creata con successo!', true);
      },
      () => {
        this.showAlertMessage('Errore nella creazione della news', false);
      }
    );
  }

  save() {
    if (!this.validateInputs()) {
      return; // Exit early if inputs are invalid
    }
        this.onUpload(this.createNews());

    const form = document.getElementById('news-form') as HTMLFormElement;
    form.reset();
  }


  onFileChanged(event: any) {
    console.log(event)
    this.selectedFile = event.target.files[0];
  //Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  private createNews() {
    this.news.titolo = this.titolo;
    this.news.contenuto = this.testo;
    this.news.adminID = this.admin.ID;
    return this.news;
  }

  private showAlertMessage(message: string, isSuccess: boolean) {
    this.alertMessage = message;
    this.isSuccess = isSuccess;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

  private validateInputs(): boolean {
    if (!this.selectedFile) {
      this.showAlertMessage('Inserire un\'immagine', false);
      return false;
    }
    if (!this.titolo || !this.testo) {
      this.showAlertMessage('Inserire un titolo e un testo', false);
      return false;
    }
    return true;
  }

}
