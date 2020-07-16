import { Component } from '@angular/core';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { WidgetType } from 'projects/manager/src/app/classes/widget-type';
import { Category } from 'projects/manager/src/app/classes/category';
import { CategoriesWidgetData } from 'projects/manager/src/app/classes/categories-widget-data';
import { ColumnData } from 'projects/manager/src/app/classes/column-data';
import { Caption } from 'projects/manager/src/app/classes/caption';
import { Color } from 'projects/manager/src/app/classes/color';
import { TextColor } from 'projects/manager/src/app/classes/text-color';
import { BackgroundColor } from 'projects/manager/src/app/classes/background-color';
import { Shadow } from 'projects/manager/src/app/classes/shadow';

@Component({
  selector: 'categories-widget',
  templateUrl: './categories-widget.component.html',
  styleUrls: ['./categories-widget.component.scss']
})
export class CategoriesWidgetComponent extends FreeformWidgetComponent {
  constructor(widgetService: WidgetService,
    breakpointService: BreakpointService) { super(widgetService, breakpointService) }

  public caption: Caption = new Caption();
  public categories: Array<Category> = [];
  public textColor: TextColor = new TextColor(new Color(255, 255, 255, 1));
  public backgroundColor: BackgroundColor = new BackgroundColor(new Color(66, 0, 51, 1));
  public shadow: Shadow = new Shadow();


  ngOnInit() {
    this.height = 250
    this.name = 'Categories';
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


  getData(columnData: ColumnData) {
    let categoriesWidgetData = columnData.widgetData = new CategoriesWidgetData();

    // Name
    if (this.name != 'Categories') categoriesWidgetData.name = this.name;

    // Caption
    this.caption.getData(categoriesWidgetData.caption);

    // Categories
    if (this.categories.length > 0) categoriesWidgetData.categories = this.categories;

    // Text Color
    categoriesWidgetData.textColor = this.textColor.value.toHex();

    // Background Color
    categoriesWidgetData.backgroundColor = this.backgroundColor.value.toHex();

    // Shadow
    this.shadow.getData(categoriesWidgetData.shadow);

    super.getData(columnData);
  }

  buildHTML(parent: HTMLElement) {
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


    // Set the classes
    this.breakpointService.setBreakpointClasses(this, categoriesContainer);

    parent.appendChild(categoriesContainer);
  }
}
