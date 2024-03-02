import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-valby',
  templateUrl: './valby.component.html',
  styleUrls: ['./valby.component.scss']
})
export class ValbyComponent {
  constructor( private router: Router,){}

  footerConnectionTitle:String = "Massage";

  ngOnInit() {
    if(this.router.url?.toLocaleLowerCase()?.includes("massage")){
      this.footerConnectionTitle = "Massage";
    } else if(this.router.url?.toLocaleLowerCase()?.includes("escort")){
      this.footerConnectionTitle = "Escort";
    }
  }
}
