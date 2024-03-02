import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aalboarg',
  templateUrl: './aalboarg.component.html',
  styleUrls: ['./aalboarg.component.scss']
})
export class AalboargComponent {
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
