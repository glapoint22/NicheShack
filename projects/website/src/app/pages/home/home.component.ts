import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { DataService } from 'services/data.service';
import { SharePageComponent } from '../share-page/share-page.component';
import { PageData } from '../../classes/page-data';
import { PageContentComponent } from '../../shared-components/page-content/page-content.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends SharePageComponent implements OnInit, AfterViewInit {
  @ViewChild('pageContent', { static: false }) pageContent: PageContentComponent;

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

    this.dataService.loading = true;
  }


  ngAfterViewInit() {
    this.dataService.get('api/Home')
      .subscribe((pageData: PageData) => {
        this.pageContent.page.setData(pageData);
        this.dataService.loading = false;
      });
  }
}