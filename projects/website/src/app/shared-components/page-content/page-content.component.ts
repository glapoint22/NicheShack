import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Page } from '../../classes/page';
import { ContainerComponent } from './container/container.component';

@Component({
  selector: 'page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements AfterViewInit {
  @ViewChild('rootContainer', { static: false }) rootContainer: ContainerComponent;
  public page: Page = new Page();


  ngAfterViewInit() {
    this.page.rootContainer = this.rootContainer;
  }
}