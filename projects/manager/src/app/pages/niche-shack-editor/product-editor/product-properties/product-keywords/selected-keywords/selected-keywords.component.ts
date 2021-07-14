import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { HierarchyCheckboxItem } from 'projects/manager/src/app/classes/hierarchy-checkbox-item';
import { HierarchyItem, KeywordHierarchyItemType } from 'projects/manager/src/app/classes/hierarchy-item';
import { SelectedKeyword } from 'projects/manager/src/app/classes/selected-keyword';
import { AvailableKeywordsComponent } from '../available-keywords/available-keywords.component';

@Component({
  selector: 'selected-keywords',
  templateUrl: './selected-keywords.component.html',
  styleUrls: ['./selected-keywords.component.scss']
})
export class SelectedKeywordsComponent extends AvailableKeywordsComponent implements OnInit, OnChanges {
  @Input() productId: number;

  ngOnInit() { }

  ngOnChanges() {
    this.controller = 'SelectedKeywords';
    this.load(this.getUrl(KeywordHierarchyItemType.KeywordGroup), [{ key: 'productId', value: this.productId }])
      .subscribe((items: Array<HierarchyItem>) => {
        this.items = items;
      });
  }



  // -----------------------------( MAP ITEMS )------------------------------ \\
  mapItems(items: Array<HierarchyItem>, parent?: HierarchyItem, type?: number) {
    if (parent) {
      // Parent is Keyword Group
      if (parent.type == KeywordHierarchyItemType.KeywordGroup) {
        items.map((item: HierarchyItem) => {
          item.parent = parent;
          item.type = KeywordHierarchyItemType.Keyword;
          item.url = this.getUrl(item.type);
          item.childless = true;
          item.hierarchyId = Math.floor((Math.random()) * 0x10000000000).toString(16).toUpperCase();
        });
      }
    } else {
      items.map((item: HierarchyItem) => {
        item.type = KeywordHierarchyItemType.KeywordGroup;
        item.url = this.getUrl(item.type);
        item.childrenUrl = this.getUrl(KeywordHierarchyItemType.Keyword);
        item.childrenParameters = [{ key: 'groupId', value: item.id }, { key: 'productId', value: this.productId }];
        item.hierarchyId = Math.floor((Math.random()) * 0x10000000000).toString(16).toUpperCase();
      });
    }
  }


  // -----------------------------( ON CHANGE )------------------------------ \\
  onChange(keyword: HierarchyCheckboxItem) {
    this.dataService.put('api/SelectedKeywords/Update', {
      productId: this.productId,
      id: keyword.id,
      checked: keyword.checked
    }).subscribe();
  }

  isEditItemDisabled(): boolean {
    if (!this.selectedItem || this.editMode) return true;

    if (!this.selectedItem.parent) {
      let selectedItem: SelectedKeyword = this.selectedItem as SelectedKeyword;
      return !selectedItem.forProduct;
    } else {
      let parent: SelectedKeyword = this.selectedItem.parent as SelectedKeyword;
      return !parent.forProduct;
    }
  }


  isAddItemDisabled() {
    if (this.editMode) return true;
    if (!this.selectedItem) return false;

    if (!this.selectedItem.parent) {
      let selectedItem: SelectedKeyword = this.selectedItem as SelectedKeyword;
      return !selectedItem.forProduct;
    }

    return true;
  }



  isDeleteItemDisabled() {
    if (!this.selectedItem || this.editMode) return true;

    if (!this.selectedItem.parent) {
      return false;
    } else {
      let parent: SelectedKeyword = this.selectedItem.parent as SelectedKeyword;
      return !parent.forProduct;
    }
  }

  deleteItem() {
    if (!this.selectedItem.parent) {
      let selectedItem: SelectedKeyword = this.selectedItem as SelectedKeyword;

      if (selectedItem.id) {
        if (selectedItem.forProduct) {
          this.dataService.delete('api/SelectedKeywords/Groups', { id: selectedItem.id })
            .subscribe();
        } else {
          this.dataService.put('api/SelectedKeywords/Groups/Remove', {
            productId: this.productId,
            id: selectedItem.id
          })
            .subscribe();
        }
      }


      this.items.splice(this.items.findIndex(x => x == selectedItem), 1);
      this.selectedItem = null;


    } else {
      if (this.selectedItem.id) {
        this.dataService.delete('api/SelectedKeywords', { id: this.selectedItem.id })
          .subscribe();
      }



      let items = this.selectedItem.parent.children;
      items.splice(items.findIndex(x => x == this.selectedItem), 1);
    }
  }



  addItem(children: Array<SelectedKeyword>) {
    super.addItem(children);

    children[0].forProduct = true;
    children[0].checked = true;
  }

  getItemId(): number {
    if (this.selectedItem.parent) return super.getItemId();
    return this.productId;
  }

}