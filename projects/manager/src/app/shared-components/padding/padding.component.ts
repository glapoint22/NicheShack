import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'padding',
  templateUrl: './padding.component.html',
  styleUrls: ['./padding.component.scss']
})
export class PaddingComponent {
  constructor(public _FormService: FormService) {}
}
