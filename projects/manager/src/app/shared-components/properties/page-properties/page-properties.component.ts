import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'services/data.service';
import { PromptService } from 'services/prompt.service';
import { ItemListOptions } from '../../../classes/item-list-options';
import { ListItem } from '../../../classes/list-item';
import { MenuOption } from '../../../classes/menu-option';
import { Page } from '../../../classes/page';
import { PageDisplayType } from '../../../classes/page-display-type';
import { Searchable } from '../../../classes/searchable';
import { PageService } from '../../../services/page.service';
import { PopupService } from '../../../services/popup.service';
import { DropdownComponent } from '../../elements/dropdowns/dropdown/dropdown.component';
import { ItemListComponent } from '../../item-lists/item-list/item-list.component';

@Component({
  selector: 'page-properties',
  templateUrl: './page-properties.component.html',
  styleUrls: ['./page-properties.component.scss']
})
export class PagePropertiesComponent implements OnInit, Searchable<ListItem> {
  @Input() page: Page = new Page();
  @ViewChild('itemList', { static: false }) itemList: ItemListComponent;
  @ViewChild('dropdown', { static: false }) dropdown: DropdownComponent;
  public itemListOptions: ItemListOptions;
  public apiUrl: string;
  public pageDisplayType = PageDisplayType;
  public displayTypes = [
    {
      key: 'Custom',
      value: 0
    },
    {
      key: 'Home',
      value: 1
    },
    {
      key: 'Browse',
      value: 2
    },
    {
      key: 'Search',
      value: 3
    },
    {
      key: 'Grid',
      value: 4
    }
  ];

  constructor(public pageService: PageService, private promptService: PromptService, public dataService: DataService, private popupService: PopupService) { }



  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    // Define the item list options
    this.itemListOptions = {
      // Current Object
      currentObj: this,
      // Menu Options
      menuOptions: () => {
        return [
          // New Item
          new MenuOption('New ' + this.getItemType(), this.itemList.addIcon.isDisabled, this.onListItemAdd, null, 'Ctrl+Alt+N'),
          // Delete Item
          new MenuOption(!this.itemList.isMultiSelected ? 'Delete ' + this.getItemType() : 'Delete ' + this.getItemType() + 's', this.itemList.deleteIcon.isDisabled, this.onListItemDelete, null, 'Delete')
        ]
      },
      // On Add Item
      onAddItem: this.openPopup,
      // On Delete Item
      onDeleteItem: this.openDeletePrompt
    }
  }

  getSelectedIndex() {
    return this.displayTypes.findIndex(x => x.value == this.page.displayType)
  }




  // -----------------------------( SET PAGE WIDTH )------------------------------ \\
  setPageWidth(width: number) {
    this.page.width = width;
    this.pageService.setPageWidth(width);
    this.pageService.save();
  }




  // -----------------------------( ON PAGE TYPE CHANGE )------------------------------ \\
  onPageTypeChange(pageType: PageDisplayType) {
    let currentIndex = this.getSelectedIndex();

    if (this.page.displayItems.length > 0) {
      this.promptService.showPrompt('Change Type', 'Changing this type will remove all your items. Do you want to proceed?', this.changeType, this, [pageType], this.resetSelectedIndex, [currentIndex]);
    } else {
      this.changeType(pageType);
    }
  }


  // -----------------------------( CHANGE TYPE )------------------------------ \\
  changeType(pageType: PageDisplayType) {
    if (this.page.displayItems.length > 0) {
      this.page.displayItems.forEach(x => x.selected = true);
      this.deleteItem();
    }

    this.page.displayType = pageType;
    this.pageService.save();
  }



  // -----------------------------( RESET SELECTED INDEX )------------------------------ \\
  resetSelectedIndex(currentIndex: number) {
    this.dropdown.selectedIndex = currentIndex;
  }





  // -----------------------------( ON LIST ITEM ADD )------------------------------ \\
  onListItemAdd() {
    this.itemList.onListItemAdd();
  }


  // -----------------------------( OPEN POPUP )------------------------------ \\
  openPopup(sourceElement: HTMLElement) {
    if (this.page.displayType == PageDisplayType.Search) {
      this.apiUrl = 'api/Keywords';
    } else if (this.page.displayType == PageDisplayType.Browse) {
      this.apiUrl = 'api/Niches';
    }

    this.popupService.sourceElement = sourceElement;
    this.popupService.searchPopup.searchable = this;
    this.popupService.searchPopup.show = !this.popupService.searchPopup.show;
  }


  // -----------------------------( SET SEARCH ITEM )------------------------------ \\
  setSearchItem(searchItem: ListItem) {
    if (this.page.displayItems.some(x => x.name == searchItem.name)) return;

    // Add the item to the list
    this.page.displayItems.push(searchItem);



    // Select the new list item
    this.itemList.setListItemSelection(this.itemList.listItems.length - 1);

    this.dataService.post('api/Pages/PageDisplayTypeId', {
      pageId: this.page.id,
      displayId: searchItem.id
    }).subscribe((id: number) => {
      searchItem.id = id;
      let selectType = this.page.displayItems[this.page.displayItems.length - 1].selectType
      this.page.displayItems[this.page.displayItems.length - 1].selectType = null;
      this.page.displayItems[this.page.displayItems.length - 1].selected = false;
      this.pageService.save();
      this.page.displayItems[this.page.displayItems.length - 1].selectType = selectType;
      this.page.displayItems[this.page.displayItems.length - 1].selected = true;

    });
  }


  // -----------------------------( ON LIST ITEM DELETE )------------------------------ \\
  onListItemDelete() {
    this.itemList.onListItemDelete();
  }


  // -----------------------------( OPEN DELETE PROMPT )------------------------------ \\
  openDeletePrompt() {
    // Prompt the user
    this.itemList.itemDeletionPending = true;
    let promptTitle = !this.itemList.isMultiSelected ? 'Delete ' + this.getItemType() : 'Delete ' + this.getItemType() + 's';
    let promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete the selected ' + this.getItemType() + '?' : 'Are you sure you want to delete all the selected ' + this.getItemType() + 's?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteItem, this, null, this.onPromptCancel);
  }

  // -----------------------------( DELETE ITEM )------------------------------ \\
  deleteItem() {
    let deletedItems: Array<ListItem> = this.itemList.deleteListItem();

    this.dataService.delete('api/Pages/PageDisplayTypeId', { ids: deletedItems.map(x => x.id) }).subscribe();
    this.pageService.save();
  }


  // -----------------------------( ON PROMPT CANCEL )------------------------------ \\
  onPromptCancel() {
    this.itemList.onPromptCancel()
  }




  // -----------------------------( GET ITEM TYPE )------------------------------ \\
  getItemType() {
    return this.page.displayType == PageDisplayType.Browse ? 'Niche' : 'Keyword';
  }
}