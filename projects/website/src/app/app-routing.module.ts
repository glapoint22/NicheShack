import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountGuard } from './guards/account.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
    canLoad: [AccountGuard],
    canActivate: [AccountGuard]
  },
  {
    path: 'shared-list/:sharedListId',
    loadChildren: () => import('./pages/shared-list/shared-list.module').then(m => m.SharedListModule)
  },
  {
    path: 'collaborate-list/:collaborateListId',
    loadChildren: () => import('./pages/collaborate-list/collaborate-list.module').then(m => m.CollaborateListModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./pages/create-account/create-account.module').then(m => m.CreateAccountModule)
  },
  {
    path: 'create-password',
    loadChildren: () => import('./pages/create-password/create-password.module').then(m => m.CreatePasswordModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./pages/verification/verification.module').then(m => m.VerificationModule)
  },
  {
    path: 'browse',
    loadChildren: () => import('./pages/browse/browse.module').then(m => m.BrowseModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/terms/terms.module').then(m => m.TermsModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
  },
  {
    path: 'write-review/:id',
    loadChildren: () => import('./pages/write-review/write-review.module').then(m => m.WriteReviewModule),
    canLoad: [AccountGuard],
    canActivate: [AccountGuard]
  },
  {
    path: ':urlTitle/:id',
    loadChildren: () => import('./pages/product-page/product-page.module').then(m => m.ProductPageModule)
  },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
