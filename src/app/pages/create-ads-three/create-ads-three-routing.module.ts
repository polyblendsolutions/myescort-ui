import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAdsThreeComponent } from './create-ads-three.component';

const routes: Routes = [
  {
    path: '',
    component: CreateAdsThreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAdsThreeRoutingModule { }
