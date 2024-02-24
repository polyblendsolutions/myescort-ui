import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VerifiedOtpComponent} from "./verified-otp.component";

const routes: Routes = [
  {
    path: '',
    component: VerifiedOtpComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifiedOtpRoutingModule { }
