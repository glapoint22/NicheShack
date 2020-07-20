import { Component } from '@angular/core';
import { KeyValue } from '@angular/common';
import { EmailType } from 'projects/manager/src/app/classes/email-type';
import { PagePropertiesComponent } from 'projects/manager/src/app/shared-components/properties/page-properties/page-properties.component';

@Component({
  selector: 'email-properties',
  templateUrl: './email-properties.component.html',
  styleUrls: ['./email-properties.component.scss']
})
export class EmailPropertiesComponent extends PagePropertiesComponent {
  public emailTypes: Array<KeyValue<string, number>> = [];

  ngOnInit() {
    // This get the values from the EmailType enum
    let values = Object.values(EmailType);

    // Generate the email types for the dropdown list
    values.forEach((key: string, index: number) => {
      this.emailTypes.push({
        key: key,
        value: index
      });
    });
  }
}