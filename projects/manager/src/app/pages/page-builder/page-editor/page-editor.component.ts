import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../services/page.service';
import { PageData } from '../../../classes/page-data';
import { LoadingService } from '../../../services/loading.service';
import { PromptService } from '../../../services/prompt.service';
import { PopupService } from '../../../services/popup.service';
import { Searchable } from '../../../classes/searchable';
import { TempDataService } from '../../../services/temp-data.service';
import { Item } from '../../../classes/item';
import { PropertyView } from '../../../classes/property-view';
import { PageType } from '../../../classes/page';

@Component({
  selector: 'page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit, Searchable {
  public currentPageId: string;
  public apiUrl: string;
  public searchResults: Array<Item>;
  public items: Array<Item>;
  public pageType: PageType;
  public PageType = PageType;
  public propertyView = PropertyView;

  constructor(public pageService: PageService,
    private loadingService: LoadingService,
    public promptService: PromptService,
    private popupService: PopupService,
    private dataService: TempDataService) { }


  // ---------------------------------------------------------------------- Ng On Init --------------------------------------------------------
  ngOnInit() {
    this.apiUrl = 'api/Pages';
    this.pageType = PageType.Page;
    this.setPageView();
  }



  // ---------------------------------------------------------------------- Ng After View Init --------------------------------------------------------
  ngAfterViewInit() {
    window.setTimeout(() => {
      this.pageService.designerBreakpointsDropdown.setValue(this.pageService.page.defaultWidth);
    });
  }




  // ---------------------------------------------------------------------- Set Page View --------------------------------------------------------
  setPageView() {
    this.pageService.propertyView = PropertyView.Page;
    this.pageService.page.type = this.pageType;
  }



  // ---------------------------------------------------------------------- Add Page --------------------------------------------------------
  addPage() {
    // Display the loading screen
    this.loadingService.loading = true;


    this.dataService.get(this.apiUrl + '/Create')
      .subscribe((pageData: PageData) => {
        this.loadPage(pageData);
      });
  }



  // -------------------------------------------------------------------- Load Page -----------------------------------------------------------
  loadPage(pageData: PageData) {
    this.pageService.setPage(pageData.width);
    this.pageService.loadPage(pageData);
    this.setPageView();
    this.loadingService.loading = false;
    this.currentPageId = pageData.id;
  }




  // --------------------------------------------------------------------- Duplicate Page --------------------------------------------------------
  duplicatePage() {
    if (!this.currentPageId) return;

    this.loadingService.loading = true;

    let pageData = this.pageService.page.getData();

    this.dataService.post(this.apiUrl, pageData)
      .subscribe((pageId: string) => {

        pageData.id = pageId;

        // Load the page
        this.loadPage(pageData);
      });
  }






  // --------------------------------------------------------------------- On Delete Click --------------------------------------------------------
  onDeleteClick() {
    if (!this.currentPageId) return;

    // Prompt the user
    let promptTitle = 'Delete Page';
    let promptMessage = 'Are you sure you want to delete this page?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.deletePage, this);
  }






  // --------------------------------------------------------------------- Delete Page --------------------------------------------------------
  deletePage() {
    // Display the loading screen
    this.loadingService.loading = true;

    // Delete the page in the database
    this.dataService.delete(this.apiUrl, this.currentPageId)
      .subscribe(() => {
        this.pageService.clearPage();
        this.currentPageId = null;
        this.loadingService.loading = false;
        this.setPageView();
        this.pageService.page.widgetCursors = [];
        this.pageService.designerBreakpointsDropdown.setValue(this.pageService.page.defaultWidth);
      });
  }


  // ---------------------------------------------------------------- On Page Search Click --------------------------------------------------------
  onPageSearchClick(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.searchPopup.searchable = this;
    this.popupService.searchPopup.show = !this.popupService.searchPopup.show;
  }




  // ---------------------------------------------------------------- Set Search Item --------------------------------------------------------
  setSearchItem(searchItem: Item): void {
    this.loadingService.loading = true;

    this.dataService.get(this.apiUrl, [{ key: 'id', value: searchItem.id }])
      .subscribe((pageData: PageData) => {

        // Load the lead page
        this.loadPage(pageData);
      });
  }
}