import { Component, OnInit } from '@angular/core';
import { HierarchyPopupComponent } from '../hierarchy-popup/hierarchy-popup.component';
import { HierarchyItem, FilterHierarchyItemType } from '../../../classes/hierarchy-item';

@Component({
  selector: 'filters-popup',
  templateUrl: './filters-hierarchy-popup.component.html',
  styleUrls: ['../hierarchy-popup/hierarchy-popup.component.scss', '../popup/popup.component.scss']
})
export class FiltersHierarchyPopupComponent extends HierarchyPopupComponent implements OnInit {

  


  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    this.popupService.filtersHierarchyPopup = this;
  }



  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    if (!this.items && !this.searchResults) {
      this.load(this.getUrl(FilterHierarchyItemType.Filter))
        .subscribe((items: Array<HierarchyItem>) => {
          this.items = items;
        });
      this.filterType = FilterHierarchyItemType.FilterOption;
    }

    super.onPopupShow(popup, arrow);
  }
}
