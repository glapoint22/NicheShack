import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PageService } from 'projects/manager/src/app/services/page.service';
import { PageData } from 'projects/manager/src/app/classes/page-data';
import { ButtonWidgetData } from 'projects/manager/src/app/classes/button-widget-data';
import { TextWidgetData } from 'projects/manager/src/app/classes/text-widget-data';
import { ImageWidgetData } from 'projects/manager/src/app/classes/image-widget-data';
import { ContainerWidgetData } from 'projects/manager/src/app/classes/container-widget-data';

@Component({
  selector: 'lead-page-editor',
  templateUrl: './lead-page-editor.component.html',
  styleUrls: ['./lead-page-editor.component.scss']
})
export class LeadPageEditorComponent implements OnChanges {
  @Input() nicheId: number;
  public view: string = 'page';
  public leadPageIds: Array<string>;

  constructor(public pageService: PageService) { }


  // ---------------------Temp-----------------------------
  public getTempLeadPage(id: string): Observable<PageData> {
    return new Observable<PageData>(subscriber => {


      switch (id) {
        case 'FM1R8HAOEB':
          subscriber.next({
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
                    columnSpan: 3,
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
                      text: {
                        caption: 'Alita',
                        font: '"Comic Sans MS", cursive, sans-serif',
                        fontSize: '22',
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
                    columnSpan: 3,
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
                    columnSpan: 3,
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
                    columnSpan: 3,
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
                                text: null,
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
                            },
          
          
          
          
                            
          
          
          
                          ]
                        }
                      ]

                    } as ContainerWidgetData
                  }



                ]
              }
            ]
          });
          break;

        case '5NOQOTV6KS':
          subscriber.next({
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


      }



    }).pipe(delay(1000));
  }



  public getTempLeadPageIds(): Observable<Array<string>> {
    return new Observable<Array<string>>(subscriber => {
      subscriber.next(['FM1R8HAOEB', '5NOQOTV6KS', '026HJNAYPQ']);
    }).pipe(delay(1000));
  }




  ngOnChanges() {
    this.leadPageIds = [];

    this.getTempLeadPageIds().subscribe((ids: Array<string>) => {
      if (ids.length > 0) {


        this.getTempLeadPage(ids[0]).subscribe((pageData: PageData) => {
          this.pageService.loadPage(pageData);
          this.leadPageIds = ids;
        });
      }

    });
  }

  onPageChange(index: number) {
    this.view = 'page';
    let leadPageId = this.leadPageIds[index];

    this.getTempLeadPage(leadPageId).subscribe((pageData: PageData) => {
      this.pageService.loadPage(pageData);
    });
  }
}