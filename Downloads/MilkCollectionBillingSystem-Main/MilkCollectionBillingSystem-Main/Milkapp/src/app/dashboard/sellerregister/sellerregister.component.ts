import { Component } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-sellerregister',
  templateUrl: './sellerregister.component.html',
  styleUrls: ['./sellerregister.component.css']
})
export class SellerregisterComponent {
  sellerdata:any;
  constructor(private rt: ApiService) { }
  ngOnInit() {
    this.sellerdata = new FormGroup({
      name: new FormControl("",[Validators.required,Validators.minLength(1)]),
      email: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required,Validators.minLength(8)]),
      usercode: new FormControl("", [Validators.required,Validators.minLength(1)]),
      phoneno: new FormControl("",[Validators.required,Validators.minLength(10)]),
      street: new FormControl("",[Validators.required,Validators.minLength(1)]),
      District: new FormControl("",[Validators.required,Validators.minLength(1)]),
      village: new FormControl("",[Validators.required,Validators.minLength(1)]),
      zipcode: new FormControl("",[Validators.required,Validators.maxLength(6),Validators.minLength(6)]),
      mandal: new FormControl("",[Validators.required,Validators.minLength(1)]),
      state: new FormControl("",[Validators.required,Validators.minLength(1)]),
      gender: new FormControl("",[Validators.required,Validators.minLength(1)]),
      RegisterDate: new FormControl("",[Validators.required,Validators.minLength(1)])

    });
  }
  reg(sdata:any) {
    
    if (sdata.name.length > 0 && sdata.email.length > 0 && sdata.password.length > 0 &&  sdata.usercode.length > 0 && sdata.phoneno.length > 0 && sdata.street.length > 0 && sdata.District.length > 0 && sdata.village.length > 0 && sdata.zipcode.length > 0 && sdata.mandal.length > 0 && sdata.state.length > 0 && sdata.gender.length > 0 && sdata.RegisterDate.length > 0) {
      sdata["username"]=sessionStorage.getItem('uname');
      this.rt.sellregister(sdata,).subscribe((res) => {
        if (res.submit == true) {
          alert("Seller Addedd");
          this.sellerdata.reset();
        }
        else {
          alert("duplicate entry");
          console.log(res.submit);
        }
      },
        (err) => {
          console.log(err);
        })


    }
  else{
    alert("Fill all Details");
  }}
     
  }