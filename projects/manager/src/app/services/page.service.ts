import { Injectable } from '@angular/core';
import { Page } from '../classes/page';
import { WidgetService } from './widget.service';
import { PageData } from '../classes/page-data';
import { BreakpointService } from './breakpoint.service';
import { TempDataService } from './temp-data.service';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  public page: Page = new Page();
  public apiUrl: string;
  public save = new Subject<void>();

  constructor(
    private widgetService: WidgetService,
    private breakpointService: BreakpointService,
    private dataService: TempDataService
  ) {
    this.save.pipe(
      debounceTime(1000),
      switchMap(() => {
        return this.dataService.put(this.apiUrl, this.stringifyPage(this.page.getData()));
      })).subscribe();
  }

  // -----------------------------( PREVIEW )------------------------------ \\
  preview() {
    let previewWindow = window.open();
    let parent = document.createElement('div');
    let title = document.createElement('title');
    let meta = document.createElement('meta');
    let buttonStyles = document.createElement('style');
    let pageStyles = document.createElement('style');

    // Center the parent div
    parent.style.margin = 'auto';

    // This documnet fragment will hold all the button styles for the buttons on the page
    this.widgetService.buttonStylesDocumentFragment = document.createDocumentFragment();

    // Append the button styles style element to the button styles document fragment
    buttonStyles.type = 'text/css';
    this.widgetService.buttonStylesDocumentFragment.appendChild(buttonStyles);

    // This will build the HTML for each widget on the page
    this.page.rootContainer.buildHTML(parent);

    // Add the grid class
    let grid = parent.firstElementChild as HTMLElement;
    grid.style.height = '100%';
    grid.classList.add('grid');
    grid.style.maxWidth = this.page.width + 'px';

    // Write out the html to the preview window
    previewWindow.document.write(parent.outerHTML);

    // Title
    title.appendChild(document.createTextNode(this.page.name));
    previewWindow.document.head.appendChild(title);

    // Meta tag
    meta.setAttribute('charset', 'utf-8');
    previewWindow.document.head.appendChild(meta);
    meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width, initial-scale=1');
    previewWindow.document.head.appendChild(meta);

    // Append the styles to the head
    pageStyles.type = 'text/css';
    pageStyles.innerHTML = document.head.querySelector('style').innerHTML;
    previewWindow.document.head.appendChild(pageStyles);
    previewWindow.document.head.appendChild(this.widgetService.buttonStylesDocumentFragment);

    // Clear the background
    previewWindow.document.body.style.background = 'none';

    this.page.background.applyStyles(previewWindow.document.body);
  }




  // -----------------------------( CLEAR PAGE )------------------------------ \\
  clearPage() {
    this.page.clear();
    this.widgetService.selectedWidget = null;
  }





  // -----------------------------( LOAD PAGE )------------------------------ \\
  loadPage(pageData: PageData) {
    this.page.setData(pageData);
    this.breakpointService.onBreakpointChange.next();
  }




  // -----------------------------( STRINGIFY PAGE )------------------------------ \\
  stringifyPage(pageData: PageData) {
    return JSON.stringify(pageData, (k, v) => {
      if (typeof v == 'object' && Object.values(v).length == 0) {
        return undefined;
      } else {
        return v;
      }
    });
  }
}