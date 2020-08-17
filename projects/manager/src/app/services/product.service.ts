import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { Media, MediaType } from '../classes/media';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, Observable, Subscriber, Subscription } from 'rxjs';
import { PopupService } from './popup.service';
import { NicheShackHierarchyItemType } from '../classes/hierarchy-item';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _product: Product;
  public get product(): Product {
    return this._product;
  }
  public set product(product: Product) {
    if(product) this.onProductSet.next(product);
    
    this._product = product;
  }


  public onProductSet = new Subject<Product>();


  constructor(private sanitizer: DomSanitizer, private popupService: PopupService) { }


  // --------------------------------( SET CURRENT SELECTED MEDIA )-------------------------------- \\
  setCurrentSelectedMedia(media: Media) {
    if (media.type == MediaType.Video) {
      media.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(media.url);
    }
  }




  // --------------------------------( OPEN PRODUCT )-------------------------------- \\
  openProduct(productId: number): Observable<Product> {
    this.popupService.nicheShackHierarchyPopup.openItem(productId, NicheShackHierarchyItemType.Product);

    return new Observable<Product>((subscriber: Subscriber<Product>) => {
      let subscription: Subscription = this.onProductSet.subscribe((product: Product)=> {
        subscriber.next(product);
        subscription.unsubscribe();
      });
    });
  }
}