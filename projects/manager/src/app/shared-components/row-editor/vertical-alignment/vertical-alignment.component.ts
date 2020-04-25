import { Component } from '@angular/core';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'vertical-alignment',
  templateUrl: './vertical-alignment.component.html',
  styleUrls: ['./vertical-alignment.component.scss']
})
export class VerticalAlignmentComponent {
  constructor(public _FormService: FormService) { }
}
