import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PageService } from 'projects/manager/src/app/services/page.service';
import { PageData } from 'projects/manager/src/app/classes/page-data';
import { ButtonWidgetData } from 'projects/manager/src/app/classes/button-widget-data';
import { TextWidgetData } from 'projects/manager/src/app/classes/text-widget-data';
import { ImageWidgetData } from 'projects/manager/src/app/classes/image-widget-data';
import { ContainerWidgetData } from 'projects/manager/src/app/classes/container-widget-data';
import { LineWidgetData } from 'projects/manager/src/app/classes/line-widget-data';
import { VideoWidgetData } from 'projects/manager/src/app/classes/video-widget-data';
import { ProductGroupWidgetData } from 'projects/manager/src/app/classes/product-group-widget-data';
import { CategoriesWidgetData } from 'projects/manager/src/app/classes/categories-widget-data';
import { CarouselWidgetData } from 'projects/manager/src/app/classes/carousel-widget-data';
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

  constructor(public pageService: PageService,
    private loadingService: LoadingService,
    private promptService: PromptService,
    private dataService: TempDataService) { }

  //                                                                 TEMP!!!!!!
  // ******************************************************************************************************************************************
  


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
            name: 'New Lead Page Email',
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






  public getTempNewLeadPage(): Observable<PageData> {
    return new Observable<PageData>(subscriber => {
      subscriber.next({
        id: '4LSN6AR0F5',
        name: 'New Lead Page',
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



  public getTempDuplicateLeadPage(leadPageId: string): Observable<PageData> {
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


  public DeleteTempLeadPage(id: string): Observable<void> {
    return new Observable<void>(subscriber => {
      subscriber.next();
    }).pipe(delay(1000));
  }
  // ******************************************************************************************************************************************



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

    this.dataService.get('api/Niches/LeadPages', [{ key: 'leadPageId', value: leadPageId }])
      .subscribe((pageData: PageData) => {
        this.initialPageLoaded = true;

        // Load the lead page
        this.loadPage('leadPage', pageData);
      });
  }









  // -------------------------------------------------------------------- Load Email -----------------------------------------------------------
  loadEmail(leadPageId: string) {
    this.loadingService.loading = true;
    this.getTempEmail(leadPageId).subscribe((pageData: PageData) => {

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


    this.getTempNewLeadPage().subscribe((pageData: PageData) => {
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
    this.getTempDuplicateLeadPage(this.currentLeadPageId).subscribe((pageData: PageData) => {
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
    this.DeleteTempLeadPage(this.currentLeadPageId).subscribe(() => {
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
}