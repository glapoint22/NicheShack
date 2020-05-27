import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PageService } from 'projects/manager/src/app/services/page.service';
import { PageData } from 'projects/manager/src/app/classes/page-data';

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
              hexColor: '#ffffff',
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
                background: {
                  enable: false,
                  hexColor: null,
                  image: null
                },
                columns: [
                  {
                    widget: {
                      type: 0
                    }
                  }
                ],
                border: {
                  enable: true,
                  width: 5,
                  style: 'solid',
                  hexColor: '#0000ff'
                },
                corners: {
                  constrain: false,
                  topLeft: 10,
                  topRight: 20,
                  bottomRight: 22,
                  bottomLeft: 12
                },
                shadow: {
                  enable: true,
                  x: 44,
                  y: 24,
                  blur: 25,
                  size: 20,
                  hexColor: '#145e23bf'
                },
                padding: {
                  constrain: true,
                  top: null,
                  right: null,
                  bottom: null,
                  left: null
                },
                verticalAlignment: null,
                breakpointData: [
                  {
                    breakpointType: 0,
                    screenSize: '768',
                    value: '32px'
                  },
                  {
                    breakpointType: 1,
                    screenSize: '768',
                    value: '32px'
                  },
                  {
                    breakpointType: 2,
                    screenSize: '768',
                    value: '32px'
                  },
                  {
                    breakpointType: 3,
                    screenSize: '768',
                    value: '32px'
                  },
                  {
                    breakpointType: 4,
                    screenSize: '768',
                    value: 'center'
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
              hexColor: '#ff0000',
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
              hexColor: '#00ff00',
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