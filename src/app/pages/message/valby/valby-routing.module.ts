import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ValbyComponent} from "./valby.component";

const routes: Routes = [{
  path:'',
  component: ValbyComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValbyRoutingModule { }
