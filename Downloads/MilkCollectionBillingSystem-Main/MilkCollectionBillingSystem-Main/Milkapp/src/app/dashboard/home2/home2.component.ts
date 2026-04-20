import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component {
   nousers:any;
   milkprice:any;
   totalmilk:any;
   daymilk:any;
   amount:any;
  user:any;

    constructor(private inf:ApiService){}
   ngOnInit(){
    this.getdetails();
    var d=new Date();
    var c=String(d);
    var e=c.split(" ")
    console.log(e[1]);
   }
   getdetails(){
     this.user=sessionStorage.getItem('uname');
       this.inf.dashboard(this.user).subscribe((res)=>{
        if(res.submit==true){
          this.nousers=res.nousers;
          this.milkprice=res.milkprice;
          this.totalmilk=res.totalmilk;
          this.daymilk=res.daymilk;
          this.amount=res.amount;
          
          console.log(res);
        }
       })
   }
}
