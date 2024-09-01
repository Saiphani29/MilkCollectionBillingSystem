import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { milktype } from 'src/app/milk.model';
 
@Component({
  selector: 'app-milkrecords',
  templateUrl: './milkrecords.component.html',
  styleUrls: ['./milkrecords.component.css']
})
export class MilkrecordsComponent {
  milkdetails:milktype[];
  code;
  constructor(private st:ApiService){}
  ngOnInit(){
    this.code=sessionStorage.getItem("key2");
    this.st.details(this.code).subscribe((res)=>{
      if(res.submit==true){
        this.milkdetails=res.details;
        console.log(this.milkdetails);
      }
    })
  }
}
