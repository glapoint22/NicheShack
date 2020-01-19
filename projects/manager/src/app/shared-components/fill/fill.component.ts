import { Component} from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'fill',
  templateUrl: './fill.component.html',
  styleUrls: ['./fill.component.scss'],
})
export class FillComponent {
  constructor(public _FormService: FormService) {}
}