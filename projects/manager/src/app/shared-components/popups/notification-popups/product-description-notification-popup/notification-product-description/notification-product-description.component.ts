import { Component, ViewChild, ElementRef, AfterViewInit, ApplicationRef, Input } from '@angular/core';
import { Description } from 'projects/manager/src/app/classes/description';
import { Color } from 'classes/color';

@Component({
  selector: 'notification-product-description',
  templateUrl: './notification-product-description.component.html',
  styleUrls: ['./notification-product-description.component.scss']
})
export class NotificationProductDescriptionComponent implements AfterViewInit {
  @ViewChild('iframe', { static: false }) iframe: ElementRef;
  @Input() content: string;
  public description: Description;

  constructor(private applicationRef: ApplicationRef) { }

  // -----------------------------( NG AFTER VIEW INIT )------------------------------ \\
  ngAfterViewInit() {
    // Create the DIV that will hold the content and assign it to the srcDoc of the iframe
    this.iframe.nativeElement.srcdoc = document.createElement('div').outerHTML;


    // On Load of the iframe
    this.iframe.nativeElement.onload = (event) => {
      // This is the object that basically is the content
      this.description = new Description(event.currentTarget.contentDocument, this.applicationRef, new Color(218, 218, 218, 1));

      // Set the content
      this.description.content.style.overflowX = 'hidden';
      this.description.content.style.overflowY = 'auto';
      this.description.content.innerHTML = this.content;


      // Initialize
      this.description.initialize();

      window.setTimeout(() => {
        window.focus();
      });
    }
  }
}