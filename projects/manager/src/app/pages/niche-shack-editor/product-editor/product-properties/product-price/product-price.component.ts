import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ProductPrice } from 'classes/product-price';
import { ShippingType } from 'classes/shipping-type';
import { MediaType } from 'projects/manager/src/app/classes/media';
import { Product } from 'projects/manager/src/app/classes/product';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataService } from 'services/data.service';
import { PromptService } from 'services/prompt.service';

@Component({
  selector: 'product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss']
})
export class ProductPriceComponent implements OnInit {
  constructor(private promptService: PromptService, private dataService: DataService) { }
  
  // Private
  private singlePriceSubscription: Subscription;
  private multipriceSubscriptions: Array<Subscription> = [];

  // Public
  public isMultiPrice: boolean;
  public mediaType = MediaType;
  public counterIndex: number = 0;
  public shippingType = ShippingType;

  // Decorators
  @Input() product: Product;


  
  // ==============================( NG ON INIT )============================== \\

  ngOnInit() {
    // Update ismultiprice
    this.isMultiPrice = this.product.isMultiPrice;

    // Set the subscription based on whether price is single or multi
    if (!this.product.isMultiPrice) {
      this.setSinglePriceSubscription();
    } else {
      this.setMultiPriceSubscriptions();
    }
  }



  // ==============================( SET SINGLE PRICE SUBSCRIPTION )============================== \\

  setSinglePriceSubscription() {

    // Unsubscribe from all the multiprice subscriptions
    if (this.multipriceSubscriptions) {
      this.multipriceSubscriptions.forEach(x => {
        x.unsubscribe();
      })
    }

    window.setTimeout(() => {

      // Single Price
      this.singlePriceSubscription = fromEvent(document.getElementById('single-price-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {
        this.dataService.put('api/Products/Price', {
          productId: this.product.id,
          id: this.product.price[this.counterIndex].id,
          price: this.product.price[this.counterIndex].price
        }).subscribe();
      });
    })
  }



  // ==============================( SET MULTI PRICE SUBSCRIPTIONS )============================== \\

  setMultiPriceSubscriptions() {

    // Unsubscribe from the singleprice subscription
    if (this.singlePriceSubscription) {
      this.singlePriceSubscription.unsubscribe();
    }

    window.setTimeout(() => {

      // Header
      this.multipriceSubscriptions[0] = fromEvent(document.getElementById('header-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {
        this.updateMultiPrice();
      });

      // Quantity
      this.multipriceSubscriptions[1] = fromEvent(document.getElementById('quantity-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {
        this.updateMultiPrice();
      });

      // Unit Price
      this.multipriceSubscriptions[2] = fromEvent(document.getElementById('unit-price-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {
        this.updateMultiPrice();
      });

      // Unit
      this.multipriceSubscriptions[3] = fromEvent(document.getElementById('unit-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {
        this.updateMultiPrice();
      });

      // Strikethrough Price
      this.multipriceSubscriptions[4] = fromEvent(document.getElementById('strikethrough-price-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {
        this.updateMultiPrice();
      });

      // Total Price
      this.multipriceSubscriptions[5] = fromEvent(document.getElementById('total-price-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {
        this.updateMultiPrice();
      });

      // Shipping Price
      this.multipriceSubscriptions[6] = fromEvent(document.getElementById('shipping-price'), 'input').pipe(debounceTime(1000)).subscribe(() => {
        this.updateMultiPrice();
      });
    })
  }



  // ==============================( UPDATE MULTI PRICE )============================== \\

  updateMultiPrice() {
    // Update all the product price properties to the database
    this.dataService.put('api/Products/Price', {
      productId: this.product.id,
      id: this.product.price[this.counterIndex].id,
      Header: this.product.price[this.counterIndex].header,
      Quantity: this.product.price[this.counterIndex].quantity,
      ImageId: this.product.price[this.counterIndex].image.id == 0 ? null : this.product.price[this.counterIndex].image.id,
      UnitPrice: this.product.price[this.counterIndex].unitPrice,
      Unit: this.product.price[this.counterIndex].unit,
      StrikethroughPrice: this.product.price[this.counterIndex].strikethroughPrice,
      Price: this.product.price[this.counterIndex].price,
      Shipping: this.product.price[this.counterIndex].shipping,
      ShippingPrice: this.product.price[this.counterIndex].shippingPrice
    }).subscribe();
  }



  // ==============================( ON SINGLE PRICE RADIO BUTTON SELECT )============================== \\

  onSinglePriceRadioButtonSelect() {
    this.isMultiPrice = false;
    let resetProductPrice: boolean = false;

    // If a value has been entered into the first price point
    if ((this.product.price[0].header != null ||
      this.product.price[0].quantity != null ||
      this.product.price[0].image.url != null ||
      this.product.price[0].unitPrice != null ||
      this.product.price[0].unit != null ||
      this.product.price[0].strikethroughPrice != null ||
      this.product.price[0].price > 0 ||
      this.product.price[0].shipping != ShippingType.None) ||

      // or more than one price point has been created
      this.product.price.length > 1) {

      // Mark that the product price has to be reset
      resetProductPrice = true;
    }


    // If the product price has to be reset
    if (resetProductPrice) {

      // Open the prompt
      this.promptService.showPrompt("Warning", "Changing to single price will remove all multi price information. Do you want to continue?",

        // Yes
        () => {

          // Reset counterindex back to zero
          this.counterIndex = 0;

          // Reset ismultiprice
          this.product.isMultiPrice = false;
          this.setSinglePriceSubscription();
          this.dataService.put('api/Products/IsMultiPrice', {
            productId: this.product.id,
            isMultiPrice: false
          }).subscribe();

          // Remove all price points then create default price
          this.product.price = [];
          this.product.price.push(new ProductPrice());
          this.product.price[this.counterIndex].price = 0;
          this.dataService.delete('api/Products/Prices', {
            productId: this.product.id,
          }).subscribe((priceId: number) => {
            this.product.price[this.counterIndex].id = priceId;
          });
        }, this, null,

        // No
        () => {
          this.isMultiPrice = true;
        }
      );

      // If the product price does NOT have to be reset
    } else {

      this.counterIndex = 0;
      this.product.isMultiPrice = false;
      this.setSinglePriceSubscription();
      this.dataService.put('api/Products/IsMultiPrice', {
        productId: this.product.id,
        isMultiPrice: false
      }).subscribe();
    }
  }



  // ==============================( ON MULTI PRICE RADIO BUTTON SELECT )============================== \\

  onMultiPriceRadioButtonSelect() {
    this.isMultiPrice = true;

    // If a value has been submitted into the single price input text
    if (this.product.price[0].price > 0) {

      // Open the prompt
      this.promptService.showPrompt("Warning", "Changing to multi price will remove the single price value. Do you want to continue?",

        // Yes
        () => {

          // Reset ismultiprice
          this.product.isMultiPrice = true;
          this.setMultiPriceSubscriptions();
          this.dataService.put('api/Products/IsMultiPrice', {
            productId: this.product.id,
            isMultiPrice: true
          }).subscribe();

          // Reset price back to zero
          this.product.price[this.counterIndex].price = 0;
          this.dataService.put('api/Products/Price', {
            productId: this.product.id,
            id: this.product.price[this.counterIndex].id,
            price: 0
          }).subscribe();
        }, this, null,

        // No
        () => {
          this.isMultiPrice = false;
        }
      );

      // If NO value has been submitted into the single price input text
    } else {

      this.product.isMultiPrice = true;
      this.setMultiPriceSubscriptions();
      this.dataService.put('api/Products/IsMultiPrice', {
        productId: this.product.id,
        isMultiPrice: true
      }).subscribe();
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
      this.product.price[this.counterIndex].shipping = this.product.price[this.counterIndex - 1].shipping;
      this.product.price[this.counterIndex].shippingPrice = this.product.price[this.counterIndex - 1].shippingPrice;
    }

    // Create the new price point in the database
    this.dataService.post('api/Products/Price', {
      productId: this.product.id
    }).subscribe((priceId: number) => {
      this.product.price[this.counterIndex].id = priceId;
      this.updateMultiPrice();
    });
  }



  // ==============================( DELETE PRICE POINT )============================== \\

  deletePricePoint() {
    if (this.product.price.length > 1) {
      // Open the prompt
      this.promptService.showPrompt("Delete Price Point", "Are you sure you want to delete this price point?",

        // Yes
        () => {
          let priceId: number = this.product.price[this.counterIndex].id;

          // Remove the price point from the array
          this.product.price.splice(this.counterIndex, 1);
          if (this.counterIndex > 0) this.counterIndex--;

          // Remove the price point from the database
          this.dataService.delete('api/Products/Price', {
            productId: this.product.id,
            priceId: priceId
          }).subscribe();
        }, this, null,

        // No
        () => {
        }
      );
    }
  }



  // ==============================( ON SHIPPING TYPE )============================== \\

  onShippingType(shippingType: ShippingType) {
    this.product.price[this.counterIndex].shipping = shippingType;
    this.updateMultiPrice();
  }



  // ==============================( SET PRICE )============================== \\

  setPrice(inputTextValue: string): number {
    let price: number;

    // If the input text does NOT have a value or the input text just has a decimal point for a value
    if (inputTextValue.length == 0 || inputTextValue == ".") {
      // Set the price as null
      price = null;

      // If anything else
    } else {

      // Set the price as is
      price = parseFloat(inputTextValue);
    }
    return price;
  }



  // ==============================( ON INPUT TEXT INPUT )============================== \\

  onInputTextInput(inputText: HTMLInputElement) {
    if (inputText.id == "unit-input") this.product.price[this.counterIndex].unit = inputText.value.length == 0 ? null : inputText.value;
    if (inputText.id == "header-input") this.product.price[this.counterIndex].header = inputText.value.length == 0 ? null : inputText.value;
    if (inputText.id == "quantity-input") this.product.price[this.counterIndex].quantity = inputText.value.length == 0 ? null : inputText.value;


    !(/^[0123456789.]*$/i).test(inputText.value) ? inputText.value = inputText.value.replace(/[^0123456789.]/ig, '') : null;
    if (inputText.id == "total-price-input") this.product.price[this.counterIndex].price = this.setPrice(inputText.value);
    if (inputText.id == "single-price-input") this.product.price[this.counterIndex].price = this.setPrice(inputText.value);
    if (inputText.id == "shipping-price") this.product.price[this.counterIndex].shippingPrice = this.setPrice(inputText.value);
    if (inputText.id == "unit-price-input") this.product.price[this.counterIndex].unitPrice = inputText.value.length == 0 ? null : inputText.value;
    if (inputText.id == "strikethrough-price-input") this.product.price[this.counterIndex].strikethroughPrice = inputText.value.length == 0 ? null : inputText.value;
  }
}