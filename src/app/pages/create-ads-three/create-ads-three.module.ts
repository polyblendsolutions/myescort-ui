import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { QuillModule } from 'ngx-quill';
import { AppMarketplaceCardTwoModule } from 'src/app/shared/components/app-marketplace-card-two/app-marketplace-card-two.module';
import { PageTopSectionModule } from 'src/app/shared/components/page-top-section/page-top-section.module';
import { MaterialModule } from '../../material/material.module';
import { CreateAdsThreeRoutingModule } from './create-ads-three-routing.module';
import { CreateAdsThreeComponent } from './create-ads-three.component';
import {MarketplaceCardModule} from "../../shared/components/marketplace-card/marketplace-card.module";

@NgModule({
  declarations: [CreateAdsThreeComponent],
    imports: [
        CommonModule,
        QuillModule,
        PageTopSectionModule,
        CreateAdsThreeRoutingModule,
        NgxDropzoneModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MatDatepickerModule,
        NgxMatTimepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        AppMarketplaceCardTwoModule,
        MarketplaceCardModule,
    ],
})
export class CreateAdsThreeModule {}
