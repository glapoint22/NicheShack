import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar.component';
import { MessageFormComponent } from './message-form/message-form.component';



@NgModule({
  declarations: [MenuBarComponent, MessageFormComponent],
  imports: [
    CommonModule
  ],
  exports: [MenuBarComponent, MessageFormComponent]
})
export class MenuBarModule { }
