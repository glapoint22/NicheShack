import { Component, OnInit, Inject } from '@angular/core';
import { ListsComponent } from '../lists/lists.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, KeyValue } from '@angular/common';
import { DataService } from 'services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PageComponent } from '../page/page.component';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: './shared-list.component.html',
  styleUrls: ['./shared-list.component.scss']
})
export class SharedListComponent extends PageComponent implements OnInit {
  public sortOptions$: Observable<any>;
  public sortOptions: Array<KeyValue<string, string>>;
  public selectedSortOption: KeyValue<string, string>;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {
    super(titleService, metaService, document);
  }

  ngOnInit() {
    super.ngOnInit();

    this.sortOptions$ = this.dataService
      .get('api/Lists/SortOptions', [{ key: 'listId', value: this.route.snapshot.params.listId }])
      .pipe(tap(sortOptions => {
        if (!sortOptions) {
          this.dataService.pageNotFound = true;
        } else {
          this.sortOptions = sortOptions.map(x => ({
            key: x.Key,
            value: x.Value
          }));

          this.setSelectedSortOption();

        }
      }));

  }

  setSelectedSortOption() {
    let index = Math.max(0, this.sortOptions.findIndex(x => x.value == this.route.snapshot.queryParams['sort']));
    this.selectedSortOption = this.sortOptions[index];
  }

  // getListData(parameters) {
  //   this.dataService
  //     .get('api/Lists/Shared', parameters)
  //     .subscribe(listData => {
  //       if (!listData) {
  //         this.dataService.pageNotFound = true;
  //       } else {
  //         if (listData.length == 0) return;
  //         if(this.listData.products) this.setSelectedSortOption();
  //         this.listData = listData;
  //       }
  //     })
  // }

}
