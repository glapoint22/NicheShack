import { Component, OnInit, Inject } from '@angular/core';
import { ProductGroup } from '../../interfaces/product-group';
import { PageComponent } from '../page/page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { DataService } from 'services/data.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends PageComponent implements OnInit {
  public productGroups: Array<ProductGroup>;

  constructor(titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    dataService: DataService) {
    super(titleService, metaService, document, dataService);
  }

  ngOnInit() {
    this.title = 'What\'s your niche?';
    this.description = 'Online shopping from the largest affiliate marketing site on the planet, promoting items from thousands of companies and individuals.';
    // this.image = '/Images/tlou2.jpg';

    super.ngOnInit();
    this.dataService.get('api/Home')
      .subscribe(response => {
        this.productGroups = response.productGroups;
      });
  }
}