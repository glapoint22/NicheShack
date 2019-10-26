import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page/page.component';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends PageComponent implements OnInit {

  ngOnInit() {
    this.title = 'Your Account';
    this.share = false;
    super.ngOnInit();
  }
}