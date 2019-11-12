import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WriteReviewComponent } from './write-review.component';

const routes: Routes = [
  {
    path: '',
    component: WriteReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WriteReviewRoutingModule { }
