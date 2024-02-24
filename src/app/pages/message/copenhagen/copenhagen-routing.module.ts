import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CopenhagenComponent} from "./copenhagen.component";

const routes: Routes = [{
  path:'',
  component: CopenhagenComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CopenhagenRoutingModule { }
