import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NicheShackEditorRoutingModule } from './niche-shack-editor-routing.module';
import { NicheShackEditorComponent } from './niche-shack-editor.component';
import { MenuBarModule } from '../../shared-components/menu-bar/menu-bar.module';


@NgModule({
  declarations: [
    NicheShackEditorComponent
  ],
  imports: [
    CommonModule,
    NicheShackEditorRoutingModule,
    MenuBarModule
  ]
})
export class NicheShackEditorModule { }
