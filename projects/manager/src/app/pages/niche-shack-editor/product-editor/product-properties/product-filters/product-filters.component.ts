import { Component, Input, ViewChild, OnChanges } from '@angular/core';
import { productFilter } from 'projects/manager/src/app/classes/product-filter';
import { PanelComponent } from 'projects/manager/src/app/shared-components/panels/panel/panel.component';

@Component({
  selector: 'product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent implements OnChanges{
  @Input() filters: Array<productFilter>;
  @ViewChild('panel', { static: false }) panel: PanelComponent;

  ngOnChanges() {
    if(this.filters) {
      window.setTimeout(()=> {
        this.panel.onContentLoad();
      });
    }
  }
}