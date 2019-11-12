import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductPageComponent } from './product-page.component';


const routes: Routes = [
  {
    path: '',
    component: ProductPageComponent
  },
  {
    path: 'reviews',
    loadChildren: () => import('../../pages/reviews/reviews.module').then(m => m.ReviewsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductPageRoutingModule { }
