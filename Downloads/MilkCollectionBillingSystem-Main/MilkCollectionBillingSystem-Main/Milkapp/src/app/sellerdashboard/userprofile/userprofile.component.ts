import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {
  formdata;
  data;
  k;
  constructor(private ap:ApiService){}
  ngOnInit(){
    this.getdata();
    this.formdata = new FormGroup({
      name: new FormControl(),
      usercode: new FormControl(),
      password: new FormControl(),
      chpass: new FormControl("")
    });
  }
  cancel(){
    this.formdata.reset();
  }
  user(data){
     
    this.ap.userpro(data).subscribe((res)=>{
    if(res.submit==true){
      alert("updated successfully");
      this.formdata.reset();

    }
    })
  }
  getdata(){
    this.k=sessionStorage.getItem('key2');
    console.log(this.k);
    this.ap.getuserInfo(this.k).subscribe((res)=>{
      this.data=res.data;
      this.formdata.patchValue({
        name: this.data[0].name,
        usercode: this.data[0].usercode,
        password: this.data[0].password
      });
       
    })
  }

}
