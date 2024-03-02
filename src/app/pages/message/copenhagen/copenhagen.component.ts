import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-copenhagen',
  templateUrl: './copenhagen.component.html',
  styleUrls: ['./copenhagen.component.scss']
})
export class CopenhagenComponent {
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
