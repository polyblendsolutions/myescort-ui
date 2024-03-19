import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterComponent } from './search-filter.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material/material.module";
import {NgxTypedJsModule} from "ngx-typed-js";
import {SwiperModule} from "swiper/angular";
import {SearchAreaComponent} from "../search-area/search-area.component";
import { MatSliderModule } from '@angular/material/slider';



@NgModule({
  declarations: [
    SearchFilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxTypedJsModule,
    SwiperModule,
    FormsModule,
    MatSliderModule
  ],
  exports:[
    SearchFilterComponent
  ]
})
export class SearchFilterModule { }
