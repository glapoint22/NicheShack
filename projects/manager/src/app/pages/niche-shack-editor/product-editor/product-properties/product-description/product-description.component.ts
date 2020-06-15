import { Component, ViewChild, ElementRef, ApplicationRef, AfterViewInit, Input } from '@angular/core';
import { Description } from 'projects/manager/src/app/classes/description';
import { Color } from 'projects/manager/src/app/classes/color';
import { PanelComponent } from 'projects/manager/src/app/shared-components/panels/panel/panel.component';
import { ProductService } from 'projects/manager/src/app/services/product.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements AfterViewInit {
  @ViewChild('iframe', { static: false }) iframe: ElementRef;
  @ViewChild('panel', { static: false }) panel: PanelComponent;
  public description: Description;


  constructor(private applicationRef: ApplicationRef, private productService: ProductService, private sanitizer: DomSanitizer) { }


  // -----------------------------( NG AFTER VIEW INIT )------------------------------ \\
  ngAfterViewInit() {
    // Create the DIV that will hold the content and assign it to the srcDoc of the iframe
    this.iframe.nativeElement.srcdoc = document.createElement('div').outerHTML;


    // On Load of the iframe
    this.iframe.nativeElement.onload = (event) => {
      // This is the object that basically is the content
      this.description = new Description(event.currentTarget.contentDocument, this.applicationRef, new Color(218, 218, 218, 1));


      // If we have text
      if (this.productService.product.description) {
        this.description.content.innerHTML = this.productService.product.description;


        // Initialize
        this.description.initialize();

        // This will display the description in the product info window
        this.productService.product.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.description.content.innerHTML);
      }


      // Set the height of the iframe and panel
      this.setIframeHeight();

      window.setTimeout(() => {
        this.panel.onContentLoad();
      });


      // Update the description in the product info window and update the height of the iframe and panel
      this.description.onChange.subscribe(() => {
        this.productService.product.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.description.content.innerHTML);

        this.setIframeHeight();
        this.panel.onContentLoad();
      });
    }
  }




  // -----------------------------( SET IFRAME HEIGHT )------------------------------ \\
  setIframeHeight() {
    this.iframe.nativeElement.style.height = Math.max(64, this.description.getContentHeight()) + 'px';
  }
}