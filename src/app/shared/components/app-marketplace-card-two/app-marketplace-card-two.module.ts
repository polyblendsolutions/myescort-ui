import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { MaterialModule } from 'src/app/material/material.module';
import { SwiperModule } from 'swiper/angular';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared.module';
import { AppMarketplaceCardTwoComponent } from './app-marketplace-card-two.component';

@NgModule({
  declarations: [AppMarketplaceCardTwoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    SwiperModule,
    NgxImageZoomModule,
    SharedModule,
    RouterModule,
  ],
  exports: [AppMarketplaceCardTwoComponent],
})
export class AppMarketplaceCardTwoModule {}
