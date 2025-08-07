import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { FooterComponent} from "./basic/footer/footer.component";
import { NavbarComponent} from "./basic/navbar/navbar.component";
import { SuccessSignupComponent} from "./register/success-signup/success-signup.component";
import { ReactiveFormsModule } from '@angular/forms';
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {LoginAdminComponent} from "./login-admin/login-admin.component";
import {DashboardAdminComponent} from "./admin/dashboard-admin/dashboard-admin.component";
import { NewsletterComponent } from './admin/newsletter/newsletter.component';
import { ProducerComponent } from './admin/producer/producer.component';
import { NewsletterChildComponent } from './admin/newsletter-child/newsletter-child.component';
import { ProducerChildComponent } from './admin/producer-child/producer-child.component';
import { CreaNewsComponent } from './admin/crea-news/crea-news.component';
import { ProducerHistoryComponent } from "./admin/producer-history/producer-history.component";
import { NewsletterhistoryComponent } from "./admin/newsletterhistory/newsletterhistory.component";
import { ProducerViewComponent } from "./view/producer-view/producer-view.component";
import { ProducersCollectionComponent } from "./view/producers-collection/producers-collection.component";
import { NgOptimizedImage } from "@angular/common";
import { DashboardProducerComponent } from "./producer/dashboard-producer/dashboard-producer.component";
import {InfoComponent} from "./producer/info/info.component";
import {LogoComponent} from "./producer/logo/logo.component";
import {PCreaNewsletterComponent} from "./producer/p-crea-newsletter/p-crea-newsletter.component";
import {PNewsletterHistoryComponent} from "./producer/p-newsletter-history/p-newsletter-history.component";
import {PNewsletterComponent} from "./producer/p-newsletter/p-newsletter.component";
import {POtherImgComponent} from "./producer/p-other-img/p-other-img.component";
import {AllNewsComponent} from "./news/all-news/all-news.component";
import {
  InsertEmailRecoverComponent
} from "./recoverPassword/insert-email-recover/insert-email-recover.component";
import {
  InsertNewPasswordComponent
} from "./recoverPassword/insert-new-password/insert-new-password.component";
import {NewsDetailsComponent} from "./news/news-details/news-details.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {TokenExpiredComponent} from "./error/token-expired/token-expired.component";
import {NgxPaginationModule} from 'ngx-pagination';
import {RecoverConfirmComponent} from "./recoverPassword/recover-confirm/recover-confirm/recover-confirm.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    FooterComponent,
    NavbarComponent,
    SuccessSignupComponent,
    LoginComponent,
    LogoutComponent,
    DashboardProducerComponent,
    LoginAdminComponent,
    DashboardAdminComponent,
    NewsletterComponent,
    ProducerComponent,
    ProducerChildComponent,
    NewsletterChildComponent,
    CreaNewsComponent,
    ProducerHistoryComponent,
    NewsletterhistoryComponent,
    ProducerViewComponent,
    ProducersCollectionComponent,
    DashboardProducerComponent,
    InfoComponent,
    LogoComponent,
    POtherImgComponent,
    PCreaNewsletterComponent,
    PNewsletterHistoryComponent,
    PNewsletterComponent,
    AllNewsComponent,
    InsertEmailRecoverComponent,
    InsertNewPasswordComponent,
    NewsDetailsComponent,
    AboutUsComponent,
    TokenExpiredComponent,
    RecoverConfirmComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    NgxPaginationModule
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
