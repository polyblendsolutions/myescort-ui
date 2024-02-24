import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OdenseComponent} from "./odense.component";


const routes: Routes = [{
  path:'',
  component: OdenseComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OdenseRoutingModule { }
