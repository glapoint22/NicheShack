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
    loadChildren: () => import('../../pages/reviews-page/reviews-page.module').then(m => m.ReviewsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductPageRoutingModule { }
