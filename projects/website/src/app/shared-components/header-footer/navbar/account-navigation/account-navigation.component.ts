import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'account-navigation',
  templateUrl: './account-navigation.component.html',
  styleUrls: ['./account-navigation.component.scss']
})
export class AccountNavigationComponent implements OnInit {
  @Input() show: boolean;

  constructor() { }

  ngOnInit() {
  }

}
