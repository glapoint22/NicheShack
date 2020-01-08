import { Component, OnInit } from '@angular/core';
import { HierarchyItem } from '../../classes/hierarchy-item';

@Component({
  selector: 'niche-shack-editor',
  templateUrl: './niche-shack-editor.component.html',
  styleUrls: ['./niche-shack-editor.component.scss']
})
export class NicheShackEditorComponent implements OnInit {
  public showProductForm: boolean;
  public showNicheForm: boolean;
  public item: HierarchyItem;

  constructor() { }

  ngOnInit() {
  }

  showForm(item: HierarchyItem) {
    if (item.type == 'Product') {
      this.showProductForm = true;
      this.showNicheForm = false;
    } else {
      this.showNicheForm = true;
      this.showProductForm = false;
    }

    this.item = item;
  }
}