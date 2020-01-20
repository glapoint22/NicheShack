import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'alignment',
  templateUrl: './alignment.component.html',
  styleUrls: ['./alignment.component.scss']
})
export class AlignmentComponent {
  constructor(public _FormService: FormService) { }
}
