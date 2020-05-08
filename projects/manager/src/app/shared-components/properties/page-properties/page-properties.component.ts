import { Component, Input } from '@angular/core';
import { Page } from '../../../classes/page';

@Component({
  selector: 'page-properties',
  templateUrl: './page-properties.component.html',
  styleUrls: ['./page-properties.component.scss']
})
export class PagePropertiesComponent {
  @Input() page: Page = new Page();
}
