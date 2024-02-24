import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpVerificationComponent } from './otp-verification.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from '../../pipes/pipes.module';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [
    OtpVerificationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PipesModule,
    MatInputModule,
  ],
  exports: [
    OtpVerificationComponent
  ]
})
export class OtpVerificationModule { }
