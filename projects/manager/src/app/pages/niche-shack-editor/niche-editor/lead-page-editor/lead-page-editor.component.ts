import { Component, Input, OnChanges } from '@angular/core';
import { PageService } from 'projects/manager/src/app/services/page.service';
import { PageData } from 'projects/manager/src/app/classes/page-data';
import { PaginatorComponent } from 'projects/manager/src/app/shared-components/paginator/paginator.component';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { TempDataService } from 'projects/manager/src/app/services/temp-data.service';
import { PropertyView } from 'projects/manager/src/app/classes/property-view';
import { PageType } from 'projects/manager/src/app/classes/page';

@Component({
  selector: 'lead-page-editor',
  templateUrl: './lead-page-editor.component.html',
  styleUrls: ['./lead-page-editor.component.scss']
})
export class LeadPageEditorComponent implements OnChanges {
  @Input() nicheId: string;
  public leadPageIds: Array<string>;
  public selectedTab: PageType;
  public currentLeadPageId: string;
  public initialPageLoaded: boolean;
  public leadPageUrl: string = 'api/Niches/LeadPages';
  public emailUrl: string = 'api/Niches/LeadPageEmails';
  public propertyView = PropertyView;
  public pageType = PageType;

  constructor(public pageService: PageService,
    private loadingService: LoadingService,
    private promptService: PromptService,
    private dataService: TempDataService) { }


  // ----------------------------------------------------------------- Ng On Changes -----------------------------------------------------------
  ngOnChanges() {
    // Clear the lead page ids
    this.leadPageIds = [];

    // Display the loading screen
    this.loadingService.loading = true;

    this.pageService.apiUrl = this.leadPageUrl;

    // Get the lead page ids for this niche
    this.dataService.get('api/Niches/LeadPageIds', [{ key: 'nicheId', value: this.nicheId }])
      .subscribe((leadPageIds: Array<string>) => {
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
        }
      });
  }



  ngAfterViewInit() {
    this.pageService.page.type = PageType.LeadPage;
    window.setTimeout(()=> {
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
  loadLeadPage(leadPageId: string) {
    // Display the loading screen
    this.loadingService.loading = true;

    this.dataService.get(this.leadPageUrl, [{ key: 'leadPageId', value: leadPageId }])
      .subscribe((pageData: PageData) => {
        this.initialPageLoaded = true;

        // Load the lead page
        this.loadPage(PageType.LeadPage, pageData);
      });
  }









  // -------------------------------------------------------------------- Load Email -----------------------------------------------------------
  loadEmail(leadPageId: string) {
    this.loadingService.loading = true;
    this.dataService.get(this.emailUrl, [{ key: 'leadPageId', value: leadPageId }])
      .subscribe((pageData: PageData) => {

        // Load the email
        this.loadPage(PageType.Email, pageData);
      });
  }








  // -------------------------------------------------------------------- Load Page -----------------------------------------------------------
  loadPage(pageType: PageType, pageData: PageData) {
    this.selectedTab = pageType;
    this.pageService.setPage(pageData.width);
    this.pageService.loadPage(pageData);
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


    this.dataService.get(this.leadPageUrl + '/Create')
      .subscribe((pageData: PageData) => {


        // Load the lead page
        this.loadPage(PageType.LeadPage, pageData);

        // Set the new page
        this.setNewPage(pageData, paginator);
      });
  }







  // --------------------------------------------------------------------- Duplicate Lead Page --------------------------------------------------------
  duplicateLeadPage(paginator: PaginatorComponent) {
    if (!this.currentLeadPageId) return;

    this.loadingService.loading = true;
    let pageData = this.pageService.page.getData();

    this.dataService.post(this.leadPageUrl, pageData)
      .subscribe((leadPageId: string) => {
        pageData.id = leadPageId;

        // Load the lead page
        this.loadPage(PageType.LeadPage, pageData);

        // Set the new page
        this.setNewPage(pageData, paginator);
      });
  }





  // ------------------------------------------------------------------------- Set New Page -----------------------------------------------------------
  setNewPage(pageData: PageData, paginator: PaginatorComponent) {
    // Add the new lead page id
    this.currentLeadPageId = pageData.id;
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
    this.dataService.delete(this.leadPageUrl, this.currentLeadPageId)
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
          // Reset the page to defaults
          this.pageService.clearPage();
          this.currentLeadPageId = null;
          this.loadingService.loading = false;
          this.pageService.propertyView = PropertyView.Page;
          this.pageService.page.widgetCursors = [];
        }
      });
  }
}