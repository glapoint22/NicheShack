import { Component } from '@angular/core';
import { HierarchyItem } from '../../classes/hierarchy-item';
import { Color } from '../../classes/color';

@Component({
  selector: 'niche-shack-editor',
  templateUrl: './niche-shack-editor.component.html',
  styleUrls: ['./niche-shack-editor.component.scss']
})
export class NicheShackEditorComponent {
  public selectedItem: HierarchyItem = new HierarchyItem();
}