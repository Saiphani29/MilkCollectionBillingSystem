import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './navbar/home/home.component';
import { SellerComponent } from './navbar/seller/seller.component';
import { AboutusComponent } from './navbar/aboutus/aboutus.component';
import { ContactusComponent } from './navbar/contactus/contactus.component';
import { AdminComponent } from './navbar/admin/admin.component';
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
import { AdminauthorGuard } from './navbar/adminauthor.guard';
import { SellerdashboardComponent } from './sellerdashboard/sellerdashboard.component';
import { SellerauthorGuard } from './navbar/sellerauthor.guard';
import { Home3Component } from './sellerdashboard/home3/home3.component';
import { PaymentsComponent } from './sellerdashboard/payments/payments.component';
import { UserprofileComponent } from './sellerdashboard/userprofile/userprofile.component';
import { MilkrecordsComponent } from './sellerdashboard/milkrecords/milkrecords.component';

const routes: Routes = [
  {path:'',redirectTo:'navbar',pathMatch:'full'},
    {path:'navbar',component:NavbarComponent,children:[
      {path:'',component:HomeComponent},
      {path:'home',component:HomeComponent},
      {path:'admin',component:AdminComponent},
      {path:'seller',component:SellerComponent},
      {path:'about',component:AboutusComponent},
      {path:'contact',component:ContactusComponent}
    ]},
    {path:'dashboard',component:DashboardComponent,
    canActivate:[AdminauthorGuard],
    children:[
      {path:'',redirectTo:'home2',pathMatch:'full'},
      {path:'home2',component:Home2Component},
      {path:'sellereg',component:SellerregisterComponent},
      {path:'milksub',component:MilksubmissionComponent},
      {path:'ratechart',component:RatechartComponent},
      {path:'milkcollection',component:MilkcollectionComponent},
      {path:'billGenerate',component:BillgenerationComponent},
      {path:'payment',component:PaymentComponent},
      {path:'profile',component:ProfileComponent},
      {path:'sellerlist',component:SellerlistComponent},
      {path:'enquiry',component:EnquiryComponent}
    ]},
    {path:'selldash',component:SellerdashboardComponent,canActivate:[SellerauthorGuard],children:[
      {path:'',redirectTo:'home3',pathMatch:'full'},
      {path:'home3',component:Home3Component},
      {path:'payments',component:PaymentsComponent},
      {path:'profiles',component:UserprofileComponent},
      {path:'records',component:MilkrecordsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
