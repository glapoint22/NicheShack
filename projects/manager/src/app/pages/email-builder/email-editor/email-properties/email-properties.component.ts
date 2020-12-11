import { Component } from '@angular/core';
import { KeyValue } from '@angular/common';
import { PagePropertiesComponent } from 'projects/manager/src/app/shared-components/properties/page-properties/page-properties.component';
import { PageService } from 'projects/manager/src/app/services/page.service';
import { DataService } from 'services/data.service';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { PromptService } from 'services/prompt.service';

@Component({
  selector: 'email-properties',
  templateUrl: './email-properties.component.html',
  styleUrls: ['./email-properties.component.scss']
})
export class EmailPropertiesComponent extends PagePropertiesComponent {
  public emailTypes: Array<KeyValue<string, string>> = [];

  constructor(pageService: PageService, promptService: PromptService, dataService: DataService, popupService: PopupService) { super(pageService, promptService, dataService, popupService) }

  ngOnInit() {
    // Populate the email types
    this.dataService.get('api/Emails/EmailTypes')
      .subscribe((emailTypes: Array<string>) => {
        emailTypes.forEach((emailType: string) => {
          this.emailTypes.push({
            key: emailType.replace(/([A-Z])/g, ' $1').trim(),
            value: emailType
          });
        });
      });
  }


  getIndex(emailType: string) {
    return this.emailTypes.findIndex(x => x.key == emailType);
  }


  onEmailTypeChange(emailType: string) {
    this.page.name = emailType.replace(/([A-Z])/g, ' $1').trim();
    this.pageService.save();
  }
}