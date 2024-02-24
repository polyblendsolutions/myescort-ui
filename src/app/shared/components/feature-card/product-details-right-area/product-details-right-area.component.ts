import {Component, Input, ViewChild} from '@angular/core';
import { Product } from 'src/app/interfaces/common/product.interface';

@Component({
  selector: 'app-product-details-right-area',
  templateUrl: './product-details-right-area.component.html',
  styleUrls: ['./product-details-right-area.component.scss']
})
export class ProductDetailsRightAreaComponent {
  @Input() product:Product;

  zoomImage: string;
  // Image Zoom & View Area
  @ViewChild('zoomViewer', {static: true}) zoomViewer;
  public onMouseMove(e) {
    if (window.innerWidth >= 1099) {
      const image = e.currentTarget;
      const offsetX = e.offsetX;
      const offsetY = e.offsetY;
      const x = offsetX / image.offsetWidth * 110;
      const y = offsetY / image.offsetHeight * 110;
      const zoom = this.zoomViewer.nativeElement.children[0];
      if (zoom) {
        zoom.style.backgroundPosition = x + '% ' + y + '%';
        zoom.style.display = 'block';
        zoom.style.height = `${100}%`;
        zoom.style.width = `${100}%`;
      }
    }
  }


  public onMouseLeave(event) {
    this.zoomViewer.nativeElement.children[0].style.display = 'none';
  }
}
