import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { milktype } from 'src/app/milk.model';
@Component({
  selector: 'app-milksubmission',
  templateUrl: './milksubmission.component.html',
  styleUrls: ['./milksubmission.component.css']
})
export class MilksubmissionComponent {
constructor(private st:ApiService){}
milkdata:milktype[];
ngOnInit(){
  console.log(sessionStorage,'session');
    this.st.milkinfo(sessionStorage.getItem('uname')).subscribe((res)=>{
      if(res.submit==true){
        this.milkdata=res.milkdata;
        console.log(res.milkdata);
      }
      
    })
}
}
