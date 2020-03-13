import { Component, OnInit, Input } from '@angular/core';
import { Link } from '../../classes/link';

@Component({
  selector: 'links',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
  @Input() source: any;
  public link: Link;
  public currentLink: Link = new Link();
  public enableRemove: boolean;
  public options = [];

  ngOnInit() {
    this.options = [
      'Page',
      'Category',
      'Niche',
      'Product',
      'Web Address'
    ];

    this.link = this.source.link;

    this.setCurrentLink();
  }

  applyLink() {
    if (!this.applyDisabled()) {
      this.setCurrentLink();
      this.source.applyLink();
    }
  }

  ngDoCheck() {
    if (this.link.linkDataChanged) {
      this.enableRemove = false;
      this.link.linkDataChanged = false;
      this.setCurrentLink();

      if (this.currentLink.url != '' && this.currentLink.selectedOption != '' && !this.link.disabled) {
        this.enableRemove = true;
      }
    }
  }

  setCurrentLink() {
    this.currentLink.selectedOption = this.link.selectedOption;
    this.currentLink.url = this.link.url;
  }

  applyDisabled(): boolean {
    return (this.link.disabled || this.link.selectedOption == '' || this.link.url == '' ||
      (this.link.selectedOption == this.currentLink.selectedOption && this.link.url == this.currentLink.url));
  }
}