import {Component, OnInit} from '@angular/core';
import {DashboardManagerService} from "../../service/dashboardManager/dashboardManager.service";
import {Producer} from "../../model/producer/producer";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";
import {map, Observable, Subscription} from "rxjs";
import {Image} from "../../model/image/image";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-p-other-img',
  templateUrl: './p-other-img.component.html',
  styleUrl: './p-other-img.component.css'
})
export class POtherImgComponent implements OnInit {

  selectedFiles: File[] = []; //immagini nuove
  producer: Producer | null = null;
  snapshotProducer:  Producer [];
  snapshotID: any [];
  arrayStoredImg : any[]; //immagini stored = vecchie + nuove
  buttonCrea: boolean = false;
  storedCover : any;
  constructor(private serviceManager : DashboardManagerService,
              private  route: ActivatedRoute,
              private router : Router,
              private loginService: LoginrequestService){
    this.producer = new Producer();
    this.snapshotProducer = [];
    this.snapshotID = [];
    this.arrayStoredImg = [];
  }


  ngOnInit() {
     this.serviceManager.getLoggedProducer().subscribe((data: Producer) => {
      this.producer = data;
      this.snapshotProducer= [];
      this.snapshotProducer.push(data);
      this.getImages(this.producer.id);
      this.getCover(this.producer.id)
      },
      () => {
      this.loginService.clearAll();
      this.router.navigate(["/home"]);
    });

    }


  prepareFormData(image: File[], type: string){
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append(type , image[i], image[i].name);
    }
    return formData;
  }


  /*------- OtherImg -- get all the images stored to display them -------*/
  getImages(id: any) {
    this.serviceManager.getAllImages(id)
      .subscribe((data: any) => {
          this.arrayStoredImg = Object.keys(data).map((key) => {
            console.log('Fetching image correct' );
            return  'data:image/*;base64,'+ data[key].dataImage;
     })},
        err => console.log('Error fetching image : ' + err));
  }

  onFileChangedOther(event: any) {
    if(event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.selectedFiles.push(event.target.files[i]);
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (events:any) => {
          this.buttonCrea=true;
          //this.arrayStoredImg.push(events.target.result);
          // console.log(events.target.result);
        };
      }
    }
  }

   onUploadOther() {
    const formData = this.prepareFormData(this.selectedFiles, 'other');
    this.serviceManager.uploadImages(formData).subscribe({
    next: ()=> { this.router.navigate(['dashboardProducer/other-img']).then(() => window.location.reload());},
    error: () => { alert("Errore nel caricamento delle immagini")}
    });
  }

  /*-------- Cover -- get stored Cover to display them --------*/
  getCover(id : any){
    this.serviceManager.retrieveCover(id).subscribe(
      (data: any) => {
        this.storedCover= 'data:image/png;base64,' + data.dataImage;
      },
      error => {
        console.error('Error fetching ase64 image:', error);
      }
    );
  }
  onUploadCover() {
    const formData = this.prepareFormData(this.selectedFiles, 'cover');
    this.serviceManager.uploadCover(formData).subscribe({
      next: ()=> { this.router.navigate(['dashboardProducer/other-img']).then(() => window.location.reload());},
      error: () => { alert("Errore nel caricamento delle immagini")}
    });
  }

  onFileChangedCover(event: any) {
    if(event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.selectedFiles.push(event.target.files[i]);
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (events:any) => { };
      }
    }
  }

  onDeleteCover (){  this.serviceManager.retrieveCover(this.snapshotProducer.at(0)!.id)
    .subscribe((data: any) => {
      this.serviceManager.deleteImage(data.id).subscribe();
      this.router.navigate(['dashboardProducer/other-img']).then(() => window.location.reload());
    });
  }


//Delete Other Images---------------------------------------------
  onDelete (url : any ){
    this.serviceManager.getAllImages(this.snapshotProducer.at(0)!.id)
      .subscribe((data: any) => {
        Object.keys(data).map((key) => {
          if ('data:image/*;base64,'+ data[key].dataImage == url ) {
            this.serviceManager.deleteImage(data[key].id).subscribe();
            this.router.navigate(['dashboardProducer/other-img']).then(() => window.location.reload());
          }
        });
      });
    }

  deleteAll(){
    this.serviceManager.deleteAllImages(this.snapshotProducer.at(0)!.id).subscribe({
      next: (data: any)=> { console.log("Le immagini sono state cancellate")},
      error: (exception)=> { console.log(exception.error());}
    });
    this.router.navigate(['dashboardProducer/other-img']).then(() => window.location.reload());
  }


}
