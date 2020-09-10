import { Component } from '@angular/core';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { WidgetType } from 'classes/widget-type';
import { Category } from 'projects/manager/src/app/classes/category';
import { CategoriesWidgetData } from 'projects/manager/src/app/classes/categories-widget-data';
import { Caption } from 'projects/manager/src/app/classes/caption';
import { Color } from 'classes/color';
import { TextColor } from 'projects/manager/src/app/classes/text-color';
import { BackgroundColor } from 'projects/manager/src/app/classes/background-color';
import { Shadow } from 'projects/manager/src/app/classes/shadow';

@Component({
  selector: 'categories-widget',
  templateUrl: './categories-widget.component.html',
  styleUrls: ['./categories-widget.component.scss']
})
export class CategoriesWidgetComponent extends FreeformWidgetComponent {
  public caption: Caption = new Caption();
  public categories: Array<Category> = [];
  public textColor: TextColor = new TextColor(new Color(255, 255, 255, 1));
  public backgroundColor: BackgroundColor = new BackgroundColor(new Color(66, 0, 51, 1));
  public shadow: Shadow = new Shadow();

  ngOnInit() {
    this.height = 250
    this.name = this.defaultName = 'Categories';
    this.type = WidgetType.Categories;
    this.caption.text = 'Shop by category';
    this.caption.color = new Color(255, 187, 0, 1);
    this.caption.fontSize.selectedIndex = 9;
    this.caption.fontSize.styleValue = this.caption.fontSize.options[this.caption.fontSize.selectedIndex].value;
    super.ngOnInit();
  }

  setData(widgetData: CategoriesWidgetData) {
    this.caption.setData(widgetData.caption);
    this.categories = widgetData.categories;
    this.textColor.setData(widgetData.textColor);
    this.backgroundColor.setData(widgetData.backgroundColor);
    this.shadow.setData(widgetData.shadow);
    super.setData(widgetData);
  }


  getData(): CategoriesWidgetData {
    let widgetData = super.getData();

    return {
      name: this.name != this.defaultName ? this.name : null,
      widgetType: widgetData.widgetType,
      width: widgetData.width,
      height: null,
      horizontalAlignment: widgetData.horizontalAlignment,
      shadow: this.shadow.getData(),
      caption: this.caption.getData(),
      textColor: this.textColor.value.toHex(),
      backgroundColor: this.backgroundColor.value.toHex(),
      categories: this.categories.length > 0 ? this.categories : [],
      breakpoints: []
    }
  }

  buildPreview(parent: HTMLElement) {
    // Categories container
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
    this.categories.forEach((category: Category) => {
      // Category
      let categoryElement = document.createElement('div');
      categoryElement.classList.add('category');

      // Image
      let img = document.createElement('img');
      img.src = 'images/' + category.icon.url;

      // Shadow
      this.shadow.applyStyle(img);
      this.backgroundColor.applyStyle(img);

      // title
      let title = document.createElement('div');
      title.innerText = category.name;
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
