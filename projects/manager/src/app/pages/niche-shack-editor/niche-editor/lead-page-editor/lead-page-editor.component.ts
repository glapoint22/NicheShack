import { Component, Input, OnChanges } from '@angular/core';
import { PageService } from 'projects/manager/src/app/services/page.service';
import { PageData } from 'projects/manager/src/app/classes/page-data';
import { PaginatorComponent } from 'projects/manager/src/app/shared-components/paginator/paginator.component';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { TempDataService } from 'projects/manager/src/app/services/temp-data.service';

@Component({
  selector: 'lead-page-editor',
  templateUrl: './lead-page-editor.component.html',
  styleUrls: ['./lead-page-editor.component.scss']
})
export class LeadPageEditorComponent implements OnChanges {
  @Input() nicheId: string;
  public view: string = 'page';
  public leadPageIds: Array<string>;
  public selectedTab: string;
  public currentLeadPageId: string;
  public initialPageLoaded: boolean;
  public leadPageUrl: string = 'api/Niches/LeadPages';
  public emailUrl: string = 'api/Niches/LeadPageEmails';

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









  // ----------------------------------------------------------------- On Page Change -----------------------------------------------------------
  onPageChange(index: number) {
    // Return if the current lead page id is the same as the next page
    if (this.currentLeadPageId == this.leadPageIds[index]) return;

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
        this.loadPage('leadPage', pageData);
      });
  }









  // -------------------------------------------------------------------- Load Email -----------------------------------------------------------
  loadEmail(leadPageId: string) {
    this.loadingService.loading = true;
    this.dataService.get(this.emailUrl, [{ key: 'leadPageId', value: leadPageId }])
      .subscribe((pageData: PageData) => {

        // Load the email
        this.loadPage('email', pageData);
      });
  }








  // -------------------------------------------------------------------- Load Page -----------------------------------------------------------
  loadPage(pageType: string, pageData: PageData) {
    this.selectedTab = pageType;
    this.pageService.setDesigner(pageType);
    this.pageService.loadPage(pageData);
    this.view = 'page';
    this.loadingService.loading = false;
  }







  // ---------------------------------------------------------------- On Lead Page Tab Click ----------------------------------------------------
  onLeadPageTabClick() {
    if (this.selectedTab == 'email') {
      // Load the current lead page
      this.loadLeadPage(this.currentLeadPageId);

    }
  }








  // ------------------------------------------------------------------- On Email Tab Click ------------------------------------------------------
  onEmailTabClick() {
    if (this.selectedTab == 'leadPage') {
      // Load the current lead page's email
      this.loadEmail(this.currentLeadPageId);
    }
  }







  // ---------------------------------------------------------------------- Add Lead Page --------------------------------------------------------
  addLeadPage(paginator: PaginatorComponent) {
    // Display the loading screen
    this.loadingService.loading = true;

    let pageData = {
      id: null,
      name: 'New Lead Page',
      width: 1600,
      background: {
        color: '#ffffff',
        image: null,
        enable: null
      },
      rows: []
    }


    this.dataService.post(this.leadPageUrl, pageData)
      .subscribe((leadPageId: string) => {
        pageData.id = leadPageId;

        // Load the lead page
        this.loadPage('leadPage', pageData);

        // Set the new page
        this.setNewPage(pageData, paginator);
      });
  }







  // --------------------------------------------------------------------- Duplicate Lead Page --------------------------------------------------------
  duplicateLeadPage(paginator: PaginatorComponent) {
    if (!this.currentLeadPageId) return;

    this.loadingService.loading = true;
    let pageData = this.pageService.getPageData();

    this.dataService.post(this.leadPageUrl, pageData)
      .subscribe((leadPageId: string) => {
        pageData.id = leadPageId;

        // Load the lead page
        this.loadPage('leadPage', pageData);

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
    paginator.currentIndex = this.leadPageIds.length - 1;
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
    this.dataService.delete(this.leadPageUrl, this.currentLeadPageId).subscribe(() => {
      // Remove this lead page id from the lead page ids array
      let index = this.leadPageIds.findIndex(x => x == this.currentLeadPageId);
      this.leadPageIds.splice(index, 1);

      // If we have any lead pages
      if (this.leadPageIds.length > 0) {
        // Set the index of the previous page
        index = Math.min(this.leadPageIds.length - 1, index);

        // Chage the page and reset the paginator
        this.onPageChange(index);
        paginator.currentIndex = index;

        // We have no pages left
      } else {
        // Reset the page to defaults
        this.pageService.clearPage();
        this.currentLeadPageId = null;
        this.loadingService.loading = false;
        this.view = 'page';
        this.pageService.widgetCursors = [];
        this.pageService.page.width = this.pageService.pageDefaultWidth;
      }
    });
  }




  // --------------------------------------------------------------------- On Save Click --------------------------------------------------------
  onSaveClick() {
    this.pageService.savePage(this.selectedTab == 'leadPage' ? this.leadPageUrl : this.emailUrl);
  }
}