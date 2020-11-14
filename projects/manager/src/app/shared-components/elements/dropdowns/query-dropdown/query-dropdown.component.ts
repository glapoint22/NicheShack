import { Component, Input } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'query-dropdown',
  templateUrl: './query-dropdown.component.html',
  styleUrls: ['./query-dropdown.component.scss']
})
export class QueryDropdownComponent extends DropdownComponent {
  @Input() logicalOperator: boolean;
}