import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ProductGroupType } from 'projects/manager/src/app/classes/product-group-type';
import { KeyValue } from '@angular/common';
import { ProductGroupWidgetComponent } from '../../../designer/widgets/product-group-widget/product-group-widget.component';
import { Searchable } from 'projects/manager/src/app/classes/searchable';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { ItemListComponent } from '../../../item-lists/item-list/item-list.component';

@Component({
  selector: 'product-group-type',
  templateUrl: './product-group-type.component.html',
  styleUrls: ['./product-group-type.component.scss']
})
export class ProductGroupTypeComponent implements OnInit, Searchable {
  @Input() productGroupWidget: ProductGroupWidgetComponent;
  @ViewChild('itemList', { static: false }) itemList: ItemListComponent;
  public productGroupTypes: Array<KeyValue<string, string>>;
  public productGroupType = ProductGroupType;
  public searchUrl: string = 'api/Products';


  constructor(private popupService: PopupService, private promptService: PromptService) { }

  ngOnInit() {
    this.productGroupTypes = [
      { key: 'Featured Products', value: 'Featured Products' },
      { key: 'Browsed Products', value: 'Browsed Products' },
      { key: 'Related Browsed Products', value: 'Related Browsed Products' },
      { key: 'Related Bought Products', value: 'Related Bought Products' },
      { key: 'Related Wishlist Products', value: 'Related Wishlist Products' },
      { key: 'Related Subscribed Products', value: 'Related Subscribed Products' },
      { key: 'Related Browsed Niche Products', value: 'Related Browsed Niche Products' }
    ]
  }


  // -------------------------( ON DROPDOWN OPTION SELECT )------------------------ \\
  onDropdownOptionSelect(selectedOptionValue: string) {
    let index = this.productGroupTypes.findIndex(x => x.value == selectedOptionValue);
    this.productGroupWidget.productGroupType = index;
  }


  // -----------------------------( ADD FEATURED PRODUCT )------------------------------ \\
  addFeaturedProduct(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.searchPopup.searchable = this;
    this.popupService.searchPopup.show = !this.popupService.searchPopup.show;
  }



  // -----------------------------( SET SEARCH ITEM )------------------------------ \\
  setSearchItem(searchItem: any) {
    // Add the item to the list
    this.productGroupWidget.featuredProducts.push(searchItem)
  }




  // -----------------------------( ON REMOVE PRODUCT CLICK )------------------------------ \\
  onRemoveProductClick() {
    if (!this.itemList.deleteIcon.isDisabled) {
      this.promptService.showPrompt('Remove Product', 'Are you sure you want to remove this product?', this.removeProduct, this);
    }

  }



  // -----------------------------( REMOVE PRODUCT )------------------------------ \\
  removeProduct() {
    this.itemList.deleteListItem();
  }
}