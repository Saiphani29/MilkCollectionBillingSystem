import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-sellerdashboard',
  templateUrl: './sellerdashboard.component.html',
  styleUrls: ['./sellerdashboard.component.css']
})
export class SellerdashboardComponent {
   constructor(private rout:Router,private st:ApiService){}
  get(){
    return sessionStorage.getItem("key1");
  }
  action(){
    if(confirm("Are sure to logout")){
      sessionStorage.removeItem("control");
    this.rout.navigate(['/navbar/seller']);
    }
  }
   
   
}
