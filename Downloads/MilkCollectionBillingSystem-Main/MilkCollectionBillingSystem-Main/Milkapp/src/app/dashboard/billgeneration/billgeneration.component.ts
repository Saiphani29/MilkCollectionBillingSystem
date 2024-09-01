import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { billtype } from 'src/app/bill.model';
@Component({
  selector: 'app-billgeneration',
  templateUrl: './billgeneration.component.html',
  styleUrls: ['./billgeneration.component.css']
})
export class BillgenerationComponent {
  formdata;
  billdata: billtype[];
  Totalamount;
  show = false;
  user;
  constructor(private billapi: ApiService) { }
  ngOnInit() {
    this.formdata = new FormGroup({
      usercode: new FormControl(""),
      date1: new FormControl(""),
      date2: new FormControl("")
    })
  }
  bill(data) {

    if (data.usercode.length > 0 && data.date1.length > 0 && data.date2.length > 0) {
      this.user=sessionStorage.getItem('uname')
      this.billapi.generate(data,this.user).subscribe((res) => {
        if (res.submit == true) {
          this.show = true;
          this.billdata = res.bill;
          this.Totalamount = res.bal;
          console.log(this.Totalamount);
        }
        else {
          alert("no such user found");
        }
      })
    }
    else {
      alert("Enter  required details");
    }
    (err) => {
      console.log(err);
    }
  }

}
