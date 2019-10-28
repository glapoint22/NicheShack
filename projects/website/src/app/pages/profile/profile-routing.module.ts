import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'change-name',
    loadChildren: () => import('../../pages/change-name/change-name.module').then(m => m.ChangeNameModule)
  },
  {
    path: 'change-email',
    loadChildren: () => import('../../pages/change-email/change-email.module').then(m => m.ChangeEmailModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('../../pages/change-password/change-password.module').then(m => m.ChangePasswordModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
