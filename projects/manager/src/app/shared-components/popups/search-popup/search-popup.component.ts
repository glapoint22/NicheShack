import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { Item } from '../../../classes/item';
import { Observable, of, fromEvent } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Searchable } from '../../../classes/searchable';

@Component({
  selector: 'search-popup',
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.scss', '../popup/popup.component.scss']
})
export class SearchPopupComponent extends PopupComponent implements OnInit {
  public searchResults: Array<Item> = [];
  public searchable: Searchable;

  
  
  //                                                                 TEMP!!!!!!
  // ******************************************************************************************************************************************
  public getTempItems(type: string, url: string): Observable<Array<Item>> {
    return of([
      {
        id: 'MEO42FBKWE',
        name: 'Ice Cream'
      },
      {
        id: '5TGHYEFHNS',
        name: 'Chocolate'
      },
      {
        id: 'YW1GBJRYUS',
        name: 'Vanilla'
      },
      {
        id: 'Y2GLWTY7UH',
        name: 'Strawberry'
      },
      {
        id: 'MEO42FBKWE',
        name: 'Sundae'
      },
      {
        id: 'MEO42FBKWE',
        name: 'Ice Cream Cone'
      },
      {
        id: 'MEO42FBKWE',
        name: 'Mint Chocolate Chip'
      },
      {
        id: 'MEO42FBKWE',
        name: 'Brownie Sundae'
      },
      {
        id: 'MEO42FBKWE',
        name: 'Strawberry Shortcake'
      },
      {
        id: 'MEO42FBKWE',
        name: 'Cookies & Cream'
      },
    ])
  }
  // ******************************************************************************************************************************************





  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.searchPopup = this;
  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);
    this.searchResults = [];

    let searchInput: HTMLInputElement = document.getElementById('search-input') as HTMLInputElement;
    

    fromEvent(searchInput, 'input')
      .pipe(
        debounceTime(250),
        switchMap((event: any) => {

          // Replace with this.dataService.get(...)
          return this.getTempItems(event.target.value, this.searchable.searchUrl);
        }))
      .subscribe((results: Array<Item>) => {
        this.searchResults = results;
      });
  }

  

  // -----------------------------( ON SEARCH ITEM CLICK )------------------------------ \\
  onSearchItemClick(searchItem: Item) {
    this.searchable.setSearchItem(searchItem);
    this.popupService.searchPopup.show = false;
  }
}