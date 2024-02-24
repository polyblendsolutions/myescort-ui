import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

  // Header fixed for scroll
  headerFixed = false;
  @HostListener('window:scroll')
  scrollBody() {
    if (window.scrollY > 0) {
      this.headerFixed = true;
    }
    else {
      this.headerFixed = false;
    }
  }

}
