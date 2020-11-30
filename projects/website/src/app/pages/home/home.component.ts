import { Component, OnInit, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { DataService } from 'services/data.service';
import { SharePageComponent } from '../share-page/share-page.component';
import { PageData } from '../../classes/page-data';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends SharePageComponent implements OnInit {
  public pageData: PageData;

  constructor(titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    private dataService: DataService) {
    super(titleService, metaService, document);
  }

  ngOnInit() {
    this.title = 'What\'s your niche?';
    this.description = 'Online shopping from the largest affiliate marketing site on the planet, promoting items from thousands of companies and individuals.';
    // this.image = '/Images/tlou2.jpg';

    super.ngOnInit();

    this.dataService.get('api/Home')
      .subscribe((pageData: PageData) => {
        this.pageData = pageData;
      });
  }
}