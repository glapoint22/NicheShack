import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { PageService } from 'projects/manager/src/app/services/page.service';
import { PageType } from 'projects/manager/src/app/classes/page';
import { PropertyView } from 'projects/manager/src/app/classes/property-view';
import { PageData } from 'projects/manager/src/app/classes/page-data';
import { DataService } from 'services/data.service';
import { PromptService } from 'services/prompt.service';
import { CounterComponent } from 'projects/manager/src/app/shared-components/counter/counter.component';

@Component({
  selector: 'product-email',
  templateUrl: './product-email.component.html',
  styleUrls: ['./product-email.component.scss']
})
export class ProductEmailComponent implements OnInit {
  @Input() productId: number;
  public currentEmailId: number;
  public emailIds: Array<number> = [];
  public propertyView = PropertyView;
  public initialPageLoaded: boolean;
  private emailUrl: string = 'api/Products/Email';

  constructor(private promptService: PromptService,
    private loadingService: LoadingService,
    public pageService: PageService,
    private dataService: DataService) { }


  ngOnInit() {
    // Display the loading screen
    this.loadingService.loading = true;

    this.pageService.apiUrl = this.emailUrl;

    // Get the email ids for this product
    this.dataService.get('api/Products/EmailIds', [{ key: 'productId', value: this.productId }])
      .subscribe((emailIds: Array<number>) => {
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


  ngAfterViewInit() {
    this.pageService.page.type = PageType.Email;
    window.setTimeout(() => {
      this.pageService.designerBreakpointsDropdown.setValue(this.pageService.page.defaultWidth);
    });
  }


  // --------------------------------------------------------------------- On Delete Click --------------------------------------------------------
  onDeleteClick(counter: CounterComponent) {
    if (!this.currentEmailId) return;

    // Prompt the user
    let promptTitle = 'Delete Email';
    let promptMessage = 'Are you sure you want to delete this email?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteEmail, this, [counter]);
  }



  // --------------------------------------------------------------------- Delete Email --------------------------------------------------------
  deleteEmail(counter: CounterComponent) {
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

          // Chage the page and reset the counter
          this.onEmailChange(index);
          counter.set(index + 1);

          // We have no pages left
        } else {
          // Reset the page to defaults
          this.pageService.clearPage();
          this.currentEmailId = null;
          this.loadingService.loading = false;
          this.pageService.page.widgetCursors = [];
          this.pageService.page.width = this.pageService.page.defaultWidth;
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
  loadEmail(emailId: number) {
    // Display the loading screen
    this.loadingService.loading = true;

    this.dataService.get(this.emailUrl, [{ key: 'emailId', value: emailId }])
      .subscribe((page: PageData) => {

        // Load the email page
        this.loadPage(page);
      });
  }



  // -------------------------------------------------------------------- Load Page -----------------------------------------------------------
  loadPage(page: PageData) {
    this.pageService.loadPage(page);
    this.pageService.propertyView = PropertyView.Page;
    this.loadingService.loading = false;
    this.initialPageLoaded = true;
    this.pageService.setPage(this.pageService.page.width);
  }


  // ---------------------------------------------------------------------- Add Email --------------------------------------------------------
  addEmail(counter: CounterComponent) {
    // Display the loading screen
    this.loadingService.loading = true;



    this.dataService.get(this.emailUrl + '/Create')
      .subscribe((page: PageData) => {
        // Load the page
        this.loadPage(page);

        // Set the new page
        this.setNewEmail(counter);
      });
  }


  // ------------------------------------------------------------------------- Set New Email -----------------------------------------------------------
  setNewEmail(counter: CounterComponent) {
    // Add the new email id
    this.currentEmailId = this.pageService.page.id;
    this.emailIds.push(this.currentEmailId);

    // Set the counter to show the new page number
    counter.set(this.emailIds.length);
  }


  // ------------------------------------------------------------------------ Duplicate Email --------------------------------------------------------
  duplicateEmail(counter: CounterComponent) {
    if (!this.currentEmailId) return;

    this.loadingService.loading = true;
    let pageData = this.pageService.page.getData();

    this.dataService.post(this.emailUrl, pageData)
      .subscribe((page: PageData) => {

        // Load the email
        this.loadPage(page);

        // Set the new page
        this.setNewEmail(counter);
      });
  }
}