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

  public red: Color = new Color(255, 0, 0, 1);
  public green: Color = new Color(0, 255, 0, 1);
  public blue: Color = new Color(0, 0, 255, 1);
  public yellow: Color = new Color(255, 255, 0, 1);
  public purple: Color = new Color(200, 0, 255, 1);
}