import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './navbar/home/home.component';
import { AboutusComponent } from './navbar/aboutus/aboutus.component';
import { SellerComponent } from './navbar/seller/seller.component';
import { ContactusComponent } from './navbar/contactus/contactus.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AdminComponent } from './navbar/admin/admin.component';
import { ApiService } from './api.service';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Home2Component } from './dashboard/home2/home2.component';
import { SellerregisterComponent } from './dashboard/sellerregister/sellerregister.component';
import { MilksubmissionComponent } from './dashboard/milksubmission/milksubmission.component';
import { RatechartComponent } from './dashboard/ratechart/ratechart.component';
import { MilkcollectionComponent } from './dashboard/milkcollection/milkcollection.component';
import { BillgenerationComponent } from './dashboard/billgeneration/billgeneration.component';
import { PaymentComponent } from './dashboard/payment/payment.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { SellerlistComponent } from './dashboard/sellerlist/sellerlist.component';
import { EnquiryComponent } from './dashboard/enquiry/enquiry.component';
import { SellerdashboardComponent } from './sellerdashboard/sellerdashboard.component';
import { Home3Component } from './sellerdashboard/home3/home3.component';
import { MilkrecordsComponent } from './sellerdashboard/milkrecords/milkrecords.component';
import { PaymentsComponent } from './sellerdashboard/payments/payments.component';
import { UserprofileComponent } from './sellerdashboard/userprofile/userprofile.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutusComponent,
    SellerComponent,
    ContactusComponent,
    AdminComponent,
    DashboardComponent,
    Home2Component,
    SellerregisterComponent,
    MilksubmissionComponent,
    RatechartComponent,
    MilkcollectionComponent,
    BillgenerationComponent,
    PaymentComponent,
    ProfileComponent,
    SellerlistComponent,
    EnquiryComponent,
    SellerdashboardComponent,
    Home3Component,
    MilkrecordsComponent,
    PaymentsComponent,
    UserprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule
    
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
