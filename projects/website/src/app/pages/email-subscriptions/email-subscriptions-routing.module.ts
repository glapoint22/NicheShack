import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailSubscriptionsComponent } from './email-subscriptions.component';


const routes: Routes = [
  {
    path: '',
    component: EmailSubscriptionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailSubscriptionsRoutingModule { }
