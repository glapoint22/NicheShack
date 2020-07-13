import { Component, Input, OnChanges, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { ProductPricePoint } from 'projects/manager/src/app/classes/product-price-point';
import { ProductContent } from 'projects/manager/src/app/classes/product-content';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { Item } from 'projects/manager/src/app/classes/item';
import { CheckboxItemListComponent } from 'projects/manager/src/app/shared-components/item-lists/checkbox-item-list/checkbox-item-list.component';
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { ProductService } from 'projects/manager/src/app/services/product.service';
import { PaginatorComponent } from 'projects/manager/src/app/shared-components/paginator/paginator.component';
import { MediaType } from 'projects/manager/src/app/classes/media';
import { Image } from 'projects/manager/src/app/classes/image';
import { TempDataService } from 'projects/manager/src/app/services/temp-data.service';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.scss']
})
export class ProductContentComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() content: Array<ProductContent>;
  @Input() pricePoints: Array<ProductPricePoint>;
  @ViewChild('itemList', { static: false }) itemList: CheckboxItemListComponent;
  @ViewChild('titleInput', { static: false }) titleInput: ElementRef;
  public contentIndex: number = 0;
  public pricePointList: Array<Item>;
  private mediaBrowserPopupSubscription: Subscription;
  private pricePointPopupSubscription: Subscription;
  private currentIcon: string;


  constructor(
    public popupService: PopupService,
    private promptService: PromptService,
    private productService: ProductService,
    private dataService: TempDataService
  ) { }




  ngOnInit() {
    this.mediaBrowserPopupSubscription = this.popupService.mediaBrowserPopup.onPopupClose
      .subscribe(() => {
        // Test to see if the icon changed
        if (this.currentIcon != this.content[this.contentIndex].icon.id) {

          // Update the icon
          this.dataService.put('api/Content/Icon', {
            productId: this.productService.product.id,
            contentId: this.content[this.contentIndex].id,
            iconId: this.content[this.contentIndex].icon.id
          })
            .subscribe(() => {
              // Set the current icon as the new icon
              this.currentIcon = this.content[this.contentIndex].icon.id;
            });
        }
      });




    // Update the price point
    this.pricePointPopupSubscription = this.popupService.pricePointPopup.onPopupClose
      .subscribe(() => {
        this.dataService.put('api/Products/PricePoints', this.popupService.pricePointPopup.pricePoint).subscribe();
      });
  }




  // -----------------------------( NG AFTER VIEW INIT )------------------------------ \\
  ngAfterViewInit() {
    // As long as the list is there to access
    if (this.itemList != null) {
      // Set delete prompt title and message
      this.itemList.promptTitle = 'Delete Price Point';
      this.itemList.promptMultiTitle = 'Delete Price Points';
      this.itemList.propmtMessage = 'Are you sure you want to delete the selected price point?';
      this.itemList.propmtMultiMessage = 'Are you sure you want to delete all the selected price points?';
    }

    // This will update the content title
    fromEvent(this.titleInput.nativeElement, 'input')
      .pipe(
        debounceTime(250),
        switchMap(() => {
          return this.dataService.put('api/Content/Title', {
            productId: this.productService.product.id,
            contentId: this.content[this.contentIndex].id,
            title: this.titleInput.nativeElement.value
          })
        })).subscribe();
  }


  // -----------------------------( NG ON CHANGES )------------------------------ \\
  ngOnChanges() {
    let formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

    // Combine all the price point properties into one string
    if (this.pricePoints) {

      this.pricePointList = this.pricePoints.map(x => ({
        id: x.id,
        // Text Before
        name: ((x.textBefore.length == 0 ? "" : x.textBefore) + " " +
          // Price
          (formatter.format(parseFloat(x.wholeNumber + "." + x.decimal))) +
          // Text After
          (x.textAfter.length == 0 ? '' : " " + x.textAfter)).trim()
      }));
    }

    this.currentIcon = this.content[this.contentIndex].icon.id;
  }


  // -----------------------------( ADD CONTENT )------------------------------ \\
  addContent(paginator: PaginatorComponent) {
    let content: ProductContent = {
      id: null,
      icon: new Image(),
      title: null,
      priceIndices: []
    }

    this.dataService.post('api/Products/Content', this.productService.product.id)
      .subscribe((id: string) => {
        content.id = id;
      });


    this.productService.product.content.push(content);
    this.currentIcon = null;

    this.contentIndex = this.productService.product.content.length - 1;
    paginator.setPage(this.productService.product.content.length);
  }


  // -----------------------------( ON DELETE CONTENT )------------------------------ \\
  onDeleteContent(paginator: PaginatorComponent) {
    this.promptService.showPrompt('Delete Content', 'Are you sure you want to delete this content?', this.deleteContent, this, [paginator]);
  }


  // -----------------------------( DELETE CONTENT )------------------------------ \\
  deleteContent(paginator: PaginatorComponent) {
    // Delete this content from the database
    this.dataService.delete('api/Products/Content', this.productService.product.content[this.contentIndex].id).subscribe();

    // Delete this content from the content array
    this.productService.product.content.splice(this.contentIndex, 1);

    // Set the page for the paginator
    let index = Math.max(0, this.contentIndex = Math.min(this.productService.product.content.length - 1, this.contentIndex));
    paginator.setPage(index + 1);
  }


  // -----------------------------( ON IMAGE ICON CLICK )------------------------------ \\
  onImageIconClick(sourceElement: HTMLElement) {
    this.popupService.mediaType = MediaType.Icon;
    this.popupService.sourceElement = sourceElement;
    this.popupService.mediaBrowserPopup.show = !this.popupService.mediaBrowserPopup.show;
    this.popupService.mediaBrowserPopup.media = this.content[this.contentIndex].icon;
  }


  // -----------------------------( ADD PRICE POINT )------------------------------ \\
  addPricePoint(sourceElement: HTMLElement) {
    // Create the new price point
    let pricePoint: ProductPricePoint = {
      id: null,
      textBefore: '',
      textAfter: '',
      wholeNumber: 0,
      decimal: 0
    }


    this.dataService.post('api/Products/PricePoints', {
      productId: this.productService.product.id,
      order: this.pricePoints.length
    })
      .subscribe((id: string) => {
        pricePoint.id = id;
      });

    // Show the price point popup
    this.popupService.sourceElement = sourceElement;
    this.popupService.pricePointPopup.show = true;


    // Push the new price point
    this.pricePoints.push(pricePoint);
    this.pricePointList.push({
      id: pricePoint.id,
      name: ''
    });

    // Set the reference to this new price point
    this.popupService.pricePointPopup.pricePoint = pricePoint;
    this.popupService.pricePointPopup.pricePointListItem = this.pricePointList[this.pricePointList.length - 1];

    // This will set the new price point in the product properties
    this.popupService.pricePointPopup.setPricePointListItem();
  }


  // -----------------------------( EDIT PRICE POINT )------------------------------ \\
  editPricePoint(sourceElement: HTMLElement, index: number) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.pricePointPopup.show = true;
    this.popupService.pricePointPopup.pricePoint = this.pricePoints[index];
    this.popupService.pricePointPopup.pricePointListItem = this.pricePointList[index];
  }


  // -----------------------------( MOVE ARRAY ELEMENT )------------------------------ \\
  moveArrayElement(arr, move) {
    let element = arr[move.fromIndex];

    arr.splice(move.fromIndex, 1);
    arr.splice(move.toIndex, 0, element);
  }


  // -----------------------------( MOVE PRICE POINT )------------------------------ \\
  movePricePoint(move) {
    // Save the new order to the database
    this.dataService.put('api/Products/PricePoints/Move', {
      productId: this.productService.product.id,
      pricePointId: this.pricePoints[move.fromIndex].id,
      order: move.toIndex
    }).subscribe();

    // Update the price points
    this.moveArrayElement(this.pricePoints, move);

    // Update the check list
    for (let i = 0; i < this.content.length; i++) {
      this.moveArrayElement(this.content[i].priceIndices, move)
    }

    // Then update the price point list
    this.moveArrayElement(this.pricePointList, move);
  }





  onItemChange(index: number) {
    this.contentIndex = index;
    this.currentIcon = this.content[this.contentIndex].icon.id;
  }





  ngOnDestroy() {
    this.mediaBrowserPopupSubscription.unsubscribe();
    this.pricePointPopupSubscription.unsubscribe();
  }
}