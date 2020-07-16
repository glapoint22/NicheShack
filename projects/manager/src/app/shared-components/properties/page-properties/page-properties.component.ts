import { Component, Input } from '@angular/core';
import { Page } from '../../../classes/page';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'page-properties',
  templateUrl: './page-properties.component.html',
  styleUrls: ['./page-properties.component.scss']
})
export class PagePropertiesComponent {
  @Input() page: Page = new Page();

  constructor(public pageService: PageService) { }
}