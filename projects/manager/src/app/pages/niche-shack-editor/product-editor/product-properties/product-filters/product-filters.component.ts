import { Component, Input, ViewChild, OnChanges } from '@angular/core';
import { productFilter } from 'projects/manager/src/app/classes/product-filter';
import { PanelComponent } from 'projects/manager/src/app/shared-components/panels/panel/panel.component';
import { PopupService } from 'projects/manager/src/app/services/popup.service';

@Component({
  selector: 'product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent implements OnChanges{
  @Input() filters: Array<productFilter>;
  @ViewChild('panel', { static: false }) panel: PanelComponent;

  constructor(private popupService: PopupService) { }

  ngOnChanges() {
    if(this.filters) {
      window.setTimeout(()=> {
        this.panel.onContentLoad();
      });
    }
  }


  onAddFilterClick(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.filtersHierarchyPopup.show = !this.popupService.filtersHierarchyPopup.show;
  }
}