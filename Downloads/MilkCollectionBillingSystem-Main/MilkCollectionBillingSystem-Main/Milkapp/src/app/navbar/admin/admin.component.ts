import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService} from 'src/app/api.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent{
    formdata:any;
    constructor(private route:Router,private api:ApiService){}
    ngOnInit(){
      this.formdata=new FormGroup({
        username:new FormControl("",Validators.required),
        password:new FormControl("",Validators.required),
      });
    }

    log(result:any){
      if(result.username.length>0 && result.password.length>0){
         this.api.adminlog(result).subscribe((res)=>{
          if(res.submit==true){
            sessionStorage.setItem("access",res.submit);
            alert("admin successfully login");
            this.route.navigate(["/dashboard"]); 
            sessionStorage.setItem("name",res.data);
            sessionStorage.setItem('uname',result.username);
            
          }
          else{
            alert("incorrect username and password ");
            this.formdata.reset();
          }
         },
         (err)=>{
          console.log(err);
         })
      }
      
    }

     
}
