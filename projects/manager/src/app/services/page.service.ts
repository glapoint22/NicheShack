import { Injectable, ElementRef } from '@angular/core';
import { Page, PageType } from '../classes/page';
import { PageData } from '../classes/page-data';
import { BreakpointService } from './breakpoint.service';
import { SaveService } from './save.service';
import { PropertyView } from '../classes/property-view';
import { RowComponent } from '../shared-components/designer/row/row.component';
import { ColumnComponent } from '../shared-components/designer/column/column.component';
import { WidgetComponent } from '../shared-components/designer/widgets/widget/widget.component';
import { WidgetCursor } from '../classes/widget-cursor';
import { EditableDropdownComponent } from '../shared-components/elements/dropdowns/editable-dropdown/editable-dropdown.component';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  public page: Page = new Page();
  public apiUrl: string;
  public propertyView: PropertyView;
  public selectedRow: RowComponent;
  public selectedColumn: ColumnComponent;
  public selectedWidget: WidgetComponent;
  public buttonStylesDocumentFragment: DocumentFragment;
  public designerBreakpointsDropdown: EditableDropdownComponent;
  public designerCanvas: ElementRef;

  // Properties for widget cursor
  public currentWidgetCursor: WidgetCursor;
  public currentContainerWidgetCursorIsOver: HTMLElement;
  public widgetCursorIsOverContainer: boolean;
  public currentColumnWidgetCursorIsOver: HTMLElement;
  public widgetCursorIsOverColumn: boolean;
  public overColumn: boolean;

  constructor(
    private breakpointService: BreakpointService,
    private saveService: SaveService
  ) { }


  save() {
    this.saveService.save({
      url: this.apiUrl,
      data: {
        pageId: this.page.id,
        name: this.page.name,
        page: this.stringifyPage(this.page.getData())
      }
    });
  }



  setPage(width: number) {
    this.page.setWidgets();
    this.setPageWidth(width);
  }


  setPageWidth(width: number) {
    this.designerBreakpointsDropdown.setValue(width);
    this.designerCanvas.nativeElement.style.maxWidth = width + 'px';
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
    this.buttonStylesDocumentFragment = document.createDocumentFragment();

    // Append the button styles style element to the button styles document fragment
    buttonStyles.type = 'text/css';
    this.buttonStylesDocumentFragment.appendChild(buttonStyles);

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
    previewWindow.document.head.appendChild(this.buttonStylesDocumentFragment);

    // Clear the background
    previewWindow.document.body.style.background = 'none';

    this.page.background.applyStyles(previewWindow.document.body);
  }




  // -----------------------------( CLEAR PAGE )------------------------------ \\
  clearPage() {
    this.page.clear();
    this.selectedWidget = null;
    this.selectedColumn = null;
    this.selectedRow = null;
  }





  // -----------------------------( LOAD PAGE )------------------------------ \\
  loadPage(page: string) {
    // Convert the page into object form
    let pageData: PageData = JSON.parse(page);

    this.page.setData(pageData);
    this.breakpointService.onBreakpointChange.next();
  }




  // -----------------------------( STRINGIFY PAGE )------------------------------ \\
  stringifyPage(pageData: PageData) {
    return JSON.stringify(pageData, (k, v) => {
      if (!v || (typeof v == 'object' && Object.values(v).length == 0)) {
        return undefined;
      } else {
        return v;
      }
    });
  }


  selectPage() {
    this.selectedWidget = null;
    this.propertyView = PropertyView.Page;
    this.selectedRow = null;
    this.selectedColumn = null;
  }
}