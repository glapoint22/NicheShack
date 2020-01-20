import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'optional-fill',
  templateUrl: './optional-fill.component.html',
  styleUrls: ['./optional-fill.component.scss']
})
export class OptionalFillComponent {
  constructor(public _FormService: FormService) {}
}
