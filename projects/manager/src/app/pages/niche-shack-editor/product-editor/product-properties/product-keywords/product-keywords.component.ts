import { Component, Input, ViewChild } from '@angular/core';
import { PanelComponent } from 'projects/manager/src/app/shared-components/panels/panel/panel.component';

@Component({
  selector: 'product-keywords',
  templateUrl: './product-keywords.component.html',
  styleUrls: ['./product-keywords.component.scss']
})
export class ProductKeywordsComponent {
  @ViewChild('panel', { static: false }) panel: PanelComponent;
  @Input() keywords: Array<string>;

  // -----------------------------( NG ON CHANGES )------------------------------ \\
  ngOnChanges() {
    // Update the panel height
    window.setTimeout(() => {
      this.panel.onContentLoad();
    });
  }
}