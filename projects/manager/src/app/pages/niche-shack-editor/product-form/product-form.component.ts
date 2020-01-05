import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() productInput: any;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  public showProduct: boolean = true;
  public productName: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.productName = this.productInput.name;

    // Get product with this.productInput.id
  }

}
