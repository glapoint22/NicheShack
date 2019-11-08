import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickLookComponent } from './quick-look.component';
import { ShowModule } from '../../directives/show/show.module';
import { StarsModule } from '../stars/stars.module';
import { HideModule } from '../../directives/hide/hide.module';



@NgModule({
  declarations: [QuickLookComponent],
  imports: [
    CommonModule,
    ShowModule,
    StarsModule,
    HideModule
  ],
  exports: [QuickLookComponent]
})
export class QuickLookModule { }
