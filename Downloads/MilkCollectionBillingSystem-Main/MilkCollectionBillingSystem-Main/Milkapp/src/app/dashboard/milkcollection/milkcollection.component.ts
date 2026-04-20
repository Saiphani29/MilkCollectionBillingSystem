import { Component } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-milkcollection',
  templateUrl: './milkcollection.component.html',
  styleUrls: ['./milkcollection.component.css']
})
export class MilkcollectionComponent {
  milkdata;
  constructor(private capi:ApiService){}
  ngOnInit(){
    this.milkdata=new FormGroup({
      usercode:new FormControl(""),
      date:new FormControl(""),
      timings:new FormControl(""),
      milktype:new FormControl(""),
      quantity:new FormControl(""),
      fat:new FormControl(""),
      snf:new FormControl("")
    })
  }
  collect(data){
   
    data['username']=sessionStorage.getItem('uname');
    console.log(data.usercode);
    this.capi.checkUserCode(data.usercode).subscribe(
      (res)=>{
        if(res.result[0]['count(*)']){
          
              this.capi.milkcoll(data).subscribe((res)=>{
                if(res.submit==true){
                  alert("data collected");
                  this.milkdata.reset();
                }
              },
              (err)=>{
                console.log(err);
              });

        }
        else{
          alert("Invalid UserCode");
        }
    
      },
      (err)=>{}
    );
     
  }

}
