import { Component } from '@angular/core';
import { PageService } from '../../../services/page.service';
import { PageData } from '../../../classes/page-data';
import { LoadingService } from '../../../services/loading.service';
import { PromptService } from '../../../services/prompt.service';
import { PopupService } from '../../../services/popup.service';
import { Searchable } from '../../../classes/searchable';
import { TempDataService } from '../../../services/temp-data.service';

@Component({
  selector: 'page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements Searchable {
  public view: string = 'page';
  public currentPageId: string;
  public searchUrl: string;

  constructor(public pageService: PageService,
    private loadingService: LoadingService,
    private promptService: PromptService,
    private popupService: PopupService,
    private dataService: TempDataService) { }


  // ---------------------------------------------------------------------- Add Page --------------------------------------------------------
  addPage() {
    // Display the loading screen
    this.loadingService.loading = true;


    this.dataService.get('api/Pages/Create')
      .subscribe((pageData: PageData) => {
        this.loadPage(pageData);
      });
  }



  // -------------------------------------------------------------------- Load Page -----------------------------------------------------------
  loadPage(pageData: PageData) {
    this.pageService.setDesigner('page');
    this.pageService.loadPage(pageData);
    this.view = 'page';
    this.loadingService.loading = false;
    this.currentPageId = pageData.id;
  }




  // --------------------------------------------------------------------- Duplicate Page --------------------------------------------------------
  duplicatePage() {
    if (!this.currentPageId) return;

    this.loadingService.loading = true;

    let pageData = this.pageService.getPageData();

    this.dataService.post('api/Pages', pageData)
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
    this.dataService.delete('api/Pages', this.currentPageId)
      .subscribe(() => {
        this.pageService.clearPage();
        this.currentPageId = null;
        this.loadingService.loading = false;
        this.view = 'page';
        this.pageService.widgetCursors = [];
        this.pageService.page.width = 1600;
      });
  }


  // ---------------------------------------------------------------- On Page Search Click --------------------------------------------------------
  onPageSearchClick(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.searchPopup.searchable = this;
    this.popupService.searchPopup.show = !this.popupService.searchPopup.show;
  }




  // ---------------------------------------------------------------- Set Search Item --------------------------------------------------------
  setSearchItem(searchItem: any): void {

  }
}