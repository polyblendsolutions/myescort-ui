import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountDetailsRoutingModule } from './account-details-routing.module';
import { AccountDetailsComponent } from './account-details.component';
import { PageTopSectionModule } from 'src/app/shared/components/page-top-section/page-top-section.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [
    AccountDetailsComponent,
    ImageCropComponent
  ],
  imports: [
    CommonModule,
    AccountDetailsRoutingModule,
    PageTopSectionModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
  ]
})
export class AccountDetailsModule { }
