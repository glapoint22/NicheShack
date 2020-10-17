import { Component, OnInit } from '@angular/core';
import { DataService } from 'services/data.service';
import { EmailPreferences } from '../../classes/email-preferences';

@Component({
  selector: 'email-preferences',
  templateUrl: './email-preferences.component.html',
  styleUrls: ['./email-preferences.component.scss']
})
export class EmailPreferencesComponent implements OnInit {
  public preferences: EmailPreferences;
  private initialPreferences: EmailPreferences = new EmailPreferences();
  public isSaved: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.get('api/EmailPreferences')
      .subscribe((preferences: EmailPreferences) => {
        this.preferences = preferences;
        Object.keys(preferences).forEach(key => {
          this.initialPreferences[key] = preferences[key];
        });
      })
  }


  saveChanges() {
    this.dataService.put('api/EmailPreferences', this.preferences)
      .subscribe(() => {
        this.isSaved = true;
      });
  }


  unsubscibeAll() {
    let value = !this.isSubscribedToAny();

    Object.keys(this.preferences).forEach(key => {
      this.preferences[key] = value;
    });
  }

  getButtonText() {
    return this.isSubscribedToAny() ? 'Unsubscribe from all' : 'Subscribe to all';
  }

  isSubscribedToAny() {
    return Object.values(this.preferences).some(x => x == true);
  }


  isDisabled() {
    let keys: Array<string> = Object.keys(this.preferences);

    for (let i = 0; i < keys.length; i++) {
      if (this.preferences[keys[i]] != this.initialPreferences[keys[i]]) return false;
    }

    return true;
  }
}
