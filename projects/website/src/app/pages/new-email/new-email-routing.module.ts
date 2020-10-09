import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEmailComponent } from './new-email.component';


const routes: Routes = [
  {
    path: '',
    component: NewEmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewEmailRoutingModule { }
