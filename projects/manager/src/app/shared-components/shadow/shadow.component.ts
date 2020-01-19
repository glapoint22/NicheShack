import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'shadow',
  templateUrl: './shadow.component.html',
  styleUrls: ['./shadow.component.scss']
})
export class ShadowComponent {
  constructor(public _FormService: FormService) {}
}
