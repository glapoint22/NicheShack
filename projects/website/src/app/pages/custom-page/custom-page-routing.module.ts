import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomPageComponent } from './custom-page.component';


const routes: Routes = [
  {
    path: '',
    component: CustomPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomPageRoutingModule { }
