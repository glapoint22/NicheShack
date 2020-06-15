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

@Component({
  selector: 'lead-page-editor',
  templateUrl: './lead-page-editor.component.html',
  styleUrls: ['./lead-page-editor.component.scss']
})
export class LeadPageEditorComponent implements OnChanges {
  @Input() nicheId: number;
  public view: string = 'page';
  public leadPageIds: Array<string>;
  public selectedTab: string;
  public currentLeadPageId: string;
  public initialPageLoaded: boolean;

  constructor(public pageService: PageService, private loadingService: LoadingService, private promptService: PromptService) { }

  //                                                                 TEMP!!!!!!
  // ******************************************************************************************************************************************
  public getTempLeadPage(id: string): Observable<PageData> {
    return new Observable<PageData>(subscriber => {
      switch (id) {
        case 'FM1R8HAOEB':
          subscriber.next({
            id: 'FM1R8HAOEB',
            name: 'Campland',
            width: 1600,
            background: {
              enable: false,
              color: '#ffffff',
              image: {
                title: 'Campland',
                url: 'campland-background.jpg',
                position: 'center center',
                repeat: 'no-repeat',
                attachment: 'fixed'
              }
            },
            rows: [
              {
                name: 'My Row',
                top: 100,
                background: null,
                border: null,
                corners: null,
                shadow: null,
                padding: null,
                verticalAlignment: null,
                breakpoints: [],
                columns: [




                  // Button
                  {
                    name: 'My Column',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 2,
                    widgetData: {
                      widgetType: 0,
                      name: 'My Button',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: '0 auto',
                      background: {
                        color: '#ff0000',
                        image: null,
                        enable: null
                      },
                      border: {
                        enable: true,
                        width: 5,
                        style: null,
                        color: '#00ff00'
                      },
                      caption: {
                        text: 'Alita',
                        font: '"Comic Sans MS", cursive, sans-serif',
                        fontSize: '24',
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        textDecoration: 'underline',
                        color: '#0000ff'
                      },
                      corners: {
                        constrain: true,
                        topLeft: 20,
                        topRight: 20,
                        bottomRight: 20,
                        bottomLeft: 20
                      },
                      shadow: {
                        enable: true,
                        x: 10,
                        y: 10,
                        blur: 10,
                        size: 10,
                        color: '#3f573f70'
                      },
                      padding: {
                        constrain: true,
                        top: '24px',
                        right: '24px',
                        bottom: '24px',
                        left: '24px'
                      },
                      link: {
                        selectedOption: 'webAddress',
                        url: 'http://www.alitamovie.com'
                      },
                      backgroundHoverColor: '#6b2456',
                      backgroundActiveColor: '#446e05',
                      borderHoverColor: '#ff05f3',
                      borderActiveColor: '#acdb12',
                      textHoverColor: '#2ad1c6',
                      textActiveColor: '#36cc00'
                    } as ButtonWidgetData
                  },




                  // Text
                  {
                    name: 'My Column2',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 2,
                    widgetData: {
                      widgetType: 1,
                      name: 'My Text',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      background: {
                        color: '#b01a65',
                        image: null,
                        enable: null
                      },
                      padding: null,
                      htmlContent: '<div>Hello</div>'
                    } as TextWidgetData
                  },







                  // Image
                  {
                    name: 'My Column3',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 2,
                    widgetData: {
                      widgetType: 2,
                      name: 'My Image',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      border: {
                        enable: true,
                        width: 3,
                        style: null,
                        color: '#0000ff'
                      },
                      image: {
                        url: '0aada12f8b21471ea96aebe9a503977b.png',
                        title: 'Alita'
                      },
                      corners: null,
                      shadow: null,
                      link: {
                        url: 'http://www.tama.com',
                        selectedOption: 'niche'
                      }

                    } as ImageWidgetData
                  },









                  // Container
                  {
                    name: 'My Column4',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 2,
                    widgetData: {
                      widgetType: 3,
                      name: 'My Container',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      border: null,
                      background: null,
                      corners: null,
                      shadow: null,
                      padding: null,
                      rows: [
                        {
                          name: 'My Row',
                          top: 0,
                          background: null,
                          border: null,
                          corners: null,
                          shadow: null,
                          padding: null,
                          verticalAlignment: null,
                          breakpoints: [],
                          columns: [




                            // Button
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
                                widgetType: 0,
                                name: 'My Button',
                                width: null,
                                height: null,
                                breakpoints: [],
                                horizontalAlignment: null,
                                background: null,
                                border: null,
                                caption: null,
                                corners: null,
                                shadow: null,
                                padding: null,
                                link: null,
                                backgroundHoverColor: null,
                                backgroundActiveColor: null,
                                borderHoverColor: null,
                                borderActiveColor: null,
                                textHoverColor: null,
                                textActiveColor: null
                              } as ButtonWidgetData
                            }
                          ]
                        }
                      ]

                    } as ContainerWidgetData
                  },







                  // Line
                  {
                    name: 'My Column5',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 2,
                    widgetData: {
                      widgetType: 4,
                      name: 'My Line',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      border: null,
                      shadow: null,
                    } as LineWidgetData
                  },









                  // Video
                  {
                    name: 'My Column6',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 2,
                    widgetData: {
                      widgetType: 5,
                      name: 'My Video',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      border: null,
                      video: {
                        url: '//player.vimeo.com/video/173192945?muted=false',
                        thumbnail: 'thumbnail1.png'
                      },
                      corners: null,
                      shadow: null

                    } as VideoWidgetData
                  }
                ]
              },



              // Product Group
              {
                name: 'My Row2',
                top: 400,
                background: null,
                border: null,
                corners: null,
                shadow: null,
                padding: null,
                verticalAlignment: null,
                breakpoints: [],
                columns: [
                  {
                    name: 'My Column',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 4,
                    widgetData: {
                      widgetType: 6,
                      name: 'My Product Group',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      caption: {
                        text: 'Check out our featured products',
                        fontWeight: 'bold',
                        fontSize: '44',
                        fontStyle: 'italic',
                        font: 'Impact, Charcoal, sans-serif',
                        textDecoration: 'underline',
                        color: '#ff0000'
                      },
                      productGroupType: 0,
                      featuredProducts: [
                        {
                          id: 'FA24GDSETG',
                          name: 'How To Be a Gumpy'
                        },
                        {
                          id: '8RTIOFGBHE',
                          name: 'Alita: Battle Angel'
                        }
                      ]

                    } as ProductGroupWidgetData
                  },





                  // Categories
                  {
                    name: 'My Column2',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 4,
                    widgetData: {
                      widgetType: 7,
                      name: 'My Categories',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      caption: {
                        text: 'Welcome to Gumpy\'s',
                        fontWeight: 'bold',
                        fontSize: '44',
                        fontStyle: 'italic',
                        font: 'Impact, Charcoal, sans-serif',
                        textDecoration: 'underline',
                        color: '#ff0000'
                      },
                      backgroundColor: '#0000ff',
                      textColor: '#00ff00',
                      shadow: {
                        enable: true,
                        x: 10,
                        y: 10,
                        blur: 10,
                        size: 10,
                        color: '#3f573f70'
                      },
                      categories: [
                        {
                          name: 'Health & Fitness',
                          id: 'fdsfafsdfdsds',
                          icon: {
                            url: '44d71fbf43904ffdbdece40a45bdf9db.png',
                            title: 'Health & Fitness'
                          }
                        },
                        {
                          name: 'Self-Help',
                          id: 1,
                          icon:  {
                            url: '143968bba73642898bb4a6715a1efd3d.png',
                            title: 'self-help'
                          }
                        }
                      ]
                    } as CategoriesWidgetData
                  },










                  // Carousel
                  {
                    name: 'My Column3',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 4,
                    widgetData: {
                      widgetType: 8,
                      name: 'My Carousel',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      banners: [
                        {
                          image: {
                            url: 'banner1.jpg',
                            title: 'Keto'
                          },
                          link: {
                            selectedOption: 'webAddress',
                            url: 'http://www.alitamovie.com',
                          }
                        },
                        {
                          image: {
                            url: 'banner2.jpg',
                            title: 'Hyperbolic Stretching'
                          },
                          link: {
                            selectedOption: 'page',
                            url: 'http://www.tama.com',
                          }
                        },

                        {
                          image: {
                            url: 'banner3.jpg',
                            title: 'Google'
                          },
                          link: {
                            selectedOption: 'page',
                            url: 'http://www.google.com',
                          }
                        },


                        {
                          image: {
                            url: 'banner4.jpg',
                            title: 'YouTube'
                          },
                          link: {
                            selectedOption: 'page',
                            url: 'http://www.youtube.com',
                          }
                        },


                        {
                          image: {
                            url: 'banner5.jpg',
                            title: 'Avatar'
                          },
                          link: {
                            selectedOption: 'page',
                            url: 'http://www.avatarmovie.com',
                          }
                        }


                      ]
                    } as CarouselWidgetData
                  }
                ]
              }
            ]
          });
          break;

        case '5NOQOTV6KS':
          subscriber.next({
            id: '5NOQOTV6KS',
            name: 'Alita',
            width: 1200,
            background: {
              enable: false,
              color: '#ff0000',
              image: null
            },
            rows: []
          });

          break;


        case '026HJNAYPQ':
          subscriber.next({
            id: '026HJNAYPQ',
            name: 'Gumpy\'s',
            width: 1600,
            background: {
              enable: false,
              color: '#00ff00',
              image: null
            },
            rows: []
          });
          break;


        case '4LSN6AR0F5':
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

          break;




        case 'L2D8IEG9WL':
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

          break;
      }
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



  public getTempLeadPageIds(): Observable<Array<string>> {
    return new Observable<Array<string>>(subscriber => {
      subscriber.next(['FM1R8HAOEB', '5NOQOTV6KS', '026HJNAYPQ']);
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
    this.getTempLeadPageIds().subscribe((leadPageIds: Array<string>) => {
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

    this.getTempLeadPage(leadPageId).subscribe((pageData: PageData) => {
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