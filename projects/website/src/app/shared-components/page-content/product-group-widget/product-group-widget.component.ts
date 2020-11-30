import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Product } from 'classes/product';
import { QueryParams } from 'classes/query-params';
import { DataService } from 'services/data.service';
import { Caption } from '../../../classes/caption';
import { ProductGroupWidgetData } from '../../../classes/product-group-widget-data';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'product-group-widget',
  templateUrl: './product-group-widget.component.html',
  styleUrls: ['./product-group-widget.component.scss']
})
export class ProductGroupWidgetComponent extends WidgetComponent implements OnInit {
  public queryParams: QueryParams = new QueryParams;
  public caption: Caption = new Caption();
  public products: Array<Product>;

  public showAll: boolean;
  public translate: number = 0;
  private currentPage: number = 1;
  public productWidth: number = 250;
  private currentTranslation: number = 0;
  private translations: Array<number> = [this.currentTranslation];


  constructor(private dataService: DataService, @Inject(PLATFORM_ID) private platformId: Object) {super()}


  ngOnInit() {
    this.queryParams.limit = 24;

    if (isPlatformBrowser(this.platformId)) {
      this.setShowAll();
    }
  }


  onRightButtonClick(containerWidth: number) {
    // Increment the page
    this.currentPage++;

    // Calculate how much to move the slider
    this.currentTranslation = this.translate = containerWidth + this.currentTranslation;
    this.translations.push(this.currentTranslation);
  }


  onLeftButtonClick() {
    // Get the previous translation from the array to move the slider back
    this.currentTranslation = this.translate = this.translations[this.translations.length - 2];
    this.currentPage--;
    this.translations.pop();
  }

  isLastPage(containerWidth: number) {
    // Calculate how many products should be on each page
    let productsPerPage = (containerWidth) / (this.productWidth);

    // Calculate the remaining products based on the current page and how many products per page
    let remainingProducts = this.products.length - (this.currentPage * productsPerPage);

    // See if we are on the last page
    return remainingProducts <= 0;
  }


  setData(widgetData: ProductGroupWidgetData) {
    this.caption.setData(widgetData.caption);
    if (widgetData.queries) {
      this.queryParams.queries = widgetData.queries;
      this.getProducts();
    }
    super.setData(widgetData);
  }


  getProducts() {
    this.dataService.post('api/Products/ProductGroup', this.queryParams)
      .subscribe((products: Array<Product>) => {
        this.products = products;
      });
  }


  setShowAll() {
    if (window.screen.width < 768) {
      this.showAll = false;
    } else {
      this.showAll = true;
    }
  }


  @HostListener('window:resize') onResize() {
    // Reset properties
    this.translate = 0;
    this.currentPage = 1;
    this.currentTranslation = 0;
    this.translations = [this.currentTranslation];
    this.setShowAll();
  }
  
}
