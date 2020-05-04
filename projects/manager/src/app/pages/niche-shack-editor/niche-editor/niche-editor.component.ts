import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { PanelComponent } from '../../../shared-components/panels/panel/panel.component';
import { Niche } from '../../../classes/niche';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HierarchyItem } from '../../../classes/hierarchy-item';

@Component({
  selector: 'niche-editor',
  templateUrl: './niche-editor.component.html',
  styleUrls: ['./niche-editor.component.scss']
})
export class NicheEditorComponent implements OnChanges {
  @Input() hierarchyItem: HierarchyItem;
  public niche: Niche = new Niche();
  public backgroundType: string = 'color';


  ngOnChanges() {
    this.niche.id = this.hierarchyItem.id;
  }

  onBackgroundChange(panel: PanelComponent) {
    window.setTimeout(() => {
      panel.onContentLoad();
    });
  }
}