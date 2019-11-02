import { Component, OnInit } from '@angular/core';
import { CustomInputComponent } from '../custom-input.component';

@Component({
  selector: 'radio-button',
  templateUrl: '../custom-input.component.html',
  styleUrls: ['../custom-input.component.scss']
})
export class RadioButtonComponent extends CustomInputComponent implements OnInit {

  ngOnInit() {
    this.type = 'radio';
  }

}
