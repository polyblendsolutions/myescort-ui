import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, pluck } from 'rxjs';
import { Product } from 'src/app/interfaces/common/product.interface';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { CarouselCntrlService } from 'src/app/services/common/carousel-cntrl.service';
import { ProductService } from 'src/app/services/common/product.service';
import * as moment from 'moment';
import { ProductStatus } from 'src/app/enum/product-status.enum';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  //Store Data
  product: Product;
  id: string | any;
  slug: string | any;
  selectedImage: string;
  products: Product[] = [];
  image: string;
  zoomImage: string;
  // Image Zoom & View Area
  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  //Subscriptions
  private subDataOne: Subscription;
  private subParam: Subscription;
  public productStatus = ProductStatus;
  constructor(
    private _carouselCtrl: CarouselCntrlService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subParam = this.activatedRoute.paramMap.subscribe((res) => {
      this.id = res.get('id');
      if (this.id) {
        this.getSingleProductById(this.id);
      }
    });
    this.subParam = this.activatedRoute.queryParamMap
      .pipe(pluck('params', 'categories'))
      .subscribe((res) => {
        if (res) {
          this.slug = res;
          this.getRelatedProduct(this.slug);
        }
      });
  }

  public onMouseMove(e) {
    if (window.innerWidth >= 1099) {
      const image = e.currentTarget;
      const offsetX = e.offsetX;
      const offsetY = e.offsetY;
      const x = (offsetX / image.offsetWidth) * 110;
      const y = (offsetY / image.offsetHeight) * 110;
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
          if(!this?.product?.images || !this?.product?.images?.length) {
            this.product.images = [
              "/assets/images/png/fallbackImage.png"
            ]
          }
          console.log('this.product', this.product);
          this.selectedImage = this.product.images[0];
          this.setDefaultImage();
          console.log(res.data);
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
  private setDefaultImage() {
    this.image =
      this.product.images && this.product.images.length > 0
        ? this.product.images[0]
        : '/assets/images/png/fallbackImage.png';
    this.zoomImage = this.image;
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
      shortDescription: 1,
      quantity: 1,
      category: 1,
      subCategory: 1,
      isVerfied: 1,
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
        'category.slug': slug,
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
            console.log('this.products', this.products);
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

  checkIsActive(){
    return moment().diff(this.product?.['publishDate'], 'days') < 30
   }
}
