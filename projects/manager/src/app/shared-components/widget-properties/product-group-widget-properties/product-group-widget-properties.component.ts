import { Component, Input } from '@angular/core';
import { ProductGroupWidgetComponent } from '../../designer/widgets/product-group-widget/product-group-widget.component';

@Component({
  selector: 'product-group-widget-properties',
  templateUrl: './product-group-widget-properties.component.html',
  styleUrls: ['./product-group-widget-properties.component.scss']
})
export class ProductGroupWidgetPropertiesComponent {
  @Input() productGroupWidget: ProductGroupWidgetComponent;
}