import { Component, Input, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { Page } from '../../classes/page';
import { PageData } from '../../classes/page-data';
import { ContainerComponent } from './container/container.component';

@Component({
  selector: 'page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements OnChanges {
  @Input() pageData: PageData;
  @ViewChild('rootContainer', { static: false }) rootContainer: ContainerComponent;
  public page: Page = new Page();

  ngOnChanges() {
    if (this.pageData) {
      this.page.rootContainer = this.rootContainer;
      this.page.setData(this.pageData);
    }

  }
}