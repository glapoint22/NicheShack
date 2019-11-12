import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedListComponent } from './shared-list.component';


const routes: Routes = [
  {
    path: '',
    component: SharedListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedListRoutingModule { }
