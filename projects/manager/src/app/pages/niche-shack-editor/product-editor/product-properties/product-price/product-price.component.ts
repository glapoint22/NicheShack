import { Component, DoCheck, Input, OnChanges, ViewChild } from '@angular/core';
import { ProductPrice } from 'classes/product-price';
import { ShippingType } from 'classes/shipping-type';
import { MediaType } from 'projects/manager/src/app/classes/media';
import { Product } from 'projects/manager/src/app/classes/product';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PromptService } from 'services/prompt.service';

@Component({
  selector: 'product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss']
})
export class ProductPriceComponent implements OnChanges, DoCheck {
  constructor(private promptService: PromptService) { }
  // Private
  private multiPriceSet: boolean;
  private singlePriceSet: boolean;
  // Public
  public isMultiPrice: boolean;
  public mediaType = MediaType;
  public counterIndex: number = 0;
  public shippingType = ShippingType;
  @Input() product: Product;



  // ==============================( NG ON CHANGES )============================== \\

  ngOnChanges() {
    if (!this.product.isMultiPrice) {
      this.product.price = new Array<ProductPrice>();
      this.product.price.push(new ProductPrice());
    }
  }



  // ==============================( NG DO CHECK )============================== \\

  ngDoCheck() {
    if (!this.product.isMultiPrice && !this.singlePriceSet) {
      window.setTimeout(() => {
        this.singlePriceSet = true;
        this.multiPriceSet = false;

        fromEvent(document.getElementById('single-price-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {

        });
      });

    } else if (this.product.isMultiPrice && this.product.price.length > 0 && !this.multiPriceSet) {

      window.setTimeout(() => {
        this.singlePriceSet = false;
        this.multiPriceSet = true;


        fromEvent(document.getElementById('header-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {

        });


        fromEvent(document.getElementById('quantity-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {

        });


        fromEvent(document.getElementById('unit-price-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {

        });


        fromEvent(document.getElementById('unit-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {

        });


        fromEvent(document.getElementById('strikethrough-price-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {

        });


        fromEvent(document.getElementById('total-price-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {

        });
      });
    }
  }



  // ==============================( ON SINGLE PRICE RADIO BUTTON SELECT )============================== \\

  onSinglePriceRadioButtonSelect() {
    this.isMultiPrice = false;
    let valueEnteredIntoPricePoint: boolean = false;

    // Loop through each price point
    this.product.price.forEach(x => {
      // If a value has been entered into any of the price points
      if (x.header != null && x.header.length > 0 ||
        x.quantity != null && x.quantity.length > 0 ||
        x.image.url != null ||
        x.unitPrice != null && x.unitPrice.toString().length > 0 ||
        x.unit != null && x.unit.length > 0 ||
        x.strikethroughPrice != null && x.strikethroughPrice.toString().length > 0 ||
        x.price != null && x.price.toString().length > 0 ||
        x.shipping != ShippingType.None) {

        // Mark that a value has been entered into a price point
        valueEnteredIntoPricePoint = true;
      }
    });

    // If a price point has been marked as having a value entered
    if (valueEnteredIntoPricePoint) {

      // Open the prompt
      this.promptService.showPrompt("Warning", "Changing to single price will remove all multi price information. Do you want to continue?",

        // Yes
        () => {
          this.counterIndex = 0;
          this.product.isMultiPrice = false;
          this.product.price = new Array<ProductPrice>();
          this.product.price.push(new ProductPrice());
        }, this, null,

        // No
        () => {
          this.isMultiPrice = true;
        }
      );

      // If NO price points have been created
    } else {

      this.counterIndex = 0;
      this.product.isMultiPrice = false;
      this.product.price = new Array<ProductPrice>();
      this.product.price.push(new ProductPrice());
    }
  }



  // ==============================( ON MULTI PRICE RADIO BUTTON SELECT )============================== \\

  onMultiPriceRadioButtonSelect() {
    this.isMultiPrice = true;

    // If a value has been submitted into the single price input text
    if (this.product.price[this.counterIndex].price != null && this.product.price[this.counterIndex].price.toString().length > 0) {

      // Open the prompt
      this.promptService.showPrompt("Warning", "Changing to multi price will remove the single price value. Do you want to continue?",

        // Yes
        () => {
          this.product.isMultiPrice = true;
          this.product.price = new Array<ProductPrice>();
          this.product.price.push(new ProductPrice());
        }, this, null,

        // No
        () => {
          this.isMultiPrice = false;
        }
      );

      // If NO value has been submitted into the single price input text
    } else {
      this.product.isMultiPrice = true;
      this.product.price = new Array<ProductPrice>();
      this.product.price.push(new ProductPrice());
    }
  }



  // ==============================( ADD PRICE POINT )============================== \\

  addPricePoint() {
    this.counterIndex = this.product.price.length;
    this.product.price.push(new ProductPrice());

    // As long as it's not the first price point
    if (this.counterIndex != 0) {
      // Copy all the values from the previous price point to the newly created price point
      this.product.price[this.counterIndex].unit = this.product.price[this.counterIndex - 1].unit;
      this.product.price[this.counterIndex].price = this.product.price[this.counterIndex - 1].price;
      this.product.price[this.counterIndex].header = this.product.price[this.counterIndex - 1].header;
      this.product.price[this.counterIndex].quantity = this.product.price[this.counterIndex - 1].quantity;
      this.product.price[this.counterIndex].shipping = this.product.price[this.counterIndex - 1].shipping;
      this.product.price[this.counterIndex].unitPrice = this.product.price[this.counterIndex - 1].unitPrice;
      this.product.price[this.counterIndex].strikethroughPrice = this.product.price[this.counterIndex - 1].strikethroughPrice;
    }
  }



  // ==============================( DELETE PRICE POINT )============================== \\

  deletePricePoint() {
    // Open the prompt
    this.promptService.showPrompt("Delete Price Point", "Are you sure you want to delete this price point?",

      // Yes
      () => {
        this.product.price.splice(this.counterIndex, 1);
        
      }, this, null,

      // No
      () => {
        
      }
    );
  }



  // ==============================( ON SHIPPING TYPE )============================== \\

  onShippingType(shippingType: ShippingType) {
    this.product.price[this.counterIndex].shipping = shippingType;
  }



  // ==============================( ON INPUT TEXT INPUT )============================== \\

  onInputTextInput(inputText, inputTextId) {
    !(/^[0123456789.]*$/i).test(inputText.value) ? inputText.value = inputText.value.replace(/[^0123456789.]/ig, '') : null;
    if (inputTextId == 1) this.product.price[this.counterIndex].unitPrice = inputText.value;
    if (inputTextId == 2) this.product.price[this.counterIndex].strikethroughPrice = inputText.value;
    if (inputTextId == 3) this.product.price[this.counterIndex].price = inputText.value;
  }
}