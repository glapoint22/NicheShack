import { Component, OnInit } from '@angular/core';
import { ValidationPageComponent } from '../validation-page/validation-page.component';

@Component({
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent extends ValidationPageComponent implements OnInit {


  ngOnInit() {
  }

}
