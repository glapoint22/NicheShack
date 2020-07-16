import { Component, Input } from '@angular/core';
import { CategoriesWidgetComponent } from '../../designer/widgets/categories-widget/categories-widget.component';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'categories-widget-properties',
  templateUrl: './categories-widget-properties.component.html',
  styleUrls: ['./categories-widget-properties.component.scss']
})
export class CategoriesWidgetPropertiesComponent {
  @Input() categoriesWidget: CategoriesWidgetComponent;

  constructor(public pageService: PageService) { }
}
