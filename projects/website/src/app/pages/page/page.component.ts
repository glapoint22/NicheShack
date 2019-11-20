import { Component, OnInit, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  template: ''
})
export class PageComponent implements OnInit {
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
    @Inject(DOCUMENT) public document: Document) { }

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

      this.setFacebookSDK();
    }
  }

  setFacebookSDK() {
    let script: HTMLScriptElement = this.document.createElement('script');
    let code: string = "window.fbAsyncInit = function() { FB.init({ appId: '"
      + this.facebookAppId + "', autoLogAppEvents : true, xfbml : true, version: 'v3.3'});};"

    script.appendChild(this.document.createTextNode(code));
    this.document.body.insertBefore(script, this.document.body.childNodes[0]);

    script = this.document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    this.document.body.insertBefore(script, this.document.body.childNodes[1]);
  }
}