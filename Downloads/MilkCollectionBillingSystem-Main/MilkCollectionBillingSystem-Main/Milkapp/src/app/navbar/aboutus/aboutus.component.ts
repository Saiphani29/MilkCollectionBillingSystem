import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {
  customOptions: OwlOptions = {
    autoplay:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    navSpeed: 75,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      30: {
        items: 1
      },
      74: {
        items: 1
      },
      94: {
        items: 1
      }
    },
    nav: true
  }

}
