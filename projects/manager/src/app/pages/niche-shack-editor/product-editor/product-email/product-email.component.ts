import { Component, OnInit, Input } from '@angular/core';
import { PaginatorComponent } from 'projects/manager/src/app/shared-components/paginator/paginator.component';
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PageService } from 'projects/manager/src/app/services/page.service';
import { PageData } from 'projects/manager/src/app/classes/page-data';
import { TextWidgetData } from 'projects/manager/src/app/classes/text-widget-data';

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

  constructor(private promptService: PromptService, private loadingService: LoadingService, private pageService: PageService) { }


  //                                                                 TEMP!!!!!!
  // ******************************************************************************************************************************************
  public DeleteTempEmail(id: string): Observable<void> {
    return new Observable<void>(subscriber => {
      subscriber.next();
    }).pipe(delay(1000));
  }


  public getTempEmail(id: string): Observable<PageData> {
    return new Observable<PageData>(subscriber => {
      switch (id) {
        case 'FM1R8HAOEB':
          subscriber.next({
            id: 'FM1R8HAOEB',
            name: 'Campland Email',
            width: 600,
            background: {
              enable: false,
              color: '#0000ff',
              image: null
            },
            rows: [
              {
                name: 'My Row',
                top: 200,
                background: null,
                border: null,
                corners: null,
                shadow: null,
                padding: null,
                verticalAlignment: null,
                breakpoints: [],
                columns: [








                  // Text
                  {
                    name: 'My Column',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 12,
                    widgetData: {
                      widgetType: 1,
                      name: 'My Text',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      background: {
                        color: '#afafaf',
                        image: null,
                        enable: null
                      },
                      padding: null,
                      htmlContent: '<div>Thanks for your interest in Campland!</div>'
                    } as TextWidgetData
                  },
                ]
              },
            ]
          });
          break;

        case '5NOQOTV6KS':
          subscriber.next({
            id: '5NOQOTV6KS',
            name: 'Alita Email',
            width: 500,
            background: {
              enable: false,
              color: '00ff00',
              image: null
            },
            rows: []
          });

          break;


        case '026HJNAYPQ':
          subscriber.next({
            id: '026HJNAYPQ',
            name: 'Gumpy\'s Email',
            width: 550,
            background: {
              enable: false,
              color: '#0000ff',
              image: null
            },
            rows: []
          });
          break;




        case '4LSN6AR0F5':
          subscriber.next({
            id: '4LSN6AR0F5',
            name: 'New Email',
            width: 600,
            background: {
              color: '#ffffff',
              image: null,
              enable: null
            },
            rows: []
          });

          break;



        case 'L2D8IEG9WL':
          subscriber.next({
            id: 'L2D8IEG9WL',
            name: 'Alita Email',
            width: 500,
            background: {
              enable: false,
              color: '00ff00',
              image: null
            },
            rows: []
          });

          break;
      }
    }).pipe(delay(1000));
  }

  public getTempEmailIds(): Observable<Array<string>> {
    return new Observable<Array<string>>(subscriber => {
      subscriber.next(['FM1R8HAOEB', '5NOQOTV6KS', '026HJNAYPQ']);
    }).pipe(delay(1000));
  }

  public getTempNewEmail(): Observable<PageData> {
    return new Observable<PageData>(subscriber => {
      subscriber.next({
        id: '4LSN6AR0F5',
        name: 'New Email',
        width: 1600,
        background: {
          color: '#ffffff',
          image: null,
          enable: null
        },
        rows: []
      });
    }).pipe(delay(1000));
  }

  public getTempDuplicateEmail(emailId: string): Observable<PageData> {
    return new Observable<PageData>(subscriber => {
      subscriber.next({
        id: 'L2D8IEG9WL',
        name: 'Alita',
        width: 1200,
        background: {
          enable: false,
          color: '#ff0000',
          image: null
        },
        rows: []
      });
    }).pipe(delay(1000));

  }
  // ******************************************************************************************************************************************



  ngOnInit() {
    // Display the loading screen
    this.loadingService.loading = true;
    
    // Set the page
    window.setTimeout(()=> {
      this.pageService.setDesigner('email');
      this.pageService.page.width = this.pageService.emailDefaultWidth;
    });
    
    // Get the email ids for this product
    this.getTempEmailIds().subscribe((emailIds: Array<string>) => {
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

    // Delete the page in the database
    this.DeleteTempEmail(this.currentEmailId).subscribe(() => {
      // Remove this email id from the email ids array
      let index = this.emailIds.findIndex(x => x == this.currentEmailId);
      this.emailIds.splice(index, 1);

      // If we have any emails
      if (this.emailIds.length > 0) {
        // Set the index of the previous page
        index = Math.min(this.emailIds.length - 1, index);

        // Chage the page and reset the paginator
        this.onEmailChange(index);
        paginator.currentIndex = index;

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

    this.getTempEmail(emailId).subscribe((pageData: PageData) => {

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


    this.getTempNewEmail().subscribe((pageData: PageData) => {
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
    paginator.currentIndex = this.emailIds.length - 1;
  }


  // ------------------------------------------------------------------------ Duplicate Email --------------------------------------------------------
  duplicateEmail(paginator: PaginatorComponent) {
    if (!this.currentEmailId) return;

    this.loadingService.loading = true;
    this.getTempDuplicateEmail(this.currentEmailId).subscribe((pageData: PageData) => {
      // Load the email
      this.loadPage(pageData);

      // Set the new page
      this.setNewEmail(pageData, paginator);
    });
  }
}