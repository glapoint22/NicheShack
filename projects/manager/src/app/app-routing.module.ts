import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/niche-shack-editor/niche-shack-editor.module').then(m => m.NicheShackEditorModule),
    pathMatch: 'full'
  },
  {
    path: 'niche-shack-editor',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule)
  },
  {
    path: 'page-builder',
    loadChildren: () => import('./pages/page-builder/page-builder.module').then(m => m.PageBuilderModule)
  },
  {
    path: 'email-builder',
    loadChildren: () => import('./pages/email-builder/email-builder.module').then(m => m.EmailBuilderModule)
  },
  {
    path: 'change-name',
    loadChildren: () => import('./pages/change-name/change-name.module').then(m => m.ChangeNameModule)
  },
  {
    path: 'change-email',
    loadChildren: () => import('./pages/change-email/change-email.module').then(m => m.ChangeEmailModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
