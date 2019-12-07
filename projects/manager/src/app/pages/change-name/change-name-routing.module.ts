import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeNameComponent } from './change-name.component';


const routes: Routes = [
  {
    path: '',
    component: ChangeNameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeNameRoutingModule { }
