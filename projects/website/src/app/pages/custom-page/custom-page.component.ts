import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PageData } from '../../classes/page-data';
import { PageService } from '../../services/page.service';
import { PageContentComponent } from '../../shared-components/page-content/page-content.component';

@Component({
  selector: 'custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss']
})
export class CustomPageComponent implements AfterViewInit {
  @ViewChild('pageContent', { static: false }) pageContent: PageContentComponent;

  constructor(private route: ActivatedRoute, private pageService: PageService) { }

  ngAfterViewInit() {
    combineLatest([this.route.queryParamMap, this.route.paramMap])
      .pipe(
        // debounceTime prevents from fetching the page twice
        debounceTime(5),
      ).subscribe(() => {
        this.pageService.getPage(this.route.snapshot, 'api/Pages')
          .subscribe((pageData: PageData) => this.pageContent.page.setData(pageData));
      });
  }
}