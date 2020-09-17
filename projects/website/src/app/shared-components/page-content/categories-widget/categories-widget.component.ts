import { Component } from '@angular/core';
import { BackgroundColorBase } from 'classes/background-color-base';
import { Color } from 'classes/color';
import { ShadowBase } from 'classes/shadow-base';
import { TextColorBase } from 'classes/text-color-base';
import { Caption } from '../../../classes/caption';
import { CategoriesWidgetData } from '../../../classes/categories-widget-data';
import { Category } from '../../../interfaces/category';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'categories-widget',
  templateUrl: './categories-widget.component.html',
  styleUrls: ['./categories-widget.component.scss']
})
export class CategoriesWidgetComponent extends WidgetComponent {
  public caption: Caption = new Caption();
  public categories: Array<Category> = [];
  public textColor: TextColorBase = new TextColorBase(new Color(255, 255, 255, 1));
  public backgroundColor: BackgroundColorBase = new BackgroundColorBase(new Color(66, 0, 51, 1));
  public shadow: ShadowBase = new ShadowBase();


  setData(widgetData: CategoriesWidgetData) {
    this.caption.setData(widgetData.caption);
    if (widgetData.categories) this.categories = widgetData.categories;
    this.textColor.setData(widgetData.textColor);
    this.backgroundColor.setData(widgetData.backgroundColor);
    this.shadow.setData(widgetData.shadow);
    super.setData(widgetData);
  }
}