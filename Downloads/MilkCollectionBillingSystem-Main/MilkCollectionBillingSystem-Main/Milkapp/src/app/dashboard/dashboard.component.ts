import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private rout:Router){}
   
  ngOnInit(){}
   action(){
    if(confirm("Are u sure want to Logout?")){
     sessionStorage.removeItem('access');
     this.rout.navigate(['navbar/home']);
     
    }
   }
   getname(){
    return sessionStorage.getItem("name");
   }
}

