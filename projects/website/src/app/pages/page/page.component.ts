import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { DataService } from 'services/data.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  template: ''
})
export class PageComponent implements OnInit, OnDestroy {
  // Properties for each page
  public title: string;
  public description: string;
  public image: string;

  // Other properties
  public facebookAppId: string = '1399604666855152';
  public domain: string;
  public share: boolean = true;
  public error: HttpErrorResponse;


  constructor(private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document,
    public dataService: DataService) { }

  ngOnInit() {
    // Title
    this.title = 'Niche Shack - ' + this.title;
    this.domain = this.document.location.protocol + '//' + this.document.location.host;

    // Title tag
    this.titleService.setTitle(this.title);

    // Description tag
    if (this.description)
      this.metaService.addTag({ name: 'description', content: this.description });

    if (this.share) {
      // Facebook
      this.metaService.addTag({ property: 'og:title', content: this.title });
      this.metaService.addTag({ property: 'og:site_name', content: 'Niche Shack' });
      this.metaService.addTag({ property: 'og:type', content: 'website' });
      this.metaService.addTag({ property: 'og:locale', content: 'en_US' });
      this.metaService.addTag({ property: 'fb:app_id', content: this.facebookAppId });
      this.metaService.addTag({ property: 'og:url', content: this.document.location.href });
      this.metaService.addTag({ property: 'og:image', content: this.domain + this.image });
      this.metaService.addTag({ property: 'og:image:width', content: '600' });
      this.metaService.addTag({ property: 'og:image:height', content: '315' });
      this.metaService.addTag({ property: 'og:description', content: this.description });

      // Twitter
      this.metaService.addTag({ name: 'twitter:card', content: 'summary' });
      this.metaService.addTag({ name: 'twitter:site', content: '@Niche_Shack' });
      this.metaService.addTag({ name: 'twitter:title', content: this.title });
      this.metaService.addTag({ name: 'twitter:description', content: this.description });
      this.metaService.addTag({ name: 'twitter:image', content: this.domain + this.image });
    }
  }
}