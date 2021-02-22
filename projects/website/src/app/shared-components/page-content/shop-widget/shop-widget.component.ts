import { Component } from '@angular/core';
import { Color } from 'classes/color';
import { ShopItemData } from 'classes/shop-item-data';
import { TextColorBase } from 'classes/text-color-base';
import { LinkService } from 'services/link.service';
import { Caption } from '../../../classes/caption';
import { ShopWidgetData } from '../../../classes/shop-widget-data';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'shop-widget',
  templateUrl: './shop-widget.component.html',
  styleUrls: ['./shop-widget.component.scss']
})
export class ShopWidgetComponent extends WidgetComponent {
  public caption: Caption = new Caption();
  public items: Array<ShopItemData> = [];
  public textColor: TextColorBase = new TextColorBase(new Color(255, 255, 255, 1));


  constructor(private linkService: LinkService) { super() }


  setData(widgetData: ShopWidgetData) {
    this.caption.setData(widgetData.caption);
    if (widgetData.items) this.items = widgetData.items;
    this.textColor.setData(widgetData.textColor);
    super.setData(widgetData);
  }


  onClick(shopItem: ShopItemData) {
    this.linkService.navigate(shopItem.link);
  }
}