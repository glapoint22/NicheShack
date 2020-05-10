import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Page } from 'projects/manager/src/app/classes/page';
import { PageBackgroundType } from 'projects/manager/src/app/classes/page-background';
import { PageService } from 'projects/manager/src/app/services/page.service';
import { Color } from 'projects/manager/src/app/classes/color';

@Component({
  selector: 'lead-page-editor',
  templateUrl: './lead-page-editor.component.html',
  styleUrls: ['./lead-page-editor.component.scss']
})
export class LeadPageEditorComponent implements OnChanges {
  @Input() nicheId: number;
  public leadPages: Array<Page> = new Array<Page>();
  public view: string = 'page';

  constructor(public pageService: PageService) { }


  // ---------------------Temp-----------------------------
  public getTempLeadPages(): Observable<Array<Page>> {
    return new Observable<Array<Page>>(subscriber => {
      subscriber.next([
        {
          name: 'campland',
          width: 1600,
          background: {
            backgroundType: PageBackgroundType.Color,
            color: new Color(255, 255, 255, 1),
            image: ''
          }
        },
        {
          name: 'gumpys',
          width: 1400,
          background: {
            backgroundType: PageBackgroundType.Image,
            color: null,
            image: '09f972f68d5d4d968275e5f919e48c96.png'
          }
        }
      ]);
    }).pipe(delay(1000));
  }


  ngOnChanges() {
    this.getTempLeadPages().subscribe((leadPages: Array<Page>) => {
      this.leadPages = leadPages;
      this.pageService.page = this.leadPages[0];
    });
  }

  onPageChange(index: number) {
    this.pageService.page = this.leadPages[index];
    this.view = 'page';
  }
}