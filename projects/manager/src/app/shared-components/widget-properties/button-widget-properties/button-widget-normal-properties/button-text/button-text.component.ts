import { Component, Input } from '@angular/core';
import { ButtonText } from 'projects/manager/src/app/classes/button-text';

@Component({
  selector: 'button-text',
  templateUrl: './button-text.component.html',
  styleUrls: ['./button-text.component.scss']
})
export class ButtonTextComponent {
  @Input() text: ButtonText;
}