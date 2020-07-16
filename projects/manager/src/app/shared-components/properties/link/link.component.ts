import { Component, Input, OnChanges, DoCheck, Output, EventEmitter } from '@angular/core';
import { Link } from '../../../classes/link';

@Component({
  selector: 'link-property',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnChanges, DoCheck {
  @Input() link: Link;
  @Output() onChange: EventEmitter<void> = new EventEmitter();
  private currentLink: Link = new Link();

  ngOnChanges() {
    this.setCurrentLink();
  }

  ngDoCheck() {
    if (this.currentLink.url != this.link.url ||
      this.currentLink.optionValue != this.link.optionValue ||
      this.currentLink.selectedOption != this.link.selectedOption) {
      this.setCurrentLink();
      this.onChange.emit();
    }
  }

  setCurrentLink() {
    this.currentLink.url = this.link.url;
    this.currentLink.optionValue = this.link.optionValue;
    this.currentLink.selectedOption = this.link.selectedOption;
  }
}