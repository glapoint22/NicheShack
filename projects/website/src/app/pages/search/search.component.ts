import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from 'services/data.service';
import { PageData } from '../../classes/page-data';
import { PageContentComponent } from '../../shared-components/page-content/page-content.component';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('pageContent', { static: false }) pageContent: PageContentComponent;
  private currentSearchword: string;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngAfterViewInit() {
    this.route.queryParamMap
      .subscribe((params: ParamMap) => {
        if (params.get('search') != this.currentSearchword) {
          this.currentSearchword = params.get('search');
          this.dataService.loading = true;
          this.dataService.get('api/Pages/Search', [{key: 'searchTerm', value: params.get('search')}])
            .subscribe((pageData: PageData) => {
              this.pageContent.page.setData(pageData);
            });
        }
      });
  }
}
