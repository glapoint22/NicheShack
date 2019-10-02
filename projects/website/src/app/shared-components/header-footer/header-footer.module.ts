import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavfooterComponent } from './navfooter/navfooter.component';
import { DropdownButtonModule } from '../dropdown-button/dropdown-button.module';



@NgModule({
  declarations: [
    NavbarComponent,
    NavfooterComponent
  ],
  imports: [
    CommonModule,
    DropdownButtonModule
  ],
  exports: [
    NavbarComponent,
    NavfooterComponent
  ]
})
export class HeaderFooterModule { }
