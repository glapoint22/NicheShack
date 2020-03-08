import { Component, OnInit, ViewChild, ElementRef, ApplicationRef } from '@angular/core';
import { Description } from 'projects/manager/src/app/classes/description';
import { Color } from 'projects/manager/src/app/classes/color';
import { FormService } from 'projects/manager/src/app/services/form.service';

@Component({
  selector: 'product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {
  @ViewChild('iframe', { static: false }) iframe: ElementRef;
  public description: Description;

  constructor(public _FormService: FormService, private applicationRef: ApplicationRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.iframe.nativeElement.srcdoc = document.createElement('div').outerHTML;
    this.iframe.nativeElement.onload = (event) => {
      this.description = new Description(event.currentTarget.contentDocument, this.applicationRef, new Color(218, 218, 218, 1));
    }
  }
}