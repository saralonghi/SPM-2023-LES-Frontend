import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producer } from '../../model/producer/producer';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ProducerService {
  private registerUrl: string;
  private allProducersUrl: string;
  private createSubscriberUrl: string;

  constructor(private http: HttpClient) {
    this.registerUrl = `${environment.apiUrl}/producer/register`;
    this.allProducersUrl = `${environment.apiUrl}/producer/allproducers`;
    this.createSubscriberUrl = `${environment.apiUrl}/user/createUser`;
  }


  public findAll(): Observable<Producer[]> {
    return this.http.get<Producer[]>(this.allProducersUrl);
  }

  public createSubscriber(email: any) {
    return this.http.post(this.createSubscriberUrl, email);
  }
  public save(producer: Producer)  {
    return this.http.post(this.registerUrl, producer);
  }


}
