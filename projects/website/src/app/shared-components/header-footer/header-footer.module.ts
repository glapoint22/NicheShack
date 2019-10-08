import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavfooterComponent } from './navfooter/navfooter.component';
import { CategoryDropdownButtonComponent } from './navbar/category-dropdown-button/category-dropdown-button.component';
import { NavMenuComponent } from './navbar/nav-menu/nav-menu.component';



@NgModule({
  declarations: [
    NavbarComponent,
    NavfooterComponent,
    CategoryDropdownButtonComponent,
    NavMenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    NavfooterComponent,
    CategoryDropdownButtonComponent,
    NavMenuComponent
  ]
})
export class HeaderFooterModule { }
