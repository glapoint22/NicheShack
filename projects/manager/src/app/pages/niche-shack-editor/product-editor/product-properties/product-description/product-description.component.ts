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
    this.iframe.nativeElement.srcdoc = document.createElement('div').outerHTML;
    this.iframe.nativeElement.onload = (event) => {
      this.description = new Description(event.currentTarget.contentDocument, this.applicationRef, new Color(218, 218, 218, 1));

      if (this.productService.product.description) {
        this.description.content.innerHTML = this.productService.product.description;
        this.iframe.nativeElement.style.height = this.description.getContentHeight() + 'px';

        this.description.selectContents();
        this.description.removeSelection();
        this.productService.product.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.description.content.innerHTML);
        window.setTimeout(() => {
          this.panel.onContentLoad();
        });

      }

      this.description.onChange.subscribe(() => {
        this.productService.product.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.description.content.innerHTML);

        this.iframe.nativeElement.style.height = Math.max(18, this.description.getContentHeight()) + 'px';
        this.panel.onContentLoad();

      });
    }
  }
}