import { Component, OnInit, Input } from '@angular/core';
import { PaginatorComponent } from 'projects/manager/src/app/shared-components/paginator/paginator.component';
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { PageService } from 'projects/manager/src/app/services/page.service';
import { PageData } from 'projects/manager/src/app/classes/page-data';
import { TempDataService } from 'projects/manager/src/app/services/temp-data.service';

@Component({
  selector: 'product-email',
  templateUrl: './product-email.component.html',
  styleUrls: ['./product-email.component.scss']
})
export class ProductEmailComponent implements OnInit {
  @Input() productId: string;
  public currentEmailId: string;
  public emailIds: Array<string> = [];
  public view: string;
  public initialPageLoaded: boolean;
  private emailUrl: string = 'api/Products/Emails';

  constructor(private promptService: PromptService,
    private loadingService: LoadingService,
    private pageService: PageService,
    private dataService: TempDataService) { }


  ngOnInit() {
    // Display the loading screen
    this.loadingService.loading = true;

    // Set the page
    window.setTimeout(() => {
      this.pageService.setDesigner('email');
      this.pageService.page.width = this.pageService.emailDefaultWidth;
    });

    // Get the email ids for this product
    this.dataService.get('api/Products/EmailIds', [{ key: 'productId', value: this.productId }])
      .subscribe((emailIds: Array<string>) => {
        // If there are any email ids
        if (emailIds.length > 0) {
          this.emailIds = emailIds;
          this.currentEmailId = this.emailIds[0];

          // Load the first email
          this.loadEmail(this.currentEmailId);

          // There are no email ids
        } else {
          this.initialPageLoaded = true;
          this.loadingService.loading = false;
        }
      });
  }


  // --------------------------------------------------------------------- On Delete Click --------------------------------------------------------
  onDeleteClick(paginator: PaginatorComponent) {
    if (!this.currentEmailId) return;

    // Prompt the user
    let promptTitle = 'Delete Email';
    let promptMessage = 'Are you sure you want to delete this email?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteEmail, this, [paginator]);
  }



  // --------------------------------------------------------------------- Delete Email --------------------------------------------------------
  deleteEmail(paginator: PaginatorComponent) {
    // Display the loading screen
    this.loadingService.loading = true;

    // Delete this email in the database
    this.dataService.delete(this.emailUrl, this.currentEmailId)
      .subscribe(() => {
        // Remove this email id from the email ids array
        let index = this.emailIds.findIndex(x => x == this.currentEmailId);
        this.emailIds.splice(index, 1);

        // If we have any emails
        if (this.emailIds.length > 0) {
          // Set the index of the previous page
          index = Math.min(this.emailIds.length - 1, index);

          // Chage the page and reset the paginator
          this.onEmailChange(index);
          paginator.setPage(index + 1);

          // We have no pages left
        } else {
          // Reset the page to defaults
          this.pageService.clearPage();
          this.currentEmailId = null;
          this.loadingService.loading = false;
          this.pageService.widgetCursors = [];
          this.pageService.page.width = this.pageService.emailDefaultWidth;
        }
      });
  }



  // ----------------------------------------------------------------- On Email Change -----------------------------------------------------------
  onEmailChange(index: number) {
    // Return if the current email id is the same as the next email
    if (this.currentEmailId == this.emailIds[index]) return;

    // Set the current email id and load
    this.currentEmailId = this.emailIds[index];
    this.loadEmail(this.currentEmailId);
  }



  // ----------------------------------------------------------------- Load Email -----------------------------------------------------------
  loadEmail(emailId: string) {
    // Display the loading screen
    this.loadingService.loading = true;

    this.dataService.get(this.emailUrl, [{ key: 'emailId', value: emailId }])
      .subscribe((pageData: PageData) => {

        // Load the email page
        this.loadPage(pageData);
      });
  }



  // -------------------------------------------------------------------- Load Page -----------------------------------------------------------
  loadPage(pageData: PageData) {
    this.pageService.loadPage(pageData);
    this.view = 'page';
    this.loadingService.loading = false;
    this.initialPageLoaded = true;
  }


  // ---------------------------------------------------------------------- Add Email --------------------------------------------------------
  addEmail(paginator: PaginatorComponent) {
    // Display the loading screen
    this.loadingService.loading = true;

    let pageData = {
      id: null,
      name: 'New Email',
      width: 600,
      background: {
        color: '#ffffff',
        image: null,
        enable: null
      },
      rows: []
    }


    this.dataService.post(this.emailUrl, pageData)
      .subscribe((leadPageId: string) => {
        pageData.id = leadPageId;
        // Load the email
        this.loadPage(pageData);

        // Set the new page
        this.setNewEmail(pageData, paginator);
      });
  }


  // ------------------------------------------------------------------------- Set New Email -----------------------------------------------------------
  setNewEmail(pageData: PageData, paginator: PaginatorComponent) {
    // Add the new email id
    this.currentEmailId = pageData.id;
    this.emailIds.push(this.currentEmailId);

    // Set the paginator to show the new page number
    paginator.setPage(this.emailIds.length);
  }


  // ------------------------------------------------------------------------ Duplicate Email --------------------------------------------------------
  duplicateEmail(paginator: PaginatorComponent) {
    if (!this.currentEmailId) return;

    this.loadingService.loading = true;
    let pageData = this.pageService.getPageData();

    this.dataService.post(this.emailUrl, pageData)
      .subscribe((leadPageId: string) => {
        pageData.id = leadPageId;

        // Load the email
        this.loadPage(pageData);

        // Set the new page
        this.setNewEmail(pageData, paginator);
      });
  }





  // --------------------------------------------------------------------- On Save Click --------------------------------------------------------
  onSaveClick() {
    this.pageService.savePage(this.emailUrl);
  }
}