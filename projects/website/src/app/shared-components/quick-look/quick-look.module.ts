import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickLookComponent } from './quick-look.component';
import { StarsModule } from '../stars/stars.module';
import { ShowHideModule } from '../../directives/show-hide/show-hide.module';



@NgModule({
  declarations: [QuickLookComponent],
  imports: [
    CommonModule,
    StarsModule,
    ShowHideModule
  ],
  exports: [QuickLookComponent]
})
export class QuickLookModule { }
