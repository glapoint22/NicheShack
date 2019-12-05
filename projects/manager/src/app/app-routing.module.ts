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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
