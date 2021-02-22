import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PageData } from '../../classes/page-data';
import { PageService } from '../../services/page.service';
import { PageContentComponent } from '../../shared-components/page-content/page-content.component';

@Component({
  selector: 'browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements AfterViewInit {
  @ViewChild('pageContent', { static: false }) pageContent: PageContentComponent;

  constructor(private pageService: PageService, private route: ActivatedRoute) { }

  ngAfterViewInit() {
    combineLatest([this.route.queryParamMap, this.route.paramMap])
      .pipe(
        // debounceTime prevents from fetching the page twice
        debounceTime(5),
      ).subscribe(() => {
        this.pageService.getPage(this.route.snapshot, 'api/Pages/Browse')
          .subscribe((pageData: PageData) => this.pageContent.page.setData(pageData));
      });
  }
}