import {Component, OnInit} from '@angular/core';
import {Producer} from "../../model/producer/producer";
import {DashboardManagerService} from "../../service/dashboardManager/dashboardManager.service";
import {DomSanitizer} from "@angular/platform-browser";
import {LoginrequestService} from "../../service/loginrequest/loginrequest.service";
import {Router} from "@angular/router";
import {UpdateContact} from "../../model/updateContact/update-contact";
import {Image} from "../../model/image/image";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent  implements OnInit {
  producer: Producer;
  updateProducer: UpdateContact;
  selectedFile: any;
  previewURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  displayForm: boolean;

  base64Image: any;
  producerID: string;

  constructor(private serviceManager: DashboardManagerService,
              private router: Router,
              private loginService: LoginrequestService,
              private sanitizer: DomSanitizer) {
    this.producer = new Producer();
    this.updateProducer = new UpdateContact();
    this.producerID = '';
    this.displayForm=false;

  }

  ngOnInit() {
    this.serviceManager.getLoggedProducer().subscribe((data: Producer) => {
      this.producer = data;
      this.updateProducer.id = this.producer.id;
      this.retrieveLogo(this.updateProducer.id);
    }, () => {
      this.loginService.clearAll();
      this.router.navigate(["/home"]);
    });
    this.producerID = this.producer.id?.toString()!;

  }
  modify(){
    if(this.displayForm) {
      this.displayForm = false;
    }
    else {
      this.displayForm = true;
    }
    return this.displayForm;
  }
  retrieveLogo(id : any){
    this.serviceManager.retrieveLogo(id).subscribe(
      (response: any) => {
          this.base64Image = 'data:image/png;base64,' + response.dataImage;
          },
      error => {
        console.error('Error fetching base64 image:', error);
      }
    );
  }
  save(){
    this.updateProducer.id=this.producer.id;
    if(this.selectedFile){
      this.uploadLogo();
    }
    this.serviceManager.updateProducer(this.updateProducer).subscribe((data: any) => {
      sessionStorage.setItem('Bearer', "Bearer " + data.token);
      window.location.reload();
    }, (error) => {
      alert(error.error.error);
    });
  }
  uploadLogo(){
    console.log(this.selectedFile);
    const image = {
      file: this.selectedFile,
      url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(this.selectedFile)
      )
    }
    const uploadData = new FormData();
    uploadData.append('logo', image.file, image.file.name);

    this.serviceManager.uploadLogo(uploadData).subscribe(
      data => {console.log(data);
        this.receivedImageData = data;
        this.base64Data = this.receivedImageData.file;
        this.convertedImage = 'data:image/png;base64,' + this.base64Data;
      },
      err => console.log('Error Occured duringng saving: ' + err)
    );

  }
  onShowPreview(event: any) {
    this.selectedFile = event.target.files[0];

    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.previewURL = reader.result;
    };
  }

  protected readonly onsubmit = onsubmit;
}








/*
retriveLogo() {
  this.serviceManager.getLogo(this.updateProducer.id).subscribe(
    (logoData: Blob) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.logoURL = event.target.result;
      };
      this.logoURL= reader.readAsDataURL(logoData); // Convert Blob to base64 string
    },
    error => {
      console.error('Error retrieving logo:', error);
    }
  );
}
*/

/*uploadLogo() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }
    const formData = new FormData();
    formData.append('logo', this.selectedFile, this.selectedFile.name);

    this.serviceManager.uploadLogo(formData).subscribe(
      response => {
        console.log('Image uploaded successfully:', response);
        //window.location.reload();
        // Do something with the response if needed

      },
      error => {
        console.error('Error uploading image:', error);
        // Handle error
      }
    );
  }*/

/*
uploadLogo(){
  if (!this.selectedFile) {
    console.error('No file selected.');
    return;
  }
  console.log(this.selectedFile);
  const image = {
    file: this.selectedFile,
    url: this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(this.selectedFile)
    )
  }
  const formData = new FormData();
  formData.append('logo', image.file, image.file.name);


  this.serviceManager.uploadLogo(formData).subscribe(
    res => {console.log(res);
      this.receivedImageData = res;
      this.base64Data = this.receivedImageData.file;
      this.convertedImage = 'data:image/png;base64,' + this.base64Data; },
    err => console.log('Error Occured duringng saving: ' + err)
  );

}
*/


/*
  //per leggere la foto
  retrieveLogo(){
    this.serviceManager.getLogo(this.updateProducer.id).subscribe(
      (response: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.logoURL = reader.result as string;
        };
        reader.readAsDataURL(response);
      },
      error => {
        console.error('Error fetching image:', error);
        // Handle error
      }
    );

  }

  retriveLogo() {
    this.serviceManager.getLogo(this.producer.id).subscribe(
      (logoData: Blob) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.logoURL = event.target.result;
        };
        reader.readAsDataURL(logoData); // Convert Blob to base64 string
      },
      error => {
        console.error('Error retrieving logo:', error);
      }
    );
  }

 */

/*
prepareFormData(image : File){
  const formData = new FormData();
  formData.append('other', image, image.name);
  return formData;
}

onUpload(){
  console.log(this.selectedFile);
  const image = {
    file: this.selectedFile,
    url: this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(this.selectedFile)
    )
  }

  this.serviceManager.uploadLogo(this.prepareFormData(this.logoURL)).subscribe(
    res => {console.log(res);
      this.receivedImageData = res;
      this.base64Data = this.receivedImageData.file;
      this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
    err => console.log('Error Occured duringng saving: ' + err)
  );
}

save(){
  this.updateProducer.id=this.producer.id;
  this.serviceManager.updateProducer(this.updateProducer).subscribe((data: any) => {
    sessionStorage.setItem('Bearer', "Bearer " + data.token);
    this.log=false;
    window.location.reload();
  }, (error) => {
    alert(error.error.error);
  });

  this.onUpload();
}*/


