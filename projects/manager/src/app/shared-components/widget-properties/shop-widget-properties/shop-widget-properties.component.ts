import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { PromptService } from 'services/prompt.service';
import { ShopType } from '../../../classes/shop-type';
import { PageService } from '../../../services/page.service';
import { ShopWidgetComponent } from '../../designer/widgets/shop-widget/shop-widget.component';
import { DropdownComponent } from '../../elements/dropdowns/dropdown/dropdown.component';

@Component({
  selector: 'shop-widget-properties',
  templateUrl: './shop-widget-properties.component.html',
  styleUrls: ['./shop-widget-properties.component.scss']
})
export class ShopWidgetPropertiesComponent implements OnChanges {
  @Input() shopWidget: ShopWidgetComponent;
  @ViewChild('dropdown', { static: false }) dropdown: DropdownComponent;
  public dropdownList = [{ key: 'Category', value: ShopType.Category }, { key: 'Niche', value: ShopType.Niche }]
  public selectedIndex: number;

  constructor(public pageService: PageService, private promptService: PromptService) { }


  // -----------------------------( NG ON CHANGES )------------------------------ \\
  ngOnChanges() {
    this.setSelectedIndex();
  }



  // -----------------------------( SET SELECTED INDEX )------------------------------ \\
  setSelectedIndex() {
    this.selectedIndex = this.shopWidget.shopType == ShopType.Category ? 0 : 1;
  }




  // -----------------------------( ON DROPDOWN CHANGE )------------------------------ \\
  onDropdownChange(type: ShopType) {
    if (type == this.shopWidget.shopType) return;

    if (this.shopWidget.items.length > 0) {
      // Prompt the user
      let promptTitle = 'Change Type';
      let promptMessage = 'This action will remove your items. Do you want to proceed?';
      this.promptService.showPrompt(promptTitle, promptMessage, this.changeType, this, [type], this.resetSelectedIndex);
    } else {
      this.changeType(type);
    }
  }



  // -----------------------------( CHANGE TYPE )------------------------------ \\
  changeType(type: ShopType) {
    this.shopWidget.shopType = type;
    this.setSelectedIndex();
    this.shopWidget.items = [];
    this.pageService.save();
  }





  // -----------------------------( RESET SELECTED INDEX )------------------------------ \\
  resetSelectedIndex() {
    this.dropdown.selectedIndex = this.selectedIndex;
  }

}