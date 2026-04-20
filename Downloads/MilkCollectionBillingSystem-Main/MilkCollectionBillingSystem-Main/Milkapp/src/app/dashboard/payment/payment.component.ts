import { Component } from '@angular/core';
 import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { paymodel} from '../pay.model'
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
paydata;
billdata;
valid=true;
show = false;
details:paymodel[];
name;
constructor(private pay:ApiService){}
ngOnInit(){
  this.paydata=new FormGroup({
    usercode:new FormControl(""),
    date:new FormControl(""),
    Amount:new FormControl("")
  })
  this.billdata=new FormGroup({
    searchvalue:new FormControl("")
  })
  
   
}
payment(data){
  data["username"]=sessionStorage.getItem('uname');
  this.pay.payments(data,data["username"]).subscribe((res)=>{
    if(res.submit==true){
      alert("Payment Successful");
      this.paydata.reset();
    }
    else{
      alert("payment not successful");
    }
  })

}
getdata(bill){
 
  if(bill.searchvalue.length>0){
    this.name=sessionStorage.getItem('uname');
   this.pay.fetchpay(bill,this.name).subscribe((res)=>{
    if(res.submit==true){
      this.show = true;
      this.valid=false;
          this.details=res.resultset;
           
    }
    else{
      alert(res.message);
    }
   });
  }
  else{
    alert("Enter  all Details");
    this.show=false;
    this.valid=true;
    
  }
  (err)=>{
    console.log(err);
  }
}

}

