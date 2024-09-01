import { Component } from '@angular/core';
import { smodel } from '../../../app/st.model';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-sellerlist',
  templateUrl: './sellerlist.component.html',
  styleUrls: ['./sellerlist.component.css']
})
export class SellerlistComponent {
  seller: smodel[] ;
  show = false;
  sellerdata:any;
  uname:any;
  constructor(private sapi: ApiService, private rt: Router) { }
  ngOnInit() {
    this.getdata();
  }
  getdata() {
    this.uname=sessionStorage.getItem('uname');
    this.sapi.fetchsellerdata(this.uname).subscribe((res) => {
      if (res.submit == true) {
        this.seller = res.data;
        console.log(res.data);
      }
      else{
        alert("data not found")
      }
    },
      (err) => {
        console.log(err);
      }
    )
  }
  delete(id:any) {
    this.sapi.delseller(id).subscribe((res) => {
      console.log(res.submit);
      if (res.submit == true) {
        alert("deleted");
        this.getdata();
      }
    },
      (err) => {
        console.log(err);
      })
  }
  openform(sdata:any) {
    this.show = true;
    this.sellerdata = new FormGroup({
      name: new FormControl(sdata.name),
      email: new FormControl(sdata.email),
      password: new FormControl(sdata.password),
      username: new FormControl(sdata.username),
      usercode: new FormControl(sdata.usercode),
      phoneno: new FormControl(sdata.phoneno),
      street: new FormControl(sdata.street),
      District: new FormControl(sdata.District),
      village: new FormControl(sdata.village),
      zipcode: new FormControl(sdata.zipcode),
      mandal: new FormControl(sdata.mandal),
      state: new FormControl(sdata.state),
      gender: new FormControl(sdata.gender),
      RegisterDate:new FormControl(sdata.RegisterDate)
     

    });
    ;
   



  }
  closeform(){
    this.show=false;
    console.log(this.show);
  }
  reg(data:any) {
     let uid=data.usercode;
     this.sapi.update(data,uid).subscribe((res)=>{
      if(res.submit==true){
        alert("updated successfully");
        this.getdata();
      }
     },(err)=>{
      console.log(err);
     }
     ) 
    
         
  }




}
