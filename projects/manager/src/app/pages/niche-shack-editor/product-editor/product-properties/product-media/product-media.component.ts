import { Component, Input, ViewChild, OnChanges } from '@angular/core';
import { ProductMedia } from 'projects/manager/src/app/classes/product-media';
import { PanelComponent } from 'projects/manager/src/app/shared-components/panels/panel/panel.component';

@Component({
  selector: 'product-media',
  templateUrl: './product-media.component.html',
  styleUrls: ['./product-media.component.scss']
})
export class ProductMediaComponent implements OnChanges {
  @Input() media: Array<ProductMedia>;
  @ViewChild('panel', { static: false }) panel: PanelComponent;
  public currentIndex: number = 0;

  ngOnChanges() {
    if(this.media.length > 0) {
      window.setTimeout(()=> {
        this.panel.onContentLoad();
      });
    }
  }
}