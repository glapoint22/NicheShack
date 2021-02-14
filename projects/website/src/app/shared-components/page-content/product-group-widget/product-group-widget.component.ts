import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'classes/product';
import { Query, QueryType } from 'classes/query';
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


  constructor(
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute) { super() }


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

      // Get all auto queries
      let autoQueries: Array<Query> = widgetData.queries.filter(x => x.queryType == QueryType.Auto);


      autoQueries.forEach((autoQuery: Query) => {

        // Browsed Products
        if (autoQuery.intValue == 1) {
          // Get all cookies
          let cookiesArray = this.document.cookie.split(';');

          // Split the name and the content for each cookie
          for (let i = 0; i < cookiesArray.length; i++) {
            let cookiePair = cookiesArray[i].split("=");

            // If the cookie name is browse
            if (cookiePair[0].trim() == 'browse') {

              // Get the product ids from the cookie
              let content = decodeURIComponent(cookiePair[1]);
              autoQuery.intValues = content.split(',').map(x => parseInt(x));
              break;
            }
          }

          // If there are no product ids
          if (!autoQuery.intValues) {
            let index = widgetData.queries.findIndex(x => x == autoQuery);
            widgetData.queries.splice(index, 1);
          }

          // Related Products
        } else if (autoQuery.intValue == 2) {
          // Get the product id from the url
          autoQuery.stringValue = this.route.snapshot.paramMap.get('id');


          // If there is no product id
          if (!autoQuery.stringValue) {
            let index = widgetData.queries.findIndex(x => x == autoQuery);
            widgetData.queries.splice(index, 1);
          }
        }
      })



      // If we have queries
      if (widgetData.queries.length > 0) {
        this.queryParams.queries = widgetData.queries;
        this.getProducts();
      }

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
