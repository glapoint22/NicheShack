import { Component } from '@angular/core';
import { NicheShackHierarchyItemType } from '../../classes/hierarchy-item';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'niche-shack-editor',
  templateUrl: './niche-shack-editor.component.html',
  styleUrls: ['./niche-shack-editor.component.scss']
})
export class NicheShackEditorComponent {
  public productEditorMode: string;
  public hierarchyItemType = NicheShackHierarchyItemType;

  constructor(public popupService: PopupService) { }
}