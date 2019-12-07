import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NicheShackEditorRoutingModule } from './niche-shack-editor-routing.module';
import { NicheShackEditorComponent } from './niche-shack-editor.component';
import { DialogBoxModule } from '../../shared-components/dialog-box/dialog-box.module';


@NgModule({
  declarations: [NicheShackEditorComponent],
  imports: [CommonModule, NicheShackEditorRoutingModule, DialogBoxModule]
})
export class NicheShackEditorModule { }
