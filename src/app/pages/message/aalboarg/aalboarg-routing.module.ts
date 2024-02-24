import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AalboargComponent} from "./aalboarg.component";

const routes: Routes = [{
  path:'',
  component: AalboargComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AalboargRoutingModule { }
