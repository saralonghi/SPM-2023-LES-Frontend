import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ProducerViewService {

  producersListDetailsUrl = `${environment.apiUrl}/producer/producersDetails/list`;
  producersDetailsUrl = `${environment.apiUrl}/producer/producersDetails`;
  producerLogoUrl = `${environment.apiUrl}/producer/retrieveLogo`;
  producerAllImagesUrl = `${environment.apiUrl}/producer/retrieveAllImages`;
  producersFilterDetailsUrl = `${environment.apiUrl}/producer/getProducers/filtered`;


  constructor(private http: HttpClient) { }



  getFilterProducersDetails(products : any,province : any) : Observable<Object[]> {
    const params = { products: products, province: province };
    const options = {params: params};
    return this.http.get<Object[]>(this.producersFilterDetailsUrl, options);
  }

  getAllProducersDetails() : Observable<Object[]> {
    return this.http.get<Object[]>(this.producersListDetailsUrl);
  }

  getLogo(id : any) {
    return this.http.get(this.producerLogoUrl + "/" + id);
  }

  getProducerDetails(id : any) {
    return this.http.get(this.producersDetailsUrl + "/" + id);
  }

  getAllImages(id : any){
    return this.http.get(this.producerAllImagesUrl + "/" + id);
  }








    }
