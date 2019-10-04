import { Component } from '@angular/core';
import { DropdownButtonComponent } from '../../../dropdown-button/dropdown-button.component';

@Component({
  selector: 'category-dropdown-button',
  templateUrl: '../../../dropdown-button/dropdown-button.component.html',
  styleUrls: ['../../../dropdown-button/dropdown-button.component.scss', './category-dropdown-button.component.scss']
})
export class CategoryDropdownButtonComponent extends DropdownButtonComponent {}