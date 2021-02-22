import { Component, Input, ViewChild } from '@angular/core';
import { ShopItem } from 'classes/shop-item';
import { Searchable } from 'projects/manager/src/app/classes/searchable';
import { ShopType } from 'projects/manager/src/app/classes/shop-type';
import { PageService } from 'projects/manager/src/app/services/page.service';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { PromptService } from 'services/prompt.service';
import { CounterComponent } from '../../../counter/counter.component';
import { ShopWidgetComponent } from '../../../designer/widgets/shop-widget/shop-widget.component';

@Component({
  selector: 'shop-items',
  templateUrl: './shop-items.component.html',
  styleUrls: ['./shop-items.component.scss']
})
export class ShopItemsComponent implements Searchable<ShopItem> {
  @Input() shopWidget: ShopWidgetComponent;
  @ViewChild('counter', { static: false }) counter: CounterComponent;
  public apiUrl: string;

  constructor(public pageService: PageService, private promptService: PromptService, private popupService: PopupService) { }

  
  // -----------------------------( ON ADD ITEM CLICK )------------------------------ \\
  onAddItemClick() {
    this.shopWidget.items.push(new ShopItem());
    this.counter.set(this.shopWidget.items.length);
    this.shopWidget.currentItemIndex = this.shopWidget.items.length - 1;
    this.pageService.save();
  }



  // -----------------------------( OPEN POPUP )------------------------------ \\
  openPopup(sourceElement: HTMLElement) {
    if (this.shopWidget.shopType == ShopType.Category) {
      this.apiUrl = 'api/Categories/Detail';
    } else {
      this.apiUrl = 'api/Niches/Detail';
    }

    this.popupService.sourceElement = sourceElement;
    this.popupService.searchPopup.searchable = this;
    this.popupService.searchPopup.show = !this.popupService.searchPopup.show;
  }



  // -----------------------------( SET SEARCH ITEM )------------------------------ \\
  setSearchItem(searchItem: ShopItem) {
    this.shopWidget.items[this.shopWidget.currentItemIndex].id = searchItem.id;
    this.shopWidget.items[this.shopWidget.currentItemIndex].name = searchItem.name;
    this.shopWidget.items[this.shopWidget.currentItemIndex].icon = searchItem.icon;
    this.pageService.save();
  }

  



   // -----------------------------( ON DELETE CLICK )------------------------------ \\
   onDeleteClick() {
    // Prompt the user
    let promptTitle = 'Delete Item';
    let promptMessage = 'Are you sure you want to delete this item?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteItem, this);
  }



  // -----------------------------( DELETE ITEM )------------------------------ \\
  deleteItem() {
    // Remove the item
    this.shopWidget.items.splice(this.shopWidget.currentItemIndex, 1);

    // If we still have banners left
    if (this.shopWidget.items.length > 0) {
      this.shopWidget.currentItemIndex = Math.min(this.shopWidget.items.length - 1, this.shopWidget.currentItemIndex);
      this.counter.set(this.shopWidget.currentItemIndex + 1);
    }

    this.pageService.save();
  }
}