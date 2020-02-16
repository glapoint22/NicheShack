import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  
  constructor(public _FormService: FormService) { }
}