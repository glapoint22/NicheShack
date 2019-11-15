import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DataService } from 'services/data.service';
import { NavigationStart, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public loading: boolean;
  public isBrowser: boolean;

  constructor(public dataService: DataService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Set error to false on each navigation
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.dataService.error = null;
        this.dataService.loading = false;
        this.dataService.pageNotFound = false;
      }
    });
  }

  ngDoCheck() {
    this.loading = this.dataService.loading;
  }
}