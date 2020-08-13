import { Component, Input, OnChanges } from '@angular/core';
import { PageService } from 'projects/manager/src/app/services/page.service';
import { PaginatorComponent } from 'projects/manager/src/app/shared-components/paginator/paginator.component';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { PropertyView } from 'projects/manager/src/app/classes/property-view';
import { PageType } from 'projects/manager/src/app/classes/page';
import { DataService } from 'services/data.service';
import { PageData } from 'projects/manager/src/app/classes/page-data';

@Component({
  selector: 'lead-page-editor',
  templateUrl: './lead-page-editor.component.html',
  styleUrls: ['./lead-page-editor.component.scss']
})
export class LeadPageEditorComponent implements OnChanges {
  @Input() nicheId: number;
  public leadPageIds: Array<number>;
  public selectedTab: PageType;
  public currentLeadPageId: number;
  public initialPageLoaded: boolean;
  public leadPageUrl: string = 'api/Niches/LeadPage';
  public emailUrl: string = 'api/Niches/LeadPageEmail';
  public propertyView = PropertyView;
  public pageType = PageType;

  constructor(public pageService: PageService,
    private loadingService: LoadingService,
    private promptService: PromptService,
    private dataService: DataService) { }


  // ----------------------------------------------------------------- Ng On Changes -----------------------------------------------------------
  ngOnChanges() {
    // Clear the lead page ids
    this.leadPageIds = [];

    // Display the loading screen
    this.loadingService.loading = true;

    this.pageService.apiUrl = this.leadPageUrl;

    // Get the lead page ids for this niche
    this.dataService.get('api/Niches/LeadPageIds', [{ key: 'nicheId', value: this.nicheId }])
      .subscribe((leadPageIds: Array<number>) => {
        // If there any lead page ids
        if (leadPageIds.length > 0) {
          this.leadPageIds = leadPageIds;
          this.currentLeadPageId = this.leadPageIds[0];

          // Load the first lead page
          this.loadLeadPage(this.currentLeadPageId);

          // There are no lead page ids
        } else {
          this.initialPageLoaded = true;
          this.loadingService.loading = false;
          this.clearPage();
        }
      });
  }



  ngAfterViewInit() {
    this.pageService.page.type = PageType.LeadPage;
    window.setTimeout(() => {
      this.pageService.designerBreakpointsDropdown.setValue(this.pageService.page.defaultWidth);
    });

  }






  // ----------------------------------------------------------------- On Page Change -----------------------------------------------------------
  onPageChange(index: number) {
    // Return if the current lead page id is the same as the next page
    if (this.currentLeadPageId == this.leadPageIds[index]) return;

    this.pageService.page.type = PageType.LeadPage;

    // Set the current lead page id and load
    this.currentLeadPageId = this.leadPageIds[index];
    this.loadLeadPage(this.currentLeadPageId);
  }










  // ----------------------------------------------------------------- Load Lead Page -----------------------------------------------------------
  loadLeadPage(leadPageId: number) {
    // Display the loading screen
    this.loadingService.loading = true;

    this.dataService.get(this.leadPageUrl, [{ key: 'leadPageId', value: leadPageId }])
      .subscribe((page: PageData) => {
        this.initialPageLoaded = true;

        // Load the lead page
        this.loadPage(PageType.LeadPage, page);
      });
  }









  // -------------------------------------------------------------------- Load Email -----------------------------------------------------------
  loadEmail(leadPageId: number) {
    this.loadingService.loading = true;
    this.dataService.get(this.emailUrl, [{ key: 'leadPageId', value: leadPageId }])
      .subscribe((page: PageData) => {

        // Load the email
        this.loadPage(PageType.Email, page);
      });
  }








  // -------------------------------------------------------------------- Load Page -----------------------------------------------------------
  loadPage(pageType: PageType, page: PageData) {
    this.selectedTab = pageType;
    this.pageService.loadPage(page);
    this.pageService.setPage(this.pageService.page.width);
    this.pageService.propertyView = PropertyView.Page;
    this.loadingService.loading = false;
  }







  // ---------------------------------------------------------------- On Lead Page Tab Click ----------------------------------------------------
  onLeadPageTabClick() {
    if (this.selectedTab == PageType.Email) {
      this.pageService.apiUrl = this.leadPageUrl;
      this.pageService.page.type = PageType.LeadPage;

      // Load the current lead page
      this.loadLeadPage(this.currentLeadPageId);

    }
  }








  // ------------------------------------------------------------------- On Email Tab Click ------------------------------------------------------
  onEmailTabClick() {
    if (this.selectedTab == PageType.LeadPage) {
      this.pageService.apiUrl = this.emailUrl;
      this.pageService.page.type = PageType.Email;

      // Load the current lead page's email
      this.loadEmail(this.currentLeadPageId);
    }
  }







  // ---------------------------------------------------------------------- Add Lead Page --------------------------------------------------------
  addLeadPage(paginator: PaginatorComponent) {
    // Display the loading screen
    this.loadingService.loading = true;


    this.dataService.get(this.leadPageUrl + '/Add', [{ key: 'nicheId', value: this.nicheId }])
      .subscribe((page: PageData) => {


        // Load the lead page
        this.loadPage(PageType.LeadPage, page);

        // Set the new page
        this.setNewPage(paginator);
      });
  }







  // --------------------------------------------------------------------- Duplicate Lead Page --------------------------------------------------------
  duplicateLeadPage(paginator: PaginatorComponent) {
    if (!this.currentLeadPageId) return;

    this.loadingService.loading = true;
    // let pageData = this.pageService.page.getData();

    this.dataService.get(this.leadPageUrl + '/Duplicate', [{ key: 'leadPageId', value: this.currentLeadPageId }])
      .subscribe((page: PageData) => {


        // Load the lead page
        this.loadPage(PageType.LeadPage, page);

        // Set the new page
        this.setNewPage(paginator);
      });
  }





  // ------------------------------------------------------------------------- Set New Page -----------------------------------------------------------
  setNewPage(paginator: PaginatorComponent) {
    // Add the new lead page id
    this.currentLeadPageId = this.pageService.page.id;
    this.leadPageIds.push(this.currentLeadPageId);

    // Set the paginator to show the new page number
    paginator.setPage(this.leadPageIds.length);
  }







  // --------------------------------------------------------------------- On Delete Click --------------------------------------------------------
  onDeleteClick(paginator: PaginatorComponent) {
    if (!this.currentLeadPageId) return;

    // Prompt the user
    let promptTitle = 'Delete Lead Page';
    let promptMessage = 'Are you sure you want to delete this lead page?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteLeadPage, this, [paginator]);
  }









  // --------------------------------------------------------------------- Delete Lead Page --------------------------------------------------------
  deleteLeadPage(paginator: PaginatorComponent) {
    // Display the loading screen
    this.loadingService.loading = true;

    // Delete the page in the database
    this.dataService.delete(this.leadPageUrl, { leadPageId: this.currentLeadPageId })
      .subscribe(() => {
        // Remove this lead page id from the lead page ids array
        let index = this.leadPageIds.findIndex(x => x == this.currentLeadPageId);
        this.leadPageIds.splice(index, 1);

        // If we have any lead pages
        if (this.leadPageIds.length > 0) {
          // Set the index of the previous page
          index = Math.min(this.leadPageIds.length - 1, index);

          // Chage the page and reset the paginator
          this.onPageChange(index);
          paginator.setPage(index + 1);

          // We have no pages left
        } else {
          this.loadingService.loading = false;

          // Reset the page to defaults
          this.clearPage();
        }
      });
  }




  // --------------------------------------------------------------------- Clear Page --------------------------------------------------------
  clearPage() {
    this.pageService.clearPage();
    this.currentLeadPageId = null;
    this.pageService.propertyView = PropertyView.Page;
    this.pageService.page.widgetCursors = [];
  }
}