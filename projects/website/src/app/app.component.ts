import { Component } from '@angular/core';
import { DataService } from 'services/data.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public loading: boolean

  constructor(public dataService: DataService, private router: Router) { }

  ngOnInit() {
    // Set error to false on each navigation
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.dataService.error = null;
        this.dataService.loading = false;
      }
    });
  }

  ngDoCheck() {
    this.loading = this.dataService.loading;
  }
}