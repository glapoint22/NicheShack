import { Component, OnInit, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  template: ''
})
export class PageComponent implements OnInit {
  public title: string;
  public description: string;
  public image: string;
  public domain: string;

  constructor(private titleService: Title,
    public metaService: Meta,
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
  }
}