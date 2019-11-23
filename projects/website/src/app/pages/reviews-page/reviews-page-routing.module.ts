import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewsPageComponent } from './reviews-page.component';


const routes: Routes = [
  {
    path: '',
    component: ReviewsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsPageRoutingModule { }
