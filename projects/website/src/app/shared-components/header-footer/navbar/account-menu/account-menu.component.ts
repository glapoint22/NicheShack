import { Component, OnInit } from '@angular/core';
import { ShowHideComponent } from '../../../show-hide/show-hide.component';

@Component({
  selector: 'account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent extends ShowHideComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
