import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PageTopSectionModule } from 'src/app/shared/components/page-top-section/page-top-section.module';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DirectivesModule} from '../../shared/directives/directives.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    PageTopSectionModule,
    ReactiveFormsModule,
    DirectivesModule,
    MatIconModule
  ]
})
export class SignUpModule { }
