import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';


const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
  },
  {
    path: 'profile',
    loadChildren: () => import('../../pages/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('../../pages/orders/orders.module').then(m => m.OrdersModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
