import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NicheShackEditorRoutingModule } from './niche-shack-editor-routing.module';
import { NicheShackEditorComponent } from './niche-shack-editor.component';


@NgModule({
  declarations: [NicheShackEditorComponent],
  imports: [
    CommonModule,
    NicheShackEditorRoutingModule
  ]
})
export class NicheShackEditorModule { }
