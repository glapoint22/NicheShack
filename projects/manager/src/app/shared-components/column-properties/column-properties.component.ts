import { Component } from '@angular/core';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'column-properties',
  templateUrl: './column-properties.component.html',
  styleUrls: ['./column-properties.component.scss']
})
export class ColumnPropertiesComponent {

  constructor(public pageService: PageService) { }
}