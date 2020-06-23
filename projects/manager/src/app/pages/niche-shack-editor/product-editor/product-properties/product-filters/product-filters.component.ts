import { Component, Input, ViewChild, OnChanges } from '@angular/core';
import { productFilter } from 'projects/manager/src/app/classes/product-filter';
import { PanelComponent } from 'projects/manager/src/app/shared-components/panels/panel/panel.component';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { FiltersHierarchyComponent } from 'projects/manager/src/app/shared-components/filters-hierarchy/filters-hierarchy.component';

@Component({
  selector: 'product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent {
  // @ViewChild('panel', { static: false }) panel: PanelComponent;
  // @ViewChild('filtersHierarchy', { static: false }) filtersHierarchy: FiltersHierarchyComponent;
}