import { Component, NgModule } from '@angular/core';
import {RegisterComponent} from "./register/register.component";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {SuccessSignupComponent} from "./register/success-signup/success-signup.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {LoginAdminComponent} from "./login-admin/login-admin.component";
import {DashboardAdminComponent} from "./admin/dashboard-admin/dashboard-admin.component";
import { NewsletterComponent } from './admin/newsletter/newsletter.component';
import { ProducerComponent } from './admin/producer/producer.component';
import { NewsletterChildComponent } from './admin/newsletter-child/newsletter-child.component';
import { ProducerChildComponent } from './admin/producer-child/producer-child.component';
import { CreaNewsComponent } from './admin/crea-news/crea-news.component';
import { ProducerHistoryComponent} from "./admin/producer-history/producer-history.component";
import {NewsletterhistoryComponent} from "./admin/newsletterhistory/newsletterhistory.component";
import {ProducerViewComponent} from "./view/producer-view/producer-view.component";
import {ProducersCollectionComponent} from "./view/producers-collection/producers-collection.component";
import {DashboardProducerComponent} from "./producer/dashboard-producer/dashboard-producer.component";
import {InfoComponent} from "./producer/info/info.component";
import {LogoComponent} from "./producer/logo/logo.component";
import {PCreaNewsletterComponent} from "./producer/p-crea-newsletter/p-crea-newsletter.component";
import {PNewsletterHistoryComponent} from "./producer/p-newsletter-history/p-newsletter-history.component";
import {PNewsletterComponent} from "./producer/p-newsletter/p-newsletter.component";
import {POtherImgComponent} from "./producer/p-other-img/p-other-img.component";
import {AllNewsComponent} from "./news/all-news/all-news.component";
import {InsertNewPasswordComponent} from "./recoverPassword/insert-new-password/insert-new-password.component";
import {InsertEmailRecoverComponent} from "./recoverPassword/insert-email-recover/insert-email-recover.component";
import {NewsDetailsComponent} from "./news/news-details/news-details.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {TokenExpiredComponent} from "./error/token-expired/token-expired.component";
import {RecoverConfirmComponent} from "./recoverPassword/recover-confirm/recover-confirm/recover-confirm.component";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'associazione', component: AboutUsComponent},
  { path: 'login', component:LoginComponent},
  { path: 'loginAdmin', component:LoginAdminComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'successSignup', component:SuccessSignupComponent},
 //{ path: 'produttori', component: ProduttoriComponent},
 //{ path: 'presentazione', component: PresentazioneComponent},

  {path: 'dashboardAdmin', component: DashboardAdminComponent, children:  [
    {path: 'newsletter', component : NewsletterComponent},
    {path: 'newsletter/:id', component : NewsletterChildComponent},
    {path: 'newsletterhistory', component : NewsletterhistoryComponent},
    {path: 'producer', component : ProducerComponent},
    {path: 'producer/:id', component : ProducerChildComponent},
    {path: 'news', component : CreaNewsComponent},
    {path: 'producerhistory', component : ProducerHistoryComponent},
    ],},


  {path: 'dashboardProducer', component: DashboardProducerComponent, children:  [
      {path: 'dati', component : InfoComponent},
      {path: 'other-img', component: POtherImgComponent},
      {path: 'crea-newsletter', component : PCreaNewsletterComponent},
      {path: 'prod-newsletterhistory', component : PNewsletterHistoryComponent},
      {path: 'prod-newsletterhistory/:id', component : PNewsletterComponent},

    ],},

  { path: 'producers', component: ProducersCollectionComponent},
  {path: 'producers/profile/:id', component: ProducerViewComponent},
  {path: 'all-news', component: AllNewsComponent},
  { path: 'all-news/news/:id', component: NewsDetailsComponent},

  //{ path: 'dashboardAdmin/newsletter', component : NewsletterComponent},
  //{ path: 'profilo', component: ProfiloProduttoreComponent},
  { path: 'logout', component: LogoutComponent},
  {path: 'recoverPassword/:token', component: InsertNewPasswordComponent},
  {path: 'insertEmail', component: InsertEmailRecoverComponent},
  {path: 'error/token-expired', component: TokenExpiredComponent},
  {path:'recoverConfirm', component: RecoverConfirmComponent},
  //{ path: '**', component: ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
