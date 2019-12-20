import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  public hue: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
