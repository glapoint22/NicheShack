import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product';
import { DataService } from 'services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.scss']
})
export class ReviewsPageComponent implements OnInit {
  public product$: Observable<Product>;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.product$ = this.dataService
      .get('api/Products/Product', [{ key: 'id', value: this.route.snapshot.params.id }]);
      
  }

}
