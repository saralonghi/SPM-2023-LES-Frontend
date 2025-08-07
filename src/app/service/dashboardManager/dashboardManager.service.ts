import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Producer} from "../../model/producer/producer";
import {Observable, map, throwError, catchError} from "rxjs";
import {Admin} from "../../model/admin/admin";
import { UpdateContact } from '../../model/updateContact/update-contact';
import {Image} from "../../model/image/image";
import {environment} from "../../../environments/environment.development";
import {Newsletter} from "../../model/newsletter/newsletter";

@Injectable({
  providedIn: 'root'
})


export class DashboardManagerService {

  dashboardProducerURL = `${environment.apiUrl}/producer/dashboard`;
  dashboardAdminURL = `${environment.apiUrl}/admin/dashboard`;

  dashboardUploadImageURL = `${environment.apiUrl}/producer/uploadImage`;
  dashboardUploadImagesURL = `${environment.apiUrl}/producer/uploadImages`;
  dashboardUploadLogoURL = `${environment.apiUrl}/producer/uploadLogo`;
  dashboardUploadCoverURL = `${environment.apiUrl}/producer/uploadCover`;
  dashboardUpdateProducerURL = `${environment.apiUrl}/producer/updateProducer`;

  dashboardDeleteProducerNewsletterURL = `${environment.apiUrl}/producer/deleteProducerNewsletter`;
  dashboardCreateNewsletterURL = `${environment.apiUrl}/producer/createNewsLetter`;
  dashboardGetNewsletterProducerURL = `${environment.apiUrl}/producer/getNewsletterProducer`
  dashboardRetrieveLogoURL = `${environment.apiUrl}/producer/retrieveLogo`;
  dashboardDeleteAllImagesURL = `${environment.apiUrl}/producer/deleteAllImages`;
  dashboardDeleteImageURL = `${environment.apiUrl}/producer/deleteImage`;
  dashboardDeleteCoverURL = `${environment.apiUrl}/producer/deleteCover`;
  dashboardRetrieveCoverURL = `${environment.apiUrl}/producer/retrieveCover`;
  dashboardRetrieveAllImagesURL = `${environment.apiUrl}/producer/retrieveAllImages`;
  dashboardProducersDetailsURL = `${environment.apiUrl}/producer/get/producersDetails`;


  dashboardCreateNewsURL = `${environment.apiUrl}/admin/createNews`;
  dashboardGetNewsletterURL =`${environment.apiUrl}/admin/newsletter`;
  sendApproveNewsletterURL = `${environment.apiUrl}/admin/sendNewsletter`;
  dashboardApproveNewsletterURL = `${environment.apiUrl}/admin/approveNewsletter`;
  dashboardRejectNewsletterURL = `${environment.apiUrl}/admin/rejectNewsletter`;
  dashboardRestoreNewsletterURL = `${environment.apiUrl}/admin/restoreNewsletter`;
  dashboardDeleteNewsletterURL = `${environment.apiUrl}/admin/deleteNewsletter`;
  dashboardAllNewsletterNotActiveURL = `${environment.apiUrl}/admin/allNewsletter/notActive`;
  dashboardAllNewsletterActiveURL = `${environment.apiUrl}/admin/allNewsletter/active`;

  dashboardAllProducersNotActiveURL = `${environment.apiUrl}/admin/allProducer/notActive`;
  dashboardAllProducersActiveURL = `${environment.apiUrl}/admin/allProducer/active`;
  dashboardGetProducerURL =`${environment.apiUrl}/admin/producer`;
  dashboardDeleteProducerURL = `${environment.apiUrl}/admin/producerDelete`;
  dashboardRestoreProducerURL = `${environment.apiUrl}/admin/restoreProducer`;
  dashboardProducerApproveURL = `${environment.apiUrl}/admin/approveProducer`;
  dashboardProducerRejectedURL = `${environment.apiUrl}/admin/rejectProducer`;

  authHeader;
  bearer : any = sessionStorage.getItem('Bearer');


  constructor(private http: HttpClient) {
    this.authHeader = new HttpHeaders({'Authorization': this.bearer})
  }

//Login Producer and Admin------------------------------------------------------------------
  getLoggedProducer(): Observable<Producer>{
    return this.http.get<Producer>(this.dashboardProducerURL, {headers:this.authHeader});
  }
  getLoggedAdmin(): Observable<Admin>{
    return this.http.get<Admin>(this.dashboardAdminURL, {headers:this.authHeader});
  }


//Dashboards--------------------------------------------------------------------------------
  listDashBoardProducer = [
    {nome : "Dati Personali", isActive : "" , path: "dati"},
    {nome : "Inserisci Immagini",  isActive : "" , path: "other-img"},
    {nome : "Crea Newsletter",  isActive : "" , path: "crea-newsletter"},
    {nome : "Storico Newsletter",  isActive : "" , path: "prod-newsletterhistory"},
  ]
  listDashBoard = [
    {nome : "Newsletter", isActive : "" , path: "newsletter"},
    {nome : "Produttori", isActive : "" , path: "producer"},
    {nome : "Crea News",  isActive : "" , path: "news"},
    {nome : "Cronologia dei Produttori",  isActive : "" , path: "producerhistory"},
    {nome : "Cronologia delle Newsletter",  isActive : "" , path: "newsletterhistory"},
  ]
  getListDashboard(){
    return this.listDashBoard;
  }
  getListDashboardProducer(){
    return this.listDashBoardProducer;
  }


//Newsletter--------------------------------------------------------------------------------


  getGetNewsletterURL(id : any) {
    const url = `${this.dashboardGetNewsletterURL}/${id}`;
    return this.http.get(url,{params: id, headers:this.authHeader});
  }
  getAllNewsletterNotActive() {
    return this.http.get(this.dashboardAllNewsletterNotActiveURL, {headers: this.authHeader});
  }
  getAllNewsletterActive() {
    return this.http.get(this.dashboardAllNewsletterActiveURL, {headers: this.authHeader});
  }

  approveNewsletter(id: any) {
  //  const url = `${this.dashboardApproveNewsletterURL}/${id}`;
    return this.http.post( this.dashboardApproveNewsletterURL ,id, { headers:this.authHeader});
  }

  sendNewsletter(id: any) {
    //  const url = `${this.dashboardApproveNewsletterURL}/${id}`;
    return this.http.post( this.sendApproveNewsletterURL ,id, { headers:this.authHeader});
  }
  rejectNewsletter(id: any) {
    return this.http.post( this.dashboardRejectNewsletterURL,id, {  headers:this.authHeader});
  }
  restoreNewsletter(id : any) {
    return this.http.post(this.dashboardRestoreNewsletterURL,id ,{headers:this.authHeader});
  }
  deleteNewsletter(id : any ){
    const url = `${this.dashboardDeleteNewsletterURL}/${id}`;
     return this.http.delete(url,{params: id, headers:this.authHeader});
  }

  deleteProducerNewsletter(id : any ){
    const url = `${this.dashboardDeleteProducerNewsletterURL}/${id}`;
    return this.http.delete(url,{params: id, headers:this.authHeader});
  }
  createNewsletter(newsletter: FormData){
    return this.http.post(this.dashboardCreateNewsletterURL, newsletter, {headers:this.authHeader});
  }

  getNewsletterProducer(id : any) {
    const url = `${this.dashboardGetNewsletterProducerURL}/${id}`;
    return this.http.get(url,{params: id, headers: this.authHeader});
  }

//News--------------------------------------------------------------------------------
  createNews(news: FormData){
    return this.http.post(this.dashboardCreateNewsURL, news, {headers:this.authHeader});
  }

//--------------------------------------Images----------------------------------------
//Logo--------------------------------------------------------------------------------
  retrieveLogo(id : any) {
    const url = `${this.dashboardRetrieveLogoURL}/${id}`;
    return this.http.get(url, { params: id, headers:  this.authHeader});
  }
  uploadLogo(img: FormData) {
    return this.http.post(this.dashboardUploadLogoURL, img, {headers:this.authHeader});
  }

//Cover-------------------------------------------------------------------------------
  retrieveCover(id : any) {
    const url = `${this.dashboardRetrieveCoverURL}/${id}`;
    return this.http.get(url ,{params: id, headers:this.authHeader});
  }
  uploadCover(img: FormData) {
    return this.http.post(this.dashboardUploadCoverURL, img, {headers:this.authHeader});
  }


//Other--------------------------------------------------------------------------------
  uploadImages(img: FormData) {
    return this.http.post(this.dashboardUploadImagesURL, img, {headers:this.authHeader});
  }
  deleteAllImages(id : any) {
    const url = `${this.dashboardDeleteAllImagesURL}/${id}`;
    return this.http.delete(url, {params: id, headers:this.authHeader});
  }
  deleteImage(ID: any) {
    const url = `${this.dashboardDeleteImageURL}/${ID}`;
    return this.http.delete(url, { params : ID, headers: this.authHeader});
  }
  getAllImages(id: any) {
    const url = `${this.dashboardRetrieveAllImagesURL}/${id}`;
    return this.http.get(url ,{params: id, headers:this.authHeader});
  }


//Producer--------------------------------------------------------------------------------
  getProducer(id:any){
    const url = `${this.dashboardGetProducerURL}/${id}`;
    return this.http.get(url,{params:id, headers:this.authHeader});
  }
  getAllProducersNotActive() {
    return this.http.get(this.dashboardAllProducersNotActiveURL,{headers:this.authHeader});
  }
  getAllProducersActive() {
    return this.http.get(this.dashboardAllProducersActiveURL,{headers:this.authHeader});
  }
  deleteProducer(id : any ){
   return this.http.delete(this.dashboardDeleteProducerURL, {body: id, headers:this.authHeader});
  }
  restoreProducer(id : string) : Observable<any>{
    return this.http.post(this.dashboardRestoreProducerURL, id ,{headers:this.authHeader});
  }
  acceptProducer(producer: string) {
    return this.http.post(this.dashboardProducerApproveURL, producer,{headers:this.authHeader});
  }
  rejectProducer(producer: string) {
    return this.http.post(this.dashboardProducerRejectedURL, producer,{headers:this.authHeader});
  }
  updateProducer(updateProducer: UpdateContact) : Observable<any>{
    return this.http.post(this.dashboardUpdateProducerURL, updateProducer,{headers:this.authHeader});
  }




}
