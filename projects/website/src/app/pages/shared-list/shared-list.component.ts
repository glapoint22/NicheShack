import { Component, OnInit, Inject } from '@angular/core';
import { ListsComponent } from '../lists/lists.component';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { DataService } from 'services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PageComponent } from '../page/page.component';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: './shared-list.component.html',
  styleUrls: ['./shared-list.component.scss']
})
export class SharedListComponent extends ListsComponent implements OnInit {
  public listOwner$: Observable<string>;
  public products$: Observable<any>;

  constructor(
    titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    dataService: DataService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(titleService, metaService, document, dataService, router, route);
  }

  ngOnInit() {
    this.selectedList = { id: this.route.snapshot.paramMap.get('listId') }
    super.ngOnInit();
  }


  init() {
    this.listOwner$ = this.dataService
      .get('api/lists/ListOwner', [{ key: 'listId', value: this.route.snapshot.paramMap.get('listId') }], 'text')
      .pipe(tap((listOwner: string) => {
        if (!listOwner) {
          this.dataService.pageNotFound = true;
        } else {
          this.title = listOwner + '\'s List';

          // Call Page Component's NgOnInit
          PageComponent.prototype.ngOnInit.call(this);
        }
      }));
  }
}