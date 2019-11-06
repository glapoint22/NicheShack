import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickLookComponent } from './quick-look.component';
import { ShowModule } from '../../directives/show/show.module';
import { StarsModule } from '../stars/stars.module';



@NgModule({
  declarations: [QuickLookComponent],
  imports: [
    CommonModule,
    ShowModule,
    StarsModule
  ],
  exports: [QuickLookComponent]
})
export class QuickLookModule { }
