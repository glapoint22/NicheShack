import { Component, OnInit, Inject } from '@angular/core';
import { SharePageComponent } from '../share-page/share-page.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { DataService } from 'services/data.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent extends SharePageComponent implements OnInit {
  public listData$: Observable<any>;
  public selectedList: any = {};
  public otherLists;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { super(titleService, metaService, document) }

  ngOnInit() {
    // Set the page properties
    if (this.title == undefined) {
      this.title = 'Your Lists';
    }
    super.ngOnInit();


    this.route.queryParamMap.subscribe((queryParams: ParamMap) => {
      let parameters: Array<any> = [];

      //Set the parameters array from the query params
      for (let i = 0; i < queryParams.keys.length; i++) {
        parameters.push({ key: queryParams.keys[i], value: queryParams.get(queryParams.keys[i]) });
      }

      this.listData$ = this.dataService
        .get('api/Lists', parameters)
        .pipe(tap(listData => {
          if (!listData) {
            this.dataService.pageNotFound = true;
          } else {
            this.selectedList = listData.lists.find(x => x.selected);

            this.otherLists = listData.lists.filter(x => !x.selected).map(x => ({
              key: x.id,
              value: x.name + (x.owner != 'You' ? ' (' + x.owner +  ')' : '')
            }));


          }


        }))

    });


  }


  onListClick(list) {
    if (!list.selected) {
      this.router.navigate(['account/lists'], { queryParams: { 'listId': list.id } });
    }
  }

  // getMoveToList(lists) {
  //   return lists.filter(x => !x.selected).map(x => ({
  //     key: x.id,
  //     value: x.name + (x.owner != 'You' ? ' (' + x.owner +  ')' : '')
  //   }));
  // }

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

}
