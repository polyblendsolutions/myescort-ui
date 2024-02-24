import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AarhusComponent} from "./aarhus.component";


const routes: Routes = [{
  path:'',
  component: AarhusComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AarhusRoutingModule { }
