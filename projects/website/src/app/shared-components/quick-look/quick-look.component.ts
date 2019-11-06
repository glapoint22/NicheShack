import { Component, OnInit } from '@angular/core';
import { ShowHideComponent } from '../show-hide/show-hide.component';
import { Product } from '../../interfaces/product';
import { DataService } from 'services/data.service';

@Component({
  selector: 'quick-look',
  templateUrl: './quick-look.component.html',
  styleUrls: ['./quick-look.component.scss']
})
export class QuickLookComponent extends ShowHideComponent implements OnInit {
  public product: Product;
  public media: any;
  
  
  

  constructor(private dataService: DataService) { super(); }

  ngOnInit() {
  }

  onClick(product: Product) {
    this.product = product;
    super.onClick();

    this.dataService.get('api/Products/QuickLookProduct', [{ key: 'id', value: this.product.id }])
      .subscribe(results => {
        this.media = results.media;
        this.product.description = results.description;
      });
  }

  onMediaClick() {
    this.show = false;
  }

}
