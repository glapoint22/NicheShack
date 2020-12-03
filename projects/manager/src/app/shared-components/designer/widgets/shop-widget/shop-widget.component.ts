import { Component, OnInit } from '@angular/core';
import { Color } from 'classes/color';
import { Caption } from 'projects/manager/src/app/classes/caption';
import { ShopType } from 'projects/manager/src/app/classes/shop-type';
import { ShopItem } from 'classes/shop-item';
import { TextColor } from 'projects/manager/src/app/classes/text-color';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { WidgetType } from 'classes/widget-type';
import { ShopWidgetData } from 'projects/manager/src/app/classes/shop-widget-data';

@Component({
  selector: 'shop-widget',
  templateUrl: './shop-widget.component.html',
  styleUrls: ['./shop-widget.component.scss']
})
export class ShopWidgetComponent extends FreeformWidgetComponent implements OnInit {
  public caption: Caption = new Caption();
  public textColor: TextColor = new TextColor(new Color(255, 255, 255, 1));
  public items: Array<ShopItem> = [];
  public shopType: ShopType = ShopType.Category;
  public currentItemIndex: number = 0;

  

  ngOnInit() {
    this.height = 250
    this.name = this.defaultName = 'Shop';
    this.type = WidgetType.Shop;
    this.caption.text = 'Shop by Niche';
    this.caption.color = new Color(255, 187, 0, 1);
    this.caption.fontSize.selectedIndex = 9;
    this.caption.fontSize.styleValue = this.caption.fontSize.options[this.caption.fontSize.selectedIndex].value;
    super.ngOnInit();
  }


  setData(widgetData: ShopWidgetData) {
    this.caption.setData(widgetData.caption);
    if(widgetData.items) {
      widgetData.items.forEach((item: ShopItem) => {
        this.items.push(new ShopItem(item));
      });
    }
    
    this.shopType = widgetData.shopType;
    this.textColor.setData(widgetData.textColor);
    super.setData(widgetData);
  }


  getData(): ShopWidgetData {
    let widgetData = super.getData();

    return {
      name: this.name != this.defaultName ? this.name : null,
      widgetType: widgetData.widgetType,
      width: widgetData.width,
      height: null,
      horizontalAlignment: widgetData.horizontalAlignment,
      caption: this.caption.getData(),
      textColor: this.textColor.value.toHex(),
      shopType: this.shopType,
      items: this.items.length > 0 ? this.items : [],
      breakpoints: []
    }
  }

  buildPreview(parent: HTMLElement) {
    let categoriesContainer = document.createElement('div');
    categoriesContainer.classList.add('categories-container');

    // Set width
    if (this.width) categoriesContainer.style.maxWidth = this.width + 'px';

    // Caption
    let caption = document.createElement('div');
    caption.classList.add('caption');
    caption.innerText = this.caption.text;
    this.caption.applyStyle(caption);

    // Categories
    let categories = document.createElement('div');
    categories.classList.add('categories');

    // Loop through each category
    this.items.forEach((item: ShopItem) => {
      // Category
      let categoryElement = document.createElement('div');
      categoryElement.classList.add('category');

      // Image
      let img = document.createElement('img');
      img.src = 'images/' + item.icon.url;

      // title
      let title = document.createElement('div');
      title.innerText = item.name;
      title.classList.add('title');
      this.textColor.applyStyle(title);

      // Append
      categoryElement.appendChild(img);
      categoryElement.appendChild(title);
      categories.appendChild(categoryElement);
    });

    // Append
    categoriesContainer.appendChild(caption);
    categoriesContainer.appendChild(categories);


    super.buildPreview(parent, categoriesContainer);
  }



}
