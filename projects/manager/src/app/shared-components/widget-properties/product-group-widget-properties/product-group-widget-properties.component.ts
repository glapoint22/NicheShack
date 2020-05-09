import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-group-widget-properties',
  templateUrl: './product-group-widget-properties.component.html',
  styleUrls: ['./product-group-widget-properties.component.scss']
})
export class ProductGroupWidgetPropertiesComponent {
  @Input() featuredProducts: Array<string>;
  public showFeaturedProductsPropertyBox: boolean = true;

  // -------------------------( ON DROPDOWN OPTION SELECT )------------------------ \\
  onDropdownOptionSelect(selectedOptionValue: string) {
    if(selectedOptionValue == 'Featured Products') {
      this.showFeaturedProductsPropertyBox = true;
    }else {
      this.showFeaturedProductsPropertyBox = false;
    }
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