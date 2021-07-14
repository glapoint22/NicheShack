import { Component, OnInit } from '@angular/core';
import { HierarchyItem, KeywordHierarchyItemType } from 'projects/manager/src/app/classes/hierarchy-item';
import { EditableHierarchyComponent } from 'projects/manager/src/app/shared-components/hierarchy/editable-hierarchy/editable-hierarchy.component';

@Component({
  selector: 'available-keywords',
  templateUrl: './available-keywords.component.html',
  styleUrls: ['./available-keywords.component.scss']
})
export class AvailableKeywordsComponent extends EditableHierarchyComponent implements OnInit {
  public controller: string;

  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    this.controller = 'AvailableKeywords';
    this.load(this.getUrl(KeywordHierarchyItemType.KeywordGroup))
      .subscribe((items: Array<HierarchyItem>) => {
        this.items = items;
      });
  }



  // -----------------------------( GET URL )------------------------------ \\
  getUrl(type: number): string {
    switch (type) {
      // Keyword Groups
      case KeywordHierarchyItemType.KeywordGroup:
        return 'api/' + this.controller + '/Groups';

      // Keywords
      case KeywordHierarchyItemType.Keyword:
        return 'api/' + this.controller;
    }
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
        item.childrenParameters = [{ key: 'groupId', value: item.id }];
        item.hierarchyId = Math.floor((Math.random()) * 0x10000000000).toString(16).toUpperCase();
      });
    }
  }





  // -----------------------------( GET ITEM NAME )------------------------------ \\
  getItemName(type: number): string {
    let name: string;

    switch (type) {
      case KeywordHierarchyItemType.KeywordGroup:
        name = 'Keyword Group';
        break;

      case KeywordHierarchyItemType.Keyword:
        name = 'Keyword';
        break;
    }

    return name;
  }





  // -----------------------------( GET ADD BUTTON TITLE )------------------------------ \\
  getAddButtonTitle() {
    let title: string;

    switch (this.selectedItem && this.selectedItem.type) {
      case KeywordHierarchyItemType.KeywordGroup:
        title = 'Add Keyword';
        break;


      case KeywordHierarchyItemType.Keyword:
        title = 'Add (Not Available)';
        break;

      default:
        title = 'Add Keyword Group';

        break;
    }
    return title;
  }






  // -----------------------------( IS ADD BUTTON DISABLED )------------------------------ \\
  isAddItemDisabled(): boolean {
    let result: boolean;

    if (super.isAddItemDisabled()) return true;

    switch (this.selectedItem && this.selectedItem.type) {
      case KeywordHierarchyItemType.KeywordGroup:
        result = false;
        break;


      case KeywordHierarchyItemType.Keyword:
        result = true;
        break;

      default:
        result = false;
        break;
    }

    return result;
  }






  // -----------------------------( IS REMOVE BUTTON DISABLED )------------------------------ \\
  isRemoveItemDisabled(): boolean {
    let result: boolean;



    switch (this.selectedItem && this.selectedItem.type) {
      case KeywordHierarchyItemType.KeywordGroup:
        result = true;
        break;


      case KeywordHierarchyItemType.Keyword:
        result = this.editMode ? true : false;
        break;

      default:
        result = true;
        break;
    }

    return result;
  }







  // -----------------------------( CREATE ITEM )------------------------------ \\
  createItem(): any {
    let item: any;

    // Keyword Group
    if (!this.selectedItem) {
      item = {
        name: '',
        url: this.getUrl(KeywordHierarchyItemType.KeywordGroup)
      }

      // Keyword
    } else {
      item = {
        name: '',
        parent: this.selectedItem,
        childless: true,
        url: this.getUrl(KeywordHierarchyItemType.Keyword)
      }
    }

    return item;
  }




  onRemoveItemClick() {
    if (!this.selectedItem || this.selectedItem.type == KeywordHierarchyItemType.KeywordGroup || this.editMode) return;

    let promptTitle = 'Remove Keyword';
    let promptMessage = 'Are you sure you want to remvoe this keyword from this group?';

    this.promptService.showPrompt(promptTitle, promptMessage, this.removeItem, this);
  }


  removeItem() {
    let items: Array<HierarchyItem>;

    // Item has no parent
    if (!this.selectedItem.parent) {
      items = this.items;

      // Item has a parent
    } else {
      items = this.selectedItem.parent.children;
    }

    this.dataService.delete(this.getUrl(1) + '/Remove', { ids: [this.selectedItem.parent.id, this.selectedItem.id] }).subscribe(() => {
      items.splice(items.findIndex(x => x == this.selectedItem), 1);
      this.selectedItem.loading = false;
      this.selectedItem = null;
      this.editMode = false;
    });
  }



  // -----------------------------( SAVE ITEM )------------------------------ \\
  saveItem(element: HTMLElement) {
    let name = element.innerText.toLowerCase();
    let items: Array<HierarchyItem>;

    // Item has no parent
    if (!this.selectedItem.parent) {
      items = this.items;

      // Item has a parent
    } else {
      items = this.selectedItem.parent.children;
    }
    
    
    if (items.some(x => x.name.toLowerCase() == name)) {
      let promptTitle = 'Duplicate Name';
      let promptMessage = 'Duplicate names are not allowed!';

      this.promptService.showPrompt(promptTitle, promptMessage, this.removeDuplicateName, this, [items], this.removeDuplicateName, [items]);
    } else {
      super.saveItem(element);
    }
  }

  removeDuplicateName(items: Array<HierarchyItem>) {
    items.splice(items.findIndex(x => x == this.selectedItem), 1);
    this.selectedItem = null;
    this.editMode = false;
  }

}
