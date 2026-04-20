import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-home3',
  templateUrl: './home3.component.html',
  styleUrls: ['./home3.component.css']
})
export class Home3Component {
  constructor(private get:ApiService){}
  code;
  days;
  liters;
  amount;
  balance;
  ngOnInit(){
    this.code=sessionStorage.getItem('key2');
    this.get.getall(this.code).subscribe((res)=>{
     if(res.submit==true){
      console.log(res)
       this.amount=res.amount;
       this.days=res.days;
       this.balance=res.remain;
       this.liters=res.liters;
       
     }
        
    })
  }

}
