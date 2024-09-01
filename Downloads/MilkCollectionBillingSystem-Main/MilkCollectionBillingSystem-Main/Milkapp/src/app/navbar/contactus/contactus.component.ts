import { Component } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  formdata:any;
  constructor(private cp:ApiService){}
  ngOnInit(){
    this.formdata=new FormGroup({
     name:new FormControl(""),
     email:new FormControl(""),
     subject:new FormControl(""),
     message:new FormControl("")
    })
  }
  sub(data:any){
     if(data.name.length>0 && data.email.length>0 && data.subject.length>0 && data.message.length>0){
       this.cp.contact(data).subscribe((res)=>{
           if(res.submit==true){
            alert("data send successfully");
            this.formdata.reset();
           }
           else{
                  alert("check ur data");
           }
       });
        
     }
     else{
      alert(" All details must be filled");
     }
  }
}
