import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  formdata;
  code;
  data;
  constructor(private adminapi: ApiService) { }
  ngOnInit() {
    this.adminapi.getAdminInfo().subscribe((res)=>{
      console.log(res);
      this.data=res.data;
      console.log(this.data);
      this.formmaker();
    },
    (err)=>{
      console.log(err);
    });
    
      
  
  }
  formmaker(){
    console.log("hii",this.data[0]['name'])
      this.formdata = new FormGroup({
        x:new FormControl(''),
        name: new FormControl(this.data[0]['name']),
        username: new FormControl(this.data[0]['username']),
        password: new FormControl(this.data[0]['password']),
        chpass: new FormControl("")
      });
  }
  admin(data) {
     this.code=sessionStorage.getItem('uname');
    if (data.name.length > 0 && data.username.length > 0 && data.password.length > 0 && data.chpass.length > 0) {
      this.adminapi.send(data,this.code).subscribe((res) => {
        if (res.submit == true) {
          alert("updated successfully");
          this.formdata.reset();

        }
        else {
          alert("no data found");
        }
      });
    }
    else{
      alert("fill all details");
    }
  }
  cancel() {
    this.formdata.reset();
  }


}
