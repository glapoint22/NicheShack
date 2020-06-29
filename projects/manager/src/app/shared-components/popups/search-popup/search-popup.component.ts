import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { Item } from '../../../classes/item';
import { fromEvent, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Searchable } from '../../../classes/searchable';
import { PopupService } from '../../../services/popup.service';
import { CoverService } from '../../../services/cover.service';
import { MenuService } from '../../../services/menu.service';
import { DropdownMenuService } from '../../../services/dropdown-menu.service';
import { TempDataService } from '../../../services/temp-data.service';

@Component({
  selector: 'search-popup',
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.scss', '../popup/popup.component.scss']
})
export class SearchPopupComponent extends PopupComponent implements OnInit {
  public searchable: Searchable;
  private searchInput: HTMLInputElement;
  private searchValue: string;


  constructor(
    popupService: PopupService,
    cover: CoverService,
    menuService: MenuService,
    dropdownMenuService: DropdownMenuService,
    dataService: TempDataService
  ) { super(popupService, cover, menuService, dropdownMenuService, dataService) }



  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.searchPopup = this;
  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);

    this.searchInput = document.getElementById('search-input') as HTMLInputElement;


    // Get the items from the database when the user types in the search input
    fromEvent(this.searchInput, 'input')
      .pipe(
        debounceTime(250),
        switchMap((event: any) => {
          if (this.searchValue == '') {
            this.clearSearchResults();
            return of();
          }

          return this.dataService.get(this.searchable.apiUrl + '/Search', [{ key: 'search', value: event.target.value }]);
        }))
      .subscribe((results: Array<Item>) => {
        this.searchable.searchResults = results;
      });



    // Get the items from the database when the popup opens
    if (!this.searchable.searchResults) {
      this.dataService.get(this.searchable.apiUrl)
        .subscribe((items: Array<Item>) => {
          this.searchable.items = items;
        });
    }
  }



  // -----------------------------( CLEAR SEARCH RESULTS )------------------------------ \\
  clearSearchResults() {
    this.searchable.searchResults = null;
    this.searchInput.value = '';
    this.searchValue = '';
  }



  // -----------------------------( ON SEARCH ITEM CLICK )------------------------------ \\
  onItemClick(item: Item) {
    this.searchable.setSearchItem(item);
    this.popupService.searchPopup.show = false;
  }
}