import { Component, ViewChild, ElementRef, ApplicationRef, AfterViewInit, HostListener } from '@angular/core';
import { Description } from 'projects/manager/src/app/classes/description';
import { Color } from 'projects/manager/src/app/classes/color';
import { FormService } from 'projects/manager/src/app/services/form.service';

@Component({
  selector: 'product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss', '../product-editor.component.scss']
})
export class ProductDescriptionComponent implements AfterViewInit {
  public description: Description;
  @ViewChild('iframe', { static: false }) iframe: ElementRef;
  @ViewChild('fieldset', { static: false }) fieldset: ElementRef;
  constructor(public _FormService: FormService, private applicationRef: ApplicationRef) { }


  // -----------------------------( NG AFTER VIEW INIT )------------------------------ \\
  ngAfterViewInit() {
    this.iframe.nativeElement.srcdoc = document.createElement('div').outerHTML;
    this.iframe.nativeElement.onload = (event) => {
      this.description = new Description(event.currentTarget.contentDocument, this.applicationRef, new Color(218, 218, 218, 1));
      this._FormService.description = this.description;
      this.description.selectContents();
      this.description.removeSelection();

      // Set the height of the iframe
      this.setIframeHeight();
    }
  }


  // -----------------------------( HOST LISTENER )------------------------------ \\
  @HostListener('window:resize') onResize() {
    this.setIframeHeight();
  }


  // -----------------------------( SET IFRAME HEIGHT )------------------------------ \\
  setIframeHeight() {
    window.setTimeout(() => {
      let iframeTop: number = this.iframe.nativeElement.getBoundingClientRect().top;
      let fieldsetBottom: number = this.fieldset.nativeElement.getBoundingClientRect().height + this.fieldset.nativeElement.getBoundingClientRect().top;

      // Set the height of the iframe by getting the difference between the bottom of the fieldset and the top of the iframe minus the magic number
      this.iframe.nativeElement.style.height = (fieldsetBottom - iframeTop - 17) + "px";
    })
  }
}