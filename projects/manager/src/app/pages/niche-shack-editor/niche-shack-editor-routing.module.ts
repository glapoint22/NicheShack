import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NicheShackEditorComponent } from './niche-shack-editor.component';


const routes: Routes = [
  {
    path: '',
    component: NicheShackEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NicheShackEditorRoutingModule { }
