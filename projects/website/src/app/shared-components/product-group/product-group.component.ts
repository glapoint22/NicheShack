import { Component, Input, HostListener } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.scss']
})
export class ProductGroupComponent {
  @Input() caption: string;
  @Input() products: Array<Product>;

  public margin: number = 16;
  public lastPage: boolean;
  public showAll: boolean;
  public translate: number = 0;

  private currentPage: number = 1;
  private productWidth: number = 200;
  private currentTranslation: number = 0;
  private translations: Array<number> = [this.currentTranslation];

  onRightArrowClick(containerWidth: number) {
    // Increment the page
    this.currentPage++;

    // Calculate how many products should be on each page
    let productsPerPage = (containerWidth + this.margin) / (this.productWidth + this.margin);

    // Calculate the remaining products based on the current page and how many products per page
    let remainingProducts = this.products.length - (this.currentPage * productsPerPage);

    // See if we are on the last page
    if (remainingProducts <= 0) this.lastPage = true;

    // Calculate how much to move the slider
    this.currentTranslation = this.translate = containerWidth + this.margin + this.currentTranslation;
    this.translations.push(this.currentTranslation);
  }


  onLeftArrowClick() {
    // We are not on the last page anymore
    this.lastPage = false;

    // Get the previous translation from the array to move the slider back
    this.currentTranslation = this.translate = this.translations[this.translations.length - 2];
    this.currentPage--;
    this.translations.pop();
  }


  @HostListener('window:resize') onResize() {
    // Reset properties
    this.translate = 0;
    this.currentPage = 1;
    this.currentTranslation = 0;
    this.translations = [this.currentTranslation];
    this.lastPage = false;
    this.showAll = false;
  }
}