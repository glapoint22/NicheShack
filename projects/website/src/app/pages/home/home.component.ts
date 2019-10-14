import { Component, OnInit } from '@angular/core';
import { DataService } from 'services/data.service';
import { ProductGroup } from '../../interfaces/product-group';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public productGroups: Array<ProductGroup>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.get('api/Home')
      .subscribe(response => {
        this.productGroups = response.productGroups;
      });
  }


}
