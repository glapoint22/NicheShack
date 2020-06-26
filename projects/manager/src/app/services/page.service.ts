import { Injectable, Type } from '@angular/core';
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
import { WidgetType } from '../classes/widget-type';
import { WidgetComponent } from '../shared-components/designer/widgets/widget/widget.component';
import { TextWidgetComponent } from '../shared-components/designer/widgets/text-widget/text-widget.component';
import { ImageWidgetComponent } from '../shared-components/designer/widgets/image-widget/image-widget.component';
import { ContainerWidgetComponent } from '../shared-components/designer/widgets/container-widget/container-widget.component';
import { Background } from '../classes/background';
import { ContainerWidgetData } from '../classes/container-widget-data';
import { LineWidgetComponent } from '../shared-components/designer/widgets/line-widget/line-widget.component';
import { VideoWidgetComponent } from '../shared-components/designer/widgets/video-widget/video-widget.component';
import { ProductGroupWidgetComponent } from '../shared-components/designer/widgets/product-group-widget/product-group-widget.component';
import { CategoriesWidgetComponent } from '../shared-components/designer/widgets/categories-widget/categories-widget.component';
import { CarouselWidgetComponent } from '../shared-components/designer/widgets/carousel-widget/carousel-widget.component';
import { WidgetCursor } from '../classes/widget-cursor';
import { TempDataService } from './temp-data.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  public page: Page = new Page();
  public rootContainer: ContainerComponent;
  public widgetCursors: Array<WidgetCursor>;
  public pageDefaultWidth: number = 1600;
  public emailDefaultWidth: number = 600;
  private defaultWidth: number;


  constructor(private widgetService: WidgetService,
    private breakpointService: BreakpointService,
    private dataService: TempDataService,
    private loadingService: LoadingService) { }

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

  clearPage() {
    if (this.rootContainer) {
      this.rootContainer.viewContainerRef.clear();
      this.rootContainer.rows = [];
      this.page.name = '';
      this.page.width = this.defaultWidth;
      this.page.background = new Background();
      this.widgetService.selectedWidget = null;
    }
  }

  loadPage(pageData: PageData) {
    // Clear the page
    this.clearPage();

    // Assign the page id
    this.page.id = pageData.id;

    // Set the name and width of the page
    this.page.name = pageData.name;
    this.page.width = pageData.width ? pageData.width : this.defaultWidth;

    // Load the background
    this.page.background.load(pageData.background);

    // Load the widgets
    this.loadWidgets(this.rootContainer, pageData.rows);


    this.breakpointService.onBreakpointChange.next();
  }


  savePage(url: string) {
    let pageData: PageData = this.getPageData();

    this.loadingService.loading = true;
    this.dataService.put(url, pageData)
      .subscribe(() => {
        this.loadingService.loading = false;
      });
  }

  // stringifyPage(pageData: PageData) {
  //   return JSON.stringify(pageData, (k, v) => {
  //     if(typeof v == 'object' && Object.values(v).length == 0) {
  //       return undefined;
  //     } else {
  //       return v;
  //     }
  //   });
  // }

  getPageData(): PageData {
    let pageData: PageData = new PageData();

    // Assign the page id
    pageData.id = this.page.id;

    // Set the name and width of the page
    pageData.name = this.page.name;
    pageData.width = this.page.width;

    // Save the background
    this.page.background.save(pageData.background);

    this.rootContainer.save(pageData.rows);

    return pageData;
  }


  loadWidgets(container: ContainerComponent, rows: Array<RowData>) {
    // Loop through all the rows
    rows.forEach((rowData: RowData, index: number) => {

      // Create the row and load the row data
      let rowComponent: RowComponent = container.createRow(index, rowData.top);
      rowComponent.load(rowData);

      // Loop through each column
      rowData.columns.forEach((columnData: ColumnData, index: number) => {

        // Create the column and load the column data
        let columnComponent: ColumnComponent = rowComponent.createColumn(index);
        columnComponent.load(columnData);


        // Create the widget and load the widget data
        let widgetComponent = columnComponent.createWidget(this.getWidget(columnData.widgetData.widgetType));
        widgetComponent.load(columnData.widgetData);

        // If this widget is a container
        if (columnData.widgetData.widgetType == WidgetType.Container) {
          let containerWidget = widgetComponent as ContainerWidgetComponent;
          let containerWidgetData = columnData.widgetData as ContainerWidgetData;

          // Load this container's widgets
          this.loadWidgets(containerWidget.container, containerWidgetData.rows);
        }
      })
    });
  }

  getWidget(widgetType: WidgetType) {
    let widget: Type<WidgetComponent>

    switch (widgetType) {

      // Button
      case WidgetType.Button:
        widget = ButtonWidgetComponent;
        break;


      // Text
      case WidgetType.Text:
        widget = TextWidgetComponent;
        break;

      // Image
      case WidgetType.Image:
        widget = ImageWidgetComponent;
        break;


      // Container
      case WidgetType.Container:
        widget = ContainerWidgetComponent;
        break;


      // Line
      case WidgetType.Line:
        widget = LineWidgetComponent;
        break;


      // Video
      case WidgetType.Video:
        widget = VideoWidgetComponent;
        break;


      // Product Group
      case WidgetType.ProductGroup:
        widget = ProductGroupWidgetComponent;
        break;


      // Categories
      case WidgetType.Categories:
        widget = CategoriesWidgetComponent;
        break;


      // Carousel
      case WidgetType.Carousel:
        widget = CarouselWidgetComponent;
        break;
    }

    return widget;
  }

  setDesigner(type: string) {
    this.widgetCursors = [
      {
        title: 'Text',
        widget: TextWidgetComponent,
        icon: '<div class="text-icon">T</div>',
        allowed: 'text-widget-allowed.png',
        notAllowed: 'text-widget-not-allowed.png'
      },
      {
        title: 'Container',
        widget: ContainerWidgetComponent,
        icon: '<img class="image-icon" src="assets/container-widget-icon.png">',
        allowed: 'container-widget-allowed.png',
        notAllowed: 'container-widget-not-allowed.png'
      },
      {
        title: 'Image',
        widget: ImageWidgetComponent,
        icon: '<i class="fas fa-image"></i>',
        allowed: 'image-widget-allowed.png',
        notAllowed: 'image-widget-not-allowed.png'
      },
      {
        title: 'Button',
        widget: ButtonWidgetComponent,
        icon: '<i class="fab fa-bootstrap"></i>',
        allowed: 'button-widget-allowed.png',
        notAllowed: 'button-widget-not-allowed.png'
      },
      {
        title: 'Line',
        widget: LineWidgetComponent,
        icon: '<i class="fas fa-slash"></i>',
        allowed: 'line-widget-allowed.png',
        notAllowed: 'line-widget-not-allowed.png'
      }
    ]


    switch (type) {
      case 'email':
        this.defaultWidth = this.emailDefaultWidth;
        break;

      case 'leadPage':
        this.defaultWidth = this.pageDefaultWidth;
        this.widgetCursors.push({
          title: 'Video',
          widget: VideoWidgetComponent,
          icon: '<i class="fas fa-film"></i>',
          allowed: 'video-widget-allowed.png',
          notAllowed: 'video-widget-not-allowed.png'
        })
        break;

      case 'page':
        this.defaultWidth = this.pageDefaultWidth;
        this.widgetCursors.push.apply(this.widgetCursors,
          [
            {
              title: 'Video',
              widget: VideoWidgetComponent,
              icon: '<i class="fas fa-film"></i>',
              allowed: 'video-widget-allowed.png',
              notAllowed: 'video-widget-not-allowed.png'
            },
            {
              title: 'Product Group',
              widget: ProductGroupWidgetComponent,
              icon: '<img class="image-icon" src="assets/product-group-widget-icon.png">',
              allowed: 'product-group-widget-allowed.png',
              notAllowed: 'product-group-widget-not-allowed.png'
            },
            {
              title: 'Categories',
              widget: CategoriesWidgetComponent,
              icon: '<img class="categories-icon" src="assets/categories-widget-icon.png">',
              allowed: 'categories-widget-allowed.png',
              notAllowed: 'categories-widget-not-allowed.png'
            },
            {
              title: 'Carousel',
              widget: CarouselWidgetComponent,
              icon: '<img class="carousel-icon" src="assets/carousel-widget-icon.png">',
              allowed: 'carousel-widget-allowed.png',
              notAllowed: 'carousel-widget-not-allowed.png'
            }
          ]
        )
        break;
    }
  }
}