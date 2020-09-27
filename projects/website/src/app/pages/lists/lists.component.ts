import { Component, OnInit, Inject } from '@angular/core';
import { SharePageComponent } from '../share-page/share-page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, KeyValue } from '@angular/common';
import { DataService } from 'services/data.service';
import { Observable, of, merge } from 'rxjs';
import { tap, concatMap, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { PromptService } from 'services/prompt.service';

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
  private lists: any;


  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    public dataService: DataService,
    private router: Router,
    public route: ActivatedRoute,
    private promptService: PromptService
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
                this.lists = lists;

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
    if (this.selectedList.id != list.id) {
      this.selectedList = list;
      this.setMoveToLists(lists);
      this.router.navigate(['account/lists', list.id]);
    }

  }


  onBuyClick(hoplink: string) {
    window.open(hoplink, '_blank');
  }



  onRemoveProductClick(product: any) {
    // Prompt the user
    let promptTitle = 'Remove Product';
    let promptMessage = 'Are you sure you want to remove this product from this list?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.removeProduct, this, [product]);
  }


  removeProduct(product: any) {
    this.dataService.delete('api/Lists/Product', { productId: product.id, collaboratorId: product.collaborator.id })
      .subscribe(() => {
        product.removed = true;
        this.selectedList.totalItems--;
      });

  }


  onMoveProductClick(list: any, product: any) {
    // Prompt the user
    let promptTitle = 'Move Product';
    let promptMessage = 'Are you sure you want to move this product from ' + this.selectedList.name + ' to ' + list.value + '?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.moveProduct, this, [list, product]);
  }

  moveProduct(list: any, product: any) {
    this.dataService.put('api/Lists/Product', {
      productId: product.id,
      collaboratorId: product.collaborator.id,
      listId: list.key
    }).subscribe(() => {
      product.removed = true;
      this.selectedList.totalItems--;
      this.lists.filter(x => x.id == list.key)[0].totalItems++;
    });
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


  onDeleteListClick() {
    // Prompt the user
    let promptTitle = 'Delete List';
    let promptMessage = 'Are you sure you want to delete this list?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteList, this);
  }


  deleteList() {
    this.dataService.delete('api/Lists', {
      listId: this.selectedList.id
    }).subscribe(() => {
      location.href = 'account/lists';
    });
  }

}
