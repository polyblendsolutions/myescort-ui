import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {NgxSpinnerService} from 'ngx-spinner';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UiService} from "../../../../services/core/ui.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../services/common/user.service";
import {ProductService} from "../../../../services/common/product.service";
import {Product} from "../../../../interfaces/common/product.interface";
import {UtilsService} from "../../../../services/core/utils.service";
import {UserDataService} from "../../../../services/common/user-data.service";
import {ReloadService} from "../../../../services/core/reload.service";
import {FilterData} from "../../../../interfaces/core/filter-data";
import {CarouselCntrlService} from "../../../../services/common/carousel-cntrl.service";
import {pluck, Subscription} from "rxjs";

@Component({
  selector: 'app-quick-view-dialog',
  templateUrl: './quick-view-dialog.component.html',
  styleUrls: ['./quick-view-dialog.component.scss']
})
export class QuickViewDialogComponent  implements OnInit {
// @input() ids =id;
  //Store Data
  product: Product;
  id: string | any;
  slug: string | any;
  selectedImage: string;
  products: Product[];
  image: string;
  zoomImage: string;
  // Image Zoom & View Area
  @ViewChild('zoomViewer', {static: true}) zoomViewer;
  //Subscriptions
  private subDataOne: Subscription;
  private subParam: Subscription;


  constructor(
    private _carouselCtrl: CarouselCntrlService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
   @Inject(MAT_DIALOG_DATA) public data: string,

  ) {
  }



  ngOnInit(): void {
    // this.subParam = this.activatedRoute.queryParamMap.subscribe(res => {
    //   this.id = res.get('productId');
    //   if (this.id) {
    //     this.getSingleProductById(this.id);
    //   }
    // });
      if (this.data) {
        this.getSingleProductById(this.data);
      }

    this.subParam = this.activatedRoute.queryParamMap.pipe(pluck('params', 'categories')).subscribe(res => {
      if (res) {
        this.slug = res;
        this.getRelatedProduct(this.slug);
      }
    })
  }



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

  public selectImage(image: any) {
    this.image = image;
    this.zoomImage = image;
  }

  private setDefaultImage() {
    // this.image = this.product.images !== null ? this.product.images[0].big : '/assets/images/junk/Nokia 3310.jpg';
    this.image = this.product.images && this.product.images.length > 0 ? this.product.images[0] : '/assets/images/placeholder/test.png';
    // this.zoomImage = this.product.images[0].big;
    this.zoomImage = this.image;
  }


  /***
   * HTTP REQUEST HANDLE
   * getSingleProductById()
   * getRelatedProduct()
   */
  getSingleProductById(id: string) {
    this.subDataOne = this.productService.getProductById(id).subscribe(
      (res) => {
        if (res.success) {
          this.product = res.data;
          this.selectedImage = this.product.images[0];
          console.log("this.product",this.product);
          this.setDefaultImage();
          console.log(res.data);
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }
  onSelectImage(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.zoomImage = imageUrl;
  }


  getRelatedProduct(slug: string) {
    // Select
    const mSelect = {
      image: 1,
      name: 1,
      images: 1,
      createdAt: 1,
      publisher: 1,
      author: 1,
      brand: 1,
      costPrice: 1,
      salePrice: 1,
      discountType: 1,
      discountAmount: 1,
      quantity: 1,
      category: 1,
      subCategory: 1,
      unit: 1,
      status: 1,
      threeMonth: 1,
      sixMonth: 1,
      twelveMonth: 1,
      username: 1,
      address: 1,
    };

    const filter: FilterData = {
      filter: {
        'category.slug': slug
      },
      pagination: null,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subDataOne = this.productService
      .getAllProducts(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.products = res.data;
            console.log('this.products', this.products)
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  /**
   * ON DESTROY ALL SUBSCRIPTIONS
   */
  OnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subParam) {
      this.subParam.unsubscribe();
    }
  }


}
