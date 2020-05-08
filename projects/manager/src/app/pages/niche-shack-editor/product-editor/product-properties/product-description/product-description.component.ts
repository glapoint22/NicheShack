import { Component, ViewChild, ElementRef, ApplicationRef, AfterViewInit, Input } from '@angular/core';
import { Description } from 'projects/manager/src/app/classes/description';
import { Color } from 'projects/manager/src/app/classes/color';

@Component({
  selector: 'product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements AfterViewInit {
  @Input() text: string;
  @ViewChild('iframe', { static: false }) iframe: ElementRef;
  public description: Description;


  constructor(private applicationRef: ApplicationRef) { }


  // -----------------------------( NG AFTER VIEW INIT )------------------------------ \\
  ngAfterViewInit() {
    this.iframe.nativeElement.srcdoc = document.createElement('div').outerHTML;
    this.iframe.nativeElement.onload = (event) => {
      this.description = new Description(event.currentTarget.contentDocument, this.applicationRef, new Color(218, 218, 218, 1));
    }
  }

  ngOnChanges() {
    if (this.text) this.description.content.innerHTML = this.text;
  }
}