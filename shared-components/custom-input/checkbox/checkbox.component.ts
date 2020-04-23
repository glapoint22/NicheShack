import { Component, OnInit } from '@angular/core';
import { CustomInputComponent } from '../custom-input.component';

@Component({
  selector: 'checkbox',
  templateUrl: '../custom-input.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends CustomInputComponent implements OnInit {

  ngOnInit() {
    this.type = 'checkbox';
  }
}