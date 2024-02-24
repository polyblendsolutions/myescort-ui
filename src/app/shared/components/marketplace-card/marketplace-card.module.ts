import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SwiperModule } from 'swiper/angular';
import { MaterialModule } from '../../../material/material.module';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared.module';
import { MarketplaceCardComponent } from './marketplace-card.component';
import { ProductDetailsImaaeAreaComponent } from './product-details-imaae-area/product-details-image-area.component';
import { ProductDetailsInfoComponent } from './product-details-info/product-details-info.component';
import { ProductDetailsRightAreaComponent } from './product-details-right-area/product-details-right-area.component';
import { QuickViewDialogComponent } from './quick-view-dialog/quick-view-dialog.component';
import { SelectDaysComponent } from './select-days/select-days.component';

@NgModule({
  declarations: [
    MarketplaceCardComponent,
    QuickViewDialogComponent,
    ProductDetailsImaaeAreaComponent,
    ProductDetailsInfoComponent,
    ProductDetailsRightAreaComponent,
    SelectDaysComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    MaterialModule,
    PipesModule,
    NgxSpinnerModule,
    SwiperModule,
    NgxImageZoomModule,
    SharedModule,
  ],
  exports: [MarketplaceCardComponent],
})
export class MarketplaceCardModule {}
