import { Component, OnInit, Inject } from '@angular/core';
import { SharePageComponent } from '../share-page/share-page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, KeyValue } from '@angular/common';
import { DataService } from 'services/data.service';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent extends SharePageComponent implements OnInit {
  public sortOptions$: Observable<any>;
  public selectedList: any = {};
  public otherLists;
  public listData: any = {};
  public sortOptions: Array<KeyValue<string, string>>;
  public selectedSortOption: KeyValue<string, string>;



  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { super(titleService, metaService, document) }

  ngOnInit() {
    let parameters: Array<any> = [];

    // Set the page properties
    if (this.title == undefined) {
      this.title = 'Your Lists';
    }
    super.ngOnInit();

    if (this.route.snapshot.queryParams.listId) {
      parameters = [{ key: 'listId', value: this.route.snapshot.queryParams.listId }];
    }

    this.sortOptions$ = this.dataService
      .get('api/Lists/SortOptions', parameters)
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

    this.route.queryParamMap.subscribe((queryParams: ParamMap) => {
      parameters = [];

      //Set the parameters array from the query params
      for (let i = 0; i < queryParams.keys.length; i++) {
        parameters.push({ key: queryParams.keys[i], value: queryParams.get(queryParams.keys[i]) });
      }

      this.dataService
        .get('api/Lists', parameters)
        .subscribe(listData => {
          if (!listData) {
            this.dataService.pageNotFound = true;
          } else {
            if(listData.length == 0) return;

            if (this.listData.lists) this.setSelectedSortOption();


            this.listData = listData;


            this.selectedList = listData.lists.find(x => x.selected);

            this.otherLists = listData.lists.filter(x => !x.selected).map(x => ({
              key: x.id,
              value: x.name + (x.owner != 'You' ? ' (' + x.owner + ')' : '')
            }));


          }


        })

    });


  }


  setSelectedSortOption() {
    let index = Math.max(0, this.sortOptions.findIndex(x => x.value == this.route.snapshot.queryParams['sort']));
    this.selectedSortOption = this.sortOptions[index];
  }


  onListClick(list) {
    if (!list.selected) {
      this.router.navigate(['account/lists'], { queryParams: { 'listId': list.id } });
    }
  }


  onBuyClick(hoplink: string) {
    window.location.href = hoplink;
  }


  onDelete(product: any) {
    product.deleted = true;
  }

  onMoveProduct(list: any, product: any) {
    product.movedToList = list.value;

    // Update database!
  }


  undo(action: string, product: any) {
    if (action == 'deleted') {
      product.deleted = false;
      // Update database
    } else {
      product.movedToList = null;
      // Update database
    }
  }

  setSort() {
    this.router.navigate([], {
      queryParams: { sort: this.selectedSortOption.value, page: null },
      queryParamsHandling: 'merge'
    });
  }

  onCreateListHide(listId: string) {
    if(listId) {
      this.router.navigate(['account', 'lists'], {queryParams: { listId: listId }});
    }
  }

}
