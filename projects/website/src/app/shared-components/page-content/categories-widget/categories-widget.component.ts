import { Component } from '@angular/core';
import { Color } from 'classes/color';
import { ShopItem } from 'classes/shop-item';
import { TextColorBase } from 'classes/text-color-base';
import { Caption } from '../../../classes/caption';
import { ShopWidgetData } from '../../../classes/shop-widget-data';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'categories-widget',
  templateUrl: './categories-widget.component.html',
  styleUrls: ['./categories-widget.component.scss']
})
export class CategoriesWidgetComponent extends WidgetComponent {
  public caption: Caption = new Caption();
  public items: Array<ShopItem> = [];
  public textColor: TextColorBase = new TextColorBase(new Color(255, 255, 255, 1));


  setData(widgetData: ShopWidgetData) {
    this.caption.setData(widgetData.caption);
    if (widgetData.items) this.items = widgetData.items;
    this.textColor.setData(widgetData.textColor);
    super.setData(widgetData);
  }
}