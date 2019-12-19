import { Component, OnInit } from '@angular/core';
import { ValidationPageComponent } from '../validation-page/validation-page.component';

@Component({
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.scss']
})
export class ChangeNameComponent extends ValidationPageComponent implements OnInit {


  ngOnInit() {
  }

}
