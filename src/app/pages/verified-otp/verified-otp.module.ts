import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifiedOtpRoutingModule } from './verified-otp-routing.module';
import { VerifiedOtpComponent } from './verified-otp.component';
import {OtpVerificationModule} from "../../shared/lazy/otp-verification/otp-verification.module";
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    VerifiedOtpComponent
  ],
    imports: [
        CommonModule,
        VerifiedOtpRoutingModule,
        OtpVerificationModule,
        MatButtonModule
    ]
})
export class VerifiedOtpModule { }
