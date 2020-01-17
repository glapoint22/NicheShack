import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'margins',
  templateUrl: './margins.component.html',
  styleUrls: ['./margins.component.scss']
})
export class MarginsComponent {
  constructor(public _FormService: FormService) {}
}
