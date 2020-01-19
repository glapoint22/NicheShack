import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'texts',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {

  constructor(public _FormService: FormService) { }

  

}
