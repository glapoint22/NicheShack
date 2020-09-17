import { Component, Input, ViewChild, DoCheck } from '@angular/core';
import { Page } from '../../classes/page';
import { PageData } from '../../classes/page-data';
import { ContainerComponent } from './container/container.component';

@Component({
  selector: 'page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements DoCheck {
  @Input() pageData: PageData;
  @ViewChild('rootContainer', { static: false }) rootContainer: ContainerComponent;
  public page: Page = new Page();


  ngDoCheck() {
    if (this.pageData && this.rootContainer && !this.page.rootContainer) {
      this.page.rootContainer = this.rootContainer;
      this.page.setData(this.pageData);
    }
  }
}