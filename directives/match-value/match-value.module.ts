import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchValueDirective } from './match-value.directive';



@NgModule({
  declarations: [MatchValueDirective],
  imports: [
    CommonModule
  ],
  exports: [MatchValueDirective]
})
export class MatchValueModule { }
