import { Component } from '@angular/core';
import { paymodel } from '../../dashboard/pay.model';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  records:paymodel[];
  usercode;
  constructor(private st:ApiService){}
  ngOnInit(){
    this.usercode=sessionStorage.getItem("key2");
   console.log(this.usercode)
    this.st.paymentdetails(this.usercode).subscribe((res)=>{
      if(res.submit==true){
         this.records=res.paydetails;
          
      }
    })
  }

}
