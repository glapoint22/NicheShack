import { Component, Input } from '@angular/core';
import { Page } from 'projects/manager/src/app/classes/page';
import { KeyValue } from '@angular/common';
import { EmailType } from 'projects/manager/src/app/classes/email-type';

@Component({
  selector: 'email-properties',
  templateUrl: './email-properties.component.html',
  styleUrls: ['./email-properties.component.scss']
})
export class EmailPropertiesComponent {
  @Input() page: Page = new Page();
  public emailTypes: Array<KeyValue<string, number>> = [];

  ngOnInit() {
    let values = Object.values(EmailType);

    values.forEach((key: string, index: number) => {
      this.emailTypes.push({
        key: key,
        value: index
      });
    });
  }
}