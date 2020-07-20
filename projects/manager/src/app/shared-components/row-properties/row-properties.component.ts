import { Component } from '@angular/core';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'row-properties',
  templateUrl: './row-properties.component.html',
  styleUrls: ['./row-properties.component.scss']
})
export class RowPropertiesComponent {

  constructor(public pageService: PageService) { }
}