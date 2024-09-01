import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { enqtype } from 'src/app/enq.model';
@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent {
  alldetails:enqtype[];
     constructor(private enq:ApiService){}
     ngOnInit(){
      this.get();
     }
     get(){
      this.enq.enqinfo().subscribe((res)=>{
         if(res.submit==true){
            this.alldetails=res.details;
            console.log(this.alldetails);
         }
      })
     }

}
