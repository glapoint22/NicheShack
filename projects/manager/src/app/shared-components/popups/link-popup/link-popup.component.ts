import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { Link } from '../../../classes/link';
import { fromEvent, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { LinkItem } from '../../../classes/link-item';
import { LinkOption } from 'classes/link-base';

@Component({
  selector: 'link-popup',
  templateUrl: './link-popup.component.html',
  styleUrls: ['../popup/popup.component.scss', './link-popup.component.scss',]
})
export class LinkPopupComponent extends PopupComponent implements OnInit {
  public link: Link;
  public linkOption = LinkOption;
  public apiUrl: string;
  public searchResults: Array<LinkItem>;
  private searchInput: HTMLInputElement;


  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.linkPopup = this;
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
          if (this.link.selectedOption == LinkOption.WebAddress) {
            return of();
          }

          if (this.link.optionValue == '') {
            this.clearSearchResults();
            return of();
          }

          return this.dataService.get(this.apiUrl, [{ key: 'searchWords', value: event.target.value }]);
        }))
      .subscribe((results: Array<LinkItem>) => {
        this.searchResults = results;
        this.preventNoShow = true;
      });
  }





  // -----------------------------( CLEAR SEARCH RESULTS )------------------------------ \\
  clearSearchResults() {
    if (this.searchResults) {
      this.searchResults = null;
      this.searchInput.value = '';
    }
  }







  // -----------------------------( ON RESULT CLICK )------------------------------ \\
  onResultClick(result: LinkItem) {
    this.preventNoShow = false;
    this.link.url = result.link;
    this.link.optionValue = result.name;
    this.searchResults = null;
    this.show = false;
  }





  // -----------------------------( ON OPTION CHANGE )------------------------------ \\
  onOptionChange() {
    this.link.optionValue = '';
    this.link.url = '';
    this.searchResults = null;
    this.preventNoShow = false;
  }







  // -----------------------------( ON INPUT )------------------------------ \\
  OnInput() {
    if (this.link.selectedOption == this.linkOption.WebAddress) {
      this.link.url = this.link.optionValue;
    }

  }
}