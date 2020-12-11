import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from 'services/data.service';
import { PageData } from '../../classes/page-data';
import { PageContentComponent } from '../../shared-components/page-content/page-content.component';

@Component({
  selector: 'browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements AfterViewInit {
  @ViewChild('pageContent', { static: false }) pageContent: PageContentComponent;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngAfterViewInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.dataService.get('api/Pages/Browse', [{ key: 'urlId', value: params.get('id') }])
          .subscribe((pageData: PageData) => {
            this.pageContent.page.setData(pageData);
          });
      });
  }
}