import { Component, Input, ViewChild, OnInit, OnChanges } from '@angular/core';
import { ProductGroupType } from 'projects/manager/src/app/classes/product-group-type';
import { PanelComponent } from '../../../panels/panel/panel.component';
import { KeyValue } from '@angular/common';
import { ProductGroupWidgetComponent } from '../../../designer/widgets/product-group-widget/product-group-widget.component';

@Component({
  selector: 'product-group-type',
  templateUrl: './product-group-type.component.html',
  styleUrls: ['./product-group-type.component.scss']
})
export class ProductGroupTypeComponent implements OnInit, OnChanges {
  @Input() productGroupWidget: ProductGroupWidgetComponent;
  @ViewChild('panel', { static: false }) panel: PanelComponent;
  public productGroupTypes: Array<KeyValue<string, string>>;
  public productGroupType = ProductGroupType;
  public featuredProducts: Array<string>;

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

  ngOnChanges() {
    if (this.productGroupWidget.featuredProducts) {
      this.featuredProducts = this.productGroupWidget.featuredProducts.map(x => x.title);
    }
  }

  // -------------------------( ON DROPDOWN OPTION SELECT )------------------------ \\
  onDropdownOptionSelect(selectedOptionValue: string) {
    let index = this.productGroupTypes.findIndex(x => x.value == selectedOptionValue);
    this.productGroupWidget.productGroupType = index;

    window.setTimeout(() => {
      this.panel.onContentLoad();
    });
  }


  // -----------------------------( ADD CATEGORY )------------------------------ \\
  addFeaturedProduct() {
    console.log("Add Featured Product");
  }


  // -----------------------------( EDIT CATEGORY )------------------------------ \\
  editFeaturedProduct() {
    console.log("Edit Featured Product");
  }
}