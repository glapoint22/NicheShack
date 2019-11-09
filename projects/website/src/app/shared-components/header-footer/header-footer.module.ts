import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavfooterComponent } from './navfooter/navfooter.component';
import { CategoryDropdownButtonComponent } from './navbar/category-dropdown-button/category-dropdown-button.component';
import { NavMenuComponent } from './navbar/nav-menu/nav-menu.component';
import { AccountMenuComponent } from './navbar/account-menu/account-menu.component';
import { AccountNavigationComponent } from './navbar/account-navigation/account-navigation.component';
import { RouterModule } from '@angular/router';
import { ShowHideModule } from '../../directives/show-hide/show-hide.module';



@NgModule({
  declarations: [
    NavbarComponent,
    NavfooterComponent,
    CategoryDropdownButtonComponent,
    NavMenuComponent,
    AccountMenuComponent,
    AccountNavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ShowHideModule
  ],
  exports: [
    NavbarComponent,
    NavfooterComponent,
    CategoryDropdownButtonComponent,
    NavMenuComponent,
    AccountMenuComponent,
    AccountNavigationComponent
  ]
})
export class HeaderFooterModule { }
