import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProducerViewService} from "../../service/producerView/producer-view.service";
import {ProducerDetails} from "../../model/producerDetails/producer-details";
import {Image} from "../../model/image/image";
import {NgbCarousel} from "@ng-bootstrap/ng-bootstrap";
import {CarouselComponent} from "ngx-bootstrap/carousel";

@Component({
  selector: 'app-producer-view',
  templateUrl: './producer-view.component.html',
  styleUrl: './producer-view.component.css'
})
export class ProducerViewComponent implements OnInit {

  id: any;
  listProducers: ProducerDetails[];
  producer: ProducerDetails;
  listImage: Image[];
  image: Image;
  logo: any;
  list: string[]

  constructor(private route: ActivatedRoute,
              private router: Router,
              private serviceManager: ProducerViewService) {
    this.listProducers = [];
    this.producer = new ProducerDetails();
    this.listImage = [];
    this.image = new Image();
    this.list = [];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')!;
      console.log(this.id);
    })
    this.serviceManager.getProducerDetails(this.id).subscribe(
      (data: any) => {
        this.producer = data;

        this.serviceManager.getLogo(this.producer.id).subscribe(
          (res: any) => {
            this.logo = 'data:image/png;base64,' + res.dataImage;
          },
          (err: any) => {
            console.log(err)
          }
        );
        this.serviceManager.getAllImages(this.producer.id).subscribe((data: any) => {
          this.listImage = Object.keys(data).map((key) => {
            return data [key]
          });
          this.listImage.forEach((image) => {
            if (image.dataImage != null) {
              this.list.push('data:image/jpeg;base64,' + image.dataImage);
            }
          });
        });
        console.log(this.list)
      });
  }

}
