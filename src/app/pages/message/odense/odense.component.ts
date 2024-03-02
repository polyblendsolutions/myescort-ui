import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-odense',
  templateUrl: './odense.component.html',
  styleUrls: ['./odense.component.scss']
})
export class OdenseComponent {
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
