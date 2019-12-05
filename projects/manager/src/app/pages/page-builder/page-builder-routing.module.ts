import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageBuilderComponent } from './page-builder.component';


const routes: Routes = [
  {
    path: '',
    component: PageBuilderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageBuilderRoutingModule { }
