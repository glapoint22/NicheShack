import { Component, Input, OnInit } from '@angular/core';
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
  private singlePrice: Subscription;
  private multiprice: Array<Subscription> = [];
  // Public
  public isMultiPrice: boolean;
  public mediaType = MediaType;
  public counterIndex: number = 0;
  public shippingType = ShippingType;
  @Input() product: Product;



  // ==============================( NG ON INIT )============================== \\

  ngOnInit() {
    this.isMultiPrice = this.product.isMultiPrice;
    if (!this.product.isMultiPrice) {
      this.setSinglePrice();
    } else {
      this.setMultiPrice();
    }
  }



  // ==============================( SET SINGLE PRICE )============================== \\

  setSinglePrice() {

    if (this.multiprice) {
      this.multiprice.forEach(x => {
        x.unsubscribe();
      })
    }


    window.setTimeout(() => {

      // Single Price
      this.singlePrice = fromEvent(document.getElementById('single-price-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {
        let singlePriceInput = document.getElementById('single-price-input') as HTMLInputElement;

        this.dataService.put('api/Products/Price', {
          productId: this.product.id,
          id: this.product.price[this.counterIndex].id,
          price: parseFloat(singlePriceInput.value)
        }).subscribe();
      });
    })
  }



  // ==============================( SET MULTI PRICE )============================== \\

  setMultiPrice() {
    if (this.singlePrice) {
      this.singlePrice.unsubscribe();
    }


    window.setTimeout(() => {

      // Header
      this.multiprice[0] = fromEvent(document.getElementById('header-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {
        // let headerInput = document.getElementById('header-input') as HTMLInputElement;

        // this.dataService.put('api/Products/Price', {
        //   productId: this.product.id,
        //   id: this.product.price[this.counterIndex].id,
        //   header: headerInput.value
        // }).subscribe();
      });

      // Quantity
      this.multiprice[1] = fromEvent(document.getElementById('quantity-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {

      });

      // Unit Price
      this.multiprice[2] = fromEvent(document.getElementById('unit-price-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {

      });

      // Unit
      this.multiprice[3] = fromEvent(document.getElementById('unit-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {

      });

      // Strikethrough Price
      this.multiprice[4] = fromEvent(document.getElementById('strikethrough-price-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {

      });

      // Total Price
      this.multiprice[5] = fromEvent(document.getElementById('total-price-input'), 'input').pipe(debounceTime(1000)).subscribe(() => {

      });

      // Shipping Price
      this.multiprice[6] = fromEvent(document.getElementById('shipping-price'), 'input').pipe(debounceTime(1000)).subscribe(() => {

      });
    })
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
          this.counterIndex = 0;
          this.product.isMultiPrice = false;
          this.setSinglePrice();
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
      this.setSinglePrice();
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
          this.product.isMultiPrice = true;
          this.setMultiPrice();

          this.product.price[this.counterIndex].price = 0;


          this.dataService.put('api/Products/Price', {
            productId: this.product.id,
            id: this.product.price[this.counterIndex].id,
            price: 0
          }).subscribe();


          this.dataService.put('api/Products/IsMultiPrice', {
            productId: this.product.id,
            isMultiPrice: true
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
      this.setMultiPrice();
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


    this.dataService.post('api/Products/Price', {
      productId: this.product.id
    }).subscribe((id: number) => this.product.price[this.counterIndex].id = id);



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
  }



  // ==============================( DELETE PRICE POINT )============================== \\

  deletePricePoint() {
    if (this.product.price.length > 1) {
      // Open the prompt
      this.promptService.showPrompt("Delete Price Point", "Are you sure you want to delete this price point?",

        // Yes
        () => {

          this.dataService.delete('api/Products/Price', {
            productId: this.product.id,
            priceId: this.product.price[this.counterIndex].id

          }).subscribe(() => {
            this.product.price.splice(this.counterIndex, 1);
            if (this.counterIndex > 0) this.counterIndex--;
          });
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