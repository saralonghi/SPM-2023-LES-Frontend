import {Component, OnInit} from '@angular/core';
import {News} from "../../model/news/news";
import {Image} from "../../model/image/image";
import {NewsManagerService} from "../../service/newsManager/news-manager.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css'
})
export class NewsDetailsComponent implements OnInit{
  news: News;
  id: any;
  listImage: Image[];
  image : Image;
  constructor(private serviceManager: NewsManagerService,
              private route: ActivatedRoute,
              private router: Router) {
    this.news = new News();
    this.listImage = [];
    this.image = new Image();
  }


  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')!;
    })
    this.serviceManager.getNews(this.id).subscribe(
      (data: any) => {
        this.news = data;
        this.serviceManager.getAllImages(this.news.id).subscribe((data: any) => {
          this.listImage = Object.keys(data).map((key) => {
            return data [key]
          });
          this.listImage.forEach((image) => {
            if (image.dataImage != null) {
              image.url = 'data:image/jpeg;base64,' + image.dataImage;
            }
          });
        });
      });
  }

}
