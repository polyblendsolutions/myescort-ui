import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageTopSectionModule } from './../../../shared/components/page-top-section/page-top-section.module';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    PageTopSectionModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
