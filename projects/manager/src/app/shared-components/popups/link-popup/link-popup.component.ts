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
  public pagesUrl = 'api/Pages/Link';
  public productsUrl = 'api/Products/Link';


  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.linkPopup = this;
  }



  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);

    this.searchInput = document.getElementById('search-input') as HTMLInputElement;

    // Init link option and apiUrl
    if (!this.link.selectedOption) {
      this.link.selectedOption = this.linkOption.None;
    } else if (this.link.selectedOption == LinkOption.Page) {
      this.apiUrl = this.pagesUrl;
    } else if (this.link.selectedOption == this.linkOption.Product) {
      this.apiUrl = this.productsUrl;
    }


    // Get the items from the database when the user types in the search input
    fromEvent(this.searchInput, 'input')
      .pipe(
        debounceTime(250),
        switchMap((event: any) => {
          if (this.link.selectedOption == LinkOption.WebAddress || this.searchInput.value == '') {
            if (this.searchInput.value == '') this.reset();
            return of();
          }



          return this.dataService.get(this.apiUrl, [{ key: 'searchWords', value: event.target.value }]);
        }))
      .subscribe((results: Array<LinkItem>) => {
        this.searchResults = results;
        this.preventNoShow = true;
      });
  }








  // -----------------------------( ON RESULT CLICK )------------------------------ \\
  onResultClick(result: LinkItem) {
    this.preventNoShow = false;
    this.link.id = result.id;
    this.link.url = result.link;
    this.link.optionValue = result.name;
    this.searchResults = null;
    this.show = false;
  }





  // -----------------------------( ON OPTION CHANGE )------------------------------ \\
  reset() {
    this.link.optionValue = '';
    this.link.url = '';
    this.searchResults = null;
    this.preventNoShow = false;
    this.searchInput.value = '';
  }







  // -----------------------------( ON INPUT )------------------------------ \\
  OnInput(value: string) {
    if (this.link.selectedOption == this.linkOption.WebAddress) {
      this.link.url = value;
      this.link.optionValue = value;
    }

  }
}