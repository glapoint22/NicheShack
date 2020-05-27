import { Injectable } from '@angular/core';
import { Page } from '../classes/page';
import { ContainerComponent } from '../shared-components/designer/container/container.component';
import { ButtonWidgetComponent } from '../shared-components/designer/widgets/button-widget/button-widget.component';
import { WidgetService } from './widget.service';
import { RowData } from '../classes/row-data';
import { ColumnData } from '../classes/column-data';
import { RowComponent } from '../shared-components/designer/row/row.component';
import { ColumnComponent } from '../shared-components/designer/column/column.component';
import { PageData } from '../classes/page-data';
import { BreakpointService } from './breakpoint.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  public page: Page = new Page();
  
  public rootContainer: ContainerComponent;

  constructor(private widgetService: WidgetService, private breakpointService: BreakpointService){}

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
    this.rootContainer.buildHTML(parent);

    // Add the grid class
    (parent.firstElementChild as HTMLElement).style.height = '100%';
    (parent.firstElementChild as HTMLElement).classList.add('grid');

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

  loadPage(pageData: PageData) {
    // Clear the page
    this.rootContainer.viewContainerRef.clear();
    this.rootContainer.rows = [];

    // Set the name and width of the page
    this.page.name = pageData.name;
    this.page.width = pageData.width ? pageData.width : 1600;

    // Load the background
    this.page.background.load(pageData.background);

    // Loop through each row
    pageData.rows.forEach((rowData: RowData, index: number) => {
      
      // Create the row and load the row data
      let rowComponent: RowComponent = this.rootContainer.createRow(index, rowData.top);
      rowComponent.load(rowData);

      // Loop through each column
      rowData.columns.forEach((columnData: ColumnData, index: number) => {
       let columnComponent: ColumnComponent = rowComponent.createColumn(index);

       let buttonwidget = columnComponent.createWidget(ButtonWidgetComponent);

       rowComponent.setColumnSpans();
      })

    });

    this.breakpointService.onBreakpointChange.next();

  }
}