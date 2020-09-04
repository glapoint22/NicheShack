import { Component, OnInit, Inject } from '@angular/core';
import { SharePageComponent } from '../share-page/share-page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, KeyValue } from '@angular/common';
import { DataService } from 'services/data.service';
import { Observable, of, merge } from 'rxjs';
import { tap, concatMap, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent extends SharePageComponent implements OnInit {
  public sortOptions: Array<KeyValue<string, string>>;
  public selectedSortOption: KeyValue<string, string>;
  public moveToLists: Array<any>;

  public lists$: Observable<any>;
  public sortOptions$: Observable<any>;
  public listData$: Observable<any>;
  public products$: Observable<any>;
  public selectedList: any;
  public showManageListMenu: boolean;
  public showListsMenu: boolean;
  public shared: boolean = false;


  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    public dataService: DataService,
    private router: Router,
    public route: ActivatedRoute
  ) { super(titleService, metaService, document) }

  ngOnInit() {
    this.init();

    this.sortOptions$ = this.dataService
      .get('api/lists/SortOptions')
      .pipe(tap((sortOptions) => {
        // This will remap the sort options to lower case
        this.sortOptions = sortOptions.map(x => ({
          key: x.Key,
          value: x.Value
        }));
      }));

    // Get products if query params have changed
    let queryParamMap$ = this.route.queryParamMap
      .pipe(concatMap(() => {
        if (this.route.snapshot.queryParamMap.get('sort')) return this.getProducts();
        return of();
      }));

    // Get products if params have changed
    let paramMap$ = this.route.paramMap
      .pipe(concatMap(() => {
        if (!this.route.snapshot.queryParamMap.get('sort')) return this.getProducts();
        return of();
      }));

    // Merge the two observables into one to retrieve the products
    this.products$ = merge(queryParamMap$, paramMap$)
      .pipe(tap(() => {
        // Set the selected sort option
        let index = Math.max(0, this.sortOptions.findIndex(x => x.value == this.route.snapshot.queryParams['sort']));
        this.selectedSortOption = this.sortOptions[index];
      }))


  }


  init() {
    let listExist$: Observable<boolean>;
    let listId = this.route.snapshot.paramMap.get('listId');

    // If there is a list id, we need to find out if it is legitimate
    if (listId) {
      listExist$ = this.dataService.get('api/lists/ListExists', [{ key: 'listId', value: listId }]);
    } else {
      listExist$ = of(true);
    }

    this.lists$ = listExist$
      .pipe(concatMap((exists) => {
        // If the id does not exists, flag page not found
        if (!exists) {
          this.dataService.pageNotFound = true;
          return of();
        }

        // retrieve all of this customer's list
        return this.dataService.get('api/lists')
          .pipe(
            tap(lists => {
              if (lists.length > 0) {
                // If there is a list id, assign that as the current list. Else, assign the first list as the current list
                this.selectedList = this.route.snapshot.paramMap.get('listId') ? lists.find(x => x.id == this.route.snapshot.paramMap.get('listId')) : lists[0];

                // Set the array of lists to move products to
                this.setMoveToLists(lists);


              }
            }));
      }));


    // Fetch the data for the current list
    this.listData$ = this.route.paramMap.pipe(concatMap(() =>
      this.dataService
        .get('api/Lists/ListData', [{ key: 'listId', value: this.selectedList.id }])
    ));

    this.title = 'Your Lists';
    super.ngOnInit();
  }



  setMoveToLists(lists: any) {
    this.moveToLists = lists.filter(x => x != this.selectedList).map(x => ({
      key: x.id,
      value: x.name + (x.owner != 'You' ? ' (' + x.owner + ')' : '')
    }));
  }




  getProducts(): Observable<any> {
    return this.dataService
      .get('api/Lists/Products', [
        { key: 'listId', value: this.selectedList.id },
        { key: 'shared', value: this.shared },
        { key: 'sort', value: this.route.snapshot.queryParamMap.get('sort') }
      ]);
  }


  onListClick(list: any, lists: Array<any>) {
    this.selectedList = list;
    this.setMoveToLists(lists);
    this.router.navigate(['account/lists', list.id]);
  }


  onBuyClick(hoplink: string) {
    window.open(hoplink, '_blank');
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
    if (listId) location.href = 'account/lists/' + listId;

  }

}
