import {Component, OnInit} from '@angular/core';
import {NewsManagerService} from "../../service/newsManager/news-manager.service";
import {Router} from "@angular/router";
import {News} from "../../model/news/news";
import {Image} from "../../model/image/image";

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrl: './all-news.component.css'
})
export class AllNewsComponent implements OnInit{

  listNews: News[];
  listImage: Image[];
  pagesHtml: Number;
  p: number = 1;
  constructor(private serviceManager: NewsManagerService,
              private router: Router) {
    this.listNews = [];
    this.listImage = [];
    this.pagesHtml = 0;
    }
  ngOnInit() {

    this.serviceManager.getAllNews().subscribe((data : any ) => {
      this.listNews = Object.keys(data).map((key) => {
        this.pagesHtml = this.listNews.length/6;
        return data [key]});

      this.listNews.forEach((news) => {// news.contenuto = this.trimStringToMax500Chars(news.contenuto!);
        news.differenceInMinutes = this.calculateTimeDifference(news.created!);
        this.serviceManager.getAllImages(news.id).subscribe((data: any) => {
        this.listImage = Object.keys(data).map((key) => {
            return data [key]
          });

          if(this.listImage.length > 0)
          news.urlPhoto = 'data:image/jpeg;base64,' + this.listImage[0].dataImage;
        });
        }
      )
    });
  }

   /*trimStringToMax500Chars(input: string): string {
    const maxLength = 500;
    if (input.length > maxLength) {
      return input.substring(0, maxLength) + '...';
    } else {
      return input;
    }
  }*/
  calculateTimeDifference(creationTimeAny: any): number {
    const creationTime = new Date(creationTimeAny);
    const now = new Date();
    const differenceInMilliseconds = now.getTime() - creationTime.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / 1000 / 60 / 60 / 24);
    return differenceInDays;
  }

}
