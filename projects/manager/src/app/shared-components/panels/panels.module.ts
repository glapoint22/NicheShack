import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { EnableablePanelComponent } from './enableable-panel/enableable-panel.component';



@NgModule({
  declarations: [
    PanelComponent,
    EnableablePanelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PanelComponent,
    EnableablePanelComponent
  ]
})
export class PanelsModule { }
