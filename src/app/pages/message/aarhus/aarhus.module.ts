import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AarhusRoutingModule } from './aarhus-routing.module';
import { AarhusSearchAreaComponent } from './aarhus-search-area/aarhus-search-area.component';
import { AarhusComponent } from './aarhus.component';
import { FilterAreaComponent } from './filter-area/filter-area.component';
import { ProductListRightComponent } from './product-list-right/product-list-right.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FeatureCardModule } from 'src/app/shared/components/feature-card/feature-card.module';
import { PageTopSectionModule } from 'src/app/shared/components/page-top-section/page-top-section.module';
import { ProductListModule } from '../../product-list/product-list.module';
import { AalboargSearchAreaComponent } from '../aalboarg/aalboarg-search-area/aalboarg-search-area.component';
import {SearchFilterModule} from "../../../shared/components/search-filter/search-filter.module";

@NgModule({
  declarations: [
    AarhusComponent,
    FilterAreaComponent,
    ProductListRightComponent,
    AarhusSearchAreaComponent,
  ],
  imports: [
    CommonModule,
    AarhusRoutingModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    FeatureCardModule,
    PageTopSectionModule,
    ProductListModule,
    ReactiveFormsModule,
    SearchFilterModule
  ],
})
export class AarhusModule {}
