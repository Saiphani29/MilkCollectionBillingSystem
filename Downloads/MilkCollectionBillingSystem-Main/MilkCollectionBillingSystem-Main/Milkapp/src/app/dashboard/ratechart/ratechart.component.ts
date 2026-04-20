import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-ratechart',
  templateUrl: './ratechart.component.html',
  styleUrls: ['./ratechart.component.css']
})
export class RatechartComponent {
  constructor(private rtapi: ApiService) { }
  ratedata;
  fat1;
  ngOnInit() {
    this.ratedata = new FormGroup({
      fat: new FormControl(""),
      snf1: new FormControl(""),
      snf2: new FormControl(""),
      snf3: new FormControl(""),
      snf4: new FormControl("")

    })
  }
  insert(data) {
    this.rtapi.ratefix(data).subscribe((res) => {
      if (res.submit == true) {
        alert("rate inserted");
      } else {
         alert("data not inserted");
      }
    });
  }
  
  update(data) {
    this.fat1 = data.fat;
    this.rtapi.updated(this.fat1, data).subscribe((res) => {
      if (res.submit == true) {
        alert("data updated");
      }
      else{
        alert("data not updated");
      }
    });
  }
  

}
