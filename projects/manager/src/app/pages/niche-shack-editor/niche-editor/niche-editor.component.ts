import { Component, Input, OnChanges } from '@angular/core';
import { Niche } from '../../../classes/niche';
import { HierarchyItem } from '../../../classes/hierarchy-item';

@Component({
  selector: 'niche-editor',
  templateUrl: './niche-editor.component.html',
  styleUrls: ['./niche-editor.component.scss']
})
export class NicheEditorComponent implements OnChanges {
  @Input() hierarchyItem: HierarchyItem;
  public niche: Niche = new Niche();


  ngOnChanges() {
    this.niche.id = this.hierarchyItem.id;
  }
}