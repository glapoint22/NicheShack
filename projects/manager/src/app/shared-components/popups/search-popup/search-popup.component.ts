import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { Item } from '../../../classes/item';
import { fromEvent } from 'rxjs';
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
  public searchResults: Array<Item> = [];
  public searchable: Searchable;


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
    this.searchResults = [];

    let searchInput: HTMLInputElement = document.getElementById('search-input') as HTMLInputElement;


    fromEvent(searchInput, 'input')
      .pipe(
        debounceTime(250),
        switchMap((event: any) => {
          return this.dataService.get(this.searchable.searchUrl, [{ key: 'search', value: event.target.value }]);
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