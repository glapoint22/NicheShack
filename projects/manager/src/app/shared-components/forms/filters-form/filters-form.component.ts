import { Component, OnInit, HostListener } from '@angular/core';
import { EditableHierarchyComponent } from '../../hierarchy/editable-hierarchy/editable-hierarchy.component';
import { FormService } from '../../../services/form.service';
import { FilterHierarchyItemType, HierarchyItem } from '../../../classes/hierarchy-item';
import { DataService } from 'services/data.service';
import { PromptService } from 'services/prompt.service';

@Component({
  selector: 'filters-form',
  templateUrl: './filters-form.component.html',
  styleUrls: ['../../hierarchy/editable-hierarchy/editable-hierarchy.component.scss', './filters-form.component.scss']
})
export class FiltersFormComponent extends EditableHierarchyComponent implements OnInit {
  public filterHierarchyItemType = FilterHierarchyItemType;
  public show: boolean;
  public showMenu: boolean;

  constructor(
    dataService: DataService,
    promptService: PromptService,
    private formService: FormService
  ) { super(dataService, promptService) }




  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.formService.filtersForm = this;
  }



  // --------------------------------( ON SHOW )-------------------------------- \\
  onShow() {
    if (!this.items && !this.searchResults) {
      this.load(this.getUrl(FilterHierarchyItemType.Filter))
        .subscribe((items: Array<HierarchyItem>) => {
          this.items = items;
        });
      this.filterType = FilterHierarchyItemType.FilterOption;
    }

    window.setTimeout(() => {
      this.initSearch();
    });
  }





  // -----------------------------( GET URL )------------------------------ \\
  getUrl(type: number): string {
    switch (type) {
      // Filter
      case FilterHierarchyItemType.Filter:
        return 'api/Filters';

      // FilterOptions
      case FilterHierarchyItemType.FilterOption:
        return 'api/Filters/Options';
    }
  }







  // -----------------------------( MAP ITEMS )------------------------------ \\
  mapItems(items: Array<HierarchyItem>, parent?: HierarchyItem, type?: number) {
    if (parent) {
      // Parent is Filter
      if (parent.type == FilterHierarchyItemType.Filter) {
        items.map((item: HierarchyItem) => {
          item.parent = parent;
          item.type = FilterHierarchyItemType.FilterOption;
          item.url = 'api/Filters/Options';
          item.childless = true;
          item.hierarchyId = Math.floor((Math.random()) * 0x10000000000).toString(16).toUpperCase();
        });
      }



      // We are doing a search
    } else if (type) {

      // Filter Option
      switch (type) {
        case FilterHierarchyItemType.FilterOption:
          items.map((item: HierarchyItem) => {

            item.type = FilterHierarchyItemType.FilterOption;
            item.childless = true;
            item.url = this.getUrl(FilterHierarchyItemType.FilterOption);
            item.hierarchyId = Math.floor((Math.random()) * 0x10000000000).toString(16).toUpperCase();
          });
          break;

        // filter
        case FilterHierarchyItemType.Filter:
          items.map((item: HierarchyItem) => {
            item.type = FilterHierarchyItemType.Filter;
            item.url = this.getUrl(FilterHierarchyItemType.Filter);
            item.childrenUrl = this.getUrl(FilterHierarchyItemType.FilterOption);
            item.childrenParameters = [{ key: 'filterId', value: item.id }];
            item.hierarchyId = Math.floor((Math.random()) * 0x10000000000).toString(16).toUpperCase();
          });
          break;
      }

      // Default is filter
    } else {
      items.map((item: HierarchyItem) => {
        item.type = FilterHierarchyItemType.Filter;
        item.url = this.getUrl(FilterHierarchyItemType.Filter);
        item.childrenUrl = this.getUrl(FilterHierarchyItemType.FilterOption);
        item.childrenParameters = [{ key: 'filterId', value: item.id }];
        item.hierarchyId = Math.floor((Math.random()) * 0x10000000000).toString(16).toUpperCase();
      });
    }
  }





  // -----------------------------( GET ITEM NAME )------------------------------ \\
  getItemName(type: number): string {
    let name: string;

    switch (type) {
      case FilterHierarchyItemType.Filter:
        name = 'Filter';
        break;

      case FilterHierarchyItemType.FilterOption:
        name = 'Filter Option';
        break;
    }

    return name;
  }





  // -----------------------------( GET ADD BUTTON TITLE )------------------------------ \\
  getAddButtonTitle() {
    let title: string;

    switch (this.selectedItem && this.selectedItem.type) {
      case FilterHierarchyItemType.Filter:
        title = 'Add Filter Option';
        break;


      case FilterHierarchyItemType.FilterOption:
        title = 'Add (Not Available)';
        break;

      default:
        if (this.searchResults && this.searchResults.length > 0 && this.filterType != FilterHierarchyItemType.Filter) {
          title = 'Add (Not Available)'
        } else {
          title = 'Add Filter';
        }

        break;
    }
    return title;
  }






  // -----------------------------( IS ADD BUTTON DISABLED )------------------------------ \\
  isAddItemDisabled(): boolean {
    let result: boolean;

    if (super.isAddItemDisabled()) return true;

    switch (this.selectedItem && this.selectedItem.type) {
      case FilterHierarchyItemType.Filter:
        result = false;
        break;


      case FilterHierarchyItemType.FilterOption:
        result = true;
        break;

      default:
        if (this.searchResults && this.searchResults.length > 0 && this.searchResults[0].type != FilterHierarchyItemType.Filter) {
          result = true;
        } else {
          result = false;
        }

        break;
    }

    return result;
  }






  // -----------------------------( CREATE ITEM )------------------------------ \\
  createItem(): any {
    let item: any;

    // Filter
    if (!this.selectedItem) {
      item = {
        name: '',
        url: this.getUrl(FilterHierarchyItemType.Filter)
      }

      // Filter Option
    } else {
      item = {
        name: '',
        parent: this.selectedItem,
        childless: true,
        url: this.getUrl(FilterHierarchyItemType.FilterOption)
      }
    }

    return item;
  }


  // --------------------------------( ON KEYDOWN )-------------------------------- \\
  onKeydown() {
    if (this.show) {
      super.onKeydown();
    }
  }



  // --------------------------------( ON ESCAPE KEYDOWN )-------------------------------- \\
  @HostListener('document:keydown.escape')
  onEscapeKeydown() {
    this.show = false;
  }
}