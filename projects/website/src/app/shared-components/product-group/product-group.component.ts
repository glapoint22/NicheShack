import { Component, Input, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product } from 'classes/product';

@Component({
  selector: 'product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.scss']
})
export class ProductGroupComponent implements OnInit {
  @Input() caption: string;
  @Input() products: Array<Product>;

  public margin: number = 16;
  public showAll: boolean;
  public translate: number = 0;

  private currentPage: number = 1;
  private productWidth: number = 200;
  private currentTranslation: number = 0;
  private translations: Array<number> = [this.currentTranslation];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setShowAll();
    }
  }


  onRightButtonClick(containerWidth: number) {
    // Increment the page
    this.currentPage++;

    // Calculate how much to move the slider
    this.currentTranslation = this.translate = containerWidth + this.margin + this.currentTranslation;
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
    let productsPerPage = (containerWidth + this.margin) / (this.productWidth + this.margin);

    // Calculate the remaining products based on the current page and how many products per page
    let remainingProducts = this.products.length - (this.currentPage * productsPerPage);

    // See if we are on the last page
    return remainingProducts <= 0;
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