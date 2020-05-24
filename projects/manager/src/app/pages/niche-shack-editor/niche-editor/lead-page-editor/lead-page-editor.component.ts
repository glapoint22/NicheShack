import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Page } from 'projects/manager/src/app/classes/page';
import { PageService } from 'projects/manager/src/app/services/page.service';
import { Color } from 'projects/manager/src/app/classes/color';
import { Background } from 'projects/manager/src/app/classes/background';
import { Image } from 'projects/manager/src/app/classes/image';
import { BackgroundImage } from 'projects/manager/src/app/classes/background-image';

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
      let background = new Background();
      background.color = new Color(255, 255, 255, 1);
      let image = new BackgroundImage();
      image.url = 'campland-background.jpg';
      image.title = 'Campland';
      
      background.image = image;
      subscriber.next([
        {
          name: 'campland',
          width: 1600,
          background: background
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