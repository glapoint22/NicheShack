import { Component } from '@angular/core';
import { HierarchyItem, HierarchyItemType } from '../../classes/hierarchy-item';

@Component({
  selector: 'niche-shack-editor',
  templateUrl: './niche-shack-editor.component.html',
  styleUrls: ['./niche-shack-editor.component.scss']
})
export class NicheShackEditorComponent {
  public selectedItem: HierarchyItem = new HierarchyItem();
  public productEditorMode: string;
  public hierarchyItemType = HierarchyItemType;
}