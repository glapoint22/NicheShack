import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavfooterComponent } from './navfooter/navfooter.component';



@NgModule({
  declarations: [
    NavbarComponent,
    NavfooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    NavfooterComponent
  ]
})
export class HeaderFooterModule { }
