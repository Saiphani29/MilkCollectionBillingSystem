import { Component } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  sellerdata:any;
  name:any;
  
  constructor(private rt:Router,private sellapi:ApiService){}
  ngOnInit(){
    this.sellerdata=new FormGroup({
      usercode:new FormControl(""),
      password:new FormControl("")
    })
  }
sell(sdata:any){
    if(sdata.usercode.length>0 && sdata.password.length>0){
      this.sellapi.seller(sdata).subscribe((res)=>{
        if(res.submit==true){
          sessionStorage.setItem("control",res.submit);
          alert("seller logined successfully");
          sessionStorage.setItem("key1",res.name);
          sessionStorage.setItem("key2",res.usercode);
       
          this.rt.navigate(['/selldash']);
          
        }
        else{
          alert("incorrect credentials");
          console.log(res);
          this.sellerdata.reset();
        }
      },
      (err)=>{
        console.log(err);
      }
      )
    }
}
}
