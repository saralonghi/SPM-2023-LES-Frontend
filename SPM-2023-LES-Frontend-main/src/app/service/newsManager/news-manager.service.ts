import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsManagerService {

  producerAllImagesUrl = `${environment.apiUrl}/producer/retrieveAllImages`;
  allNewsUrl = `${environment.apiUrl}/admin/allNews`;
  newsGet = `${environment.apiUrl}/admin/news`;
  constructor(private http : HttpClient) { }

  getAllImages(id : any){
    return this.http.get(this.producerAllImagesUrl + "/" + id);
  }

  getNews(id : any) {
    return this.http.get(this.newsGet + "/" + id);
  }
  getAllNews() : Observable<Object[]> {
    return this.http.get<Object[]>(this.allNewsUrl);
  }
}
