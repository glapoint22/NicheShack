import { Background } from './background';
import { ContainerComponent } from '../shared-components/designer/container/container.component';
import { RowComponent } from '../shared-components/designer/row/row.component';
import { ColumnData } from './column-data';
import { ColumnComponent } from '../shared-components/designer/column/column.component';
import { WidgetType } from '../../../../../classes/widget-type';
import { ContainerWidgetComponent } from '../shared-components/designer/widgets/container-widget/container-widget.component';
import { ContainerWidgetData } from './container-widget-data';
import { Type } from '@angular/core';
import { WidgetComponent } from '../shared-components/designer/widgets/widget/widget.component';
import { ButtonWidgetComponent } from '../shared-components/designer/widgets/button-widget/button-widget.component';
import { TextWidgetComponent } from '../shared-components/designer/widgets/text-widget/text-widget.component';
import { ImageWidgetComponent } from '../shared-components/designer/widgets/image-widget/image-widget.component';
import { LineWidgetComponent } from '../shared-components/designer/widgets/line-widget/line-widget.component';
import { VideoWidgetComponent } from '../shared-components/designer/widgets/video-widget/video-widget.component';
import { ProductGroupWidgetComponent } from '../shared-components/designer/widgets/product-group-widget/product-group-widget.component';
import { CategoriesWidgetComponent } from '../shared-components/designer/widgets/categories-widget/categories-widget.component';
import { CarouselWidgetComponent } from '../shared-components/designer/widgets/carousel-widget/carousel-widget.component';
import { WidgetCursor } from './widget-cursor';
import { RowData } from 'projects/manager/src/app/classes/row-data';
import { PageData } from 'projects/manager/src/app/classes/page-data';
import { Color } from 'classes/color';

export class Page {
    public id: number;
    public name: string;
    public width: number;
    public background: Background = new Background();
    public rootContainer: ContainerComponent;
    public type: PageType = PageType.Page;
    public widgetCursors: Array<WidgetCursor>;
    public get defaultWidth(): number {
        let width: number;

        switch (this.type) {
            case PageType.Email:
                width = 600;
                break;

            default:
                width = 1600;
                break;
        }

        return width;
    }



    // -----------------------------( CLEAR )------------------------------ \\
    clear() {
        if (this.rootContainer) {
            this.rootContainer.viewContainerRef.clear();
            this.rootContainer.rows = [];
            this.name = '';
            this.width = this.defaultWidth;
            this.background = new Background();
            this.background.enable = true;
            this.background.color = new Color(0, 0, 0, 0);
        }
    }



    // -----------------------------( SET DATA )------------------------------ \\
    setData(pageData: PageData) {

        // Clear the page
        this.clear();

        // Set the page id
        this.id = pageData.id;

        // Set the name and width of the page
        this.name = pageData.name;
        this.width = pageData.width ? pageData.width : this.width;

        // Set the background data
        pageData.background.enable = true;
        this.background.setData(pageData.background);

        if (pageData.rows && pageData.rows.length > 0) {
            this.setRows(pageData.rows, this.rootContainer);
        }
    }





    // -----------------------------( GET DATA )------------------------------ \\
    getData(): PageData {
        return {
            id: this.id,
            name: this.name,
            width: this.width,
            background: this.background.getData(),
            rows: this.rootContainer.getData()
        }
    }





    // -----------------------------( SET ROWS )------------------------------ \\
    private setRows(rows: Array<RowData>, container: ContainerComponent) {
        // Loop through all the rows
        rows.forEach((rowData: RowData, index: number) => {
            let top = rowData.top ? rowData.top : 0;

            // Create the row and load the row data
            let rowComponent: RowComponent = container.createRow(index, top);
            rowComponent.setData(rowData);

            // Loop through each column
            rowData.columns.forEach((columnData: ColumnData, index: number) => {

                // Create the column and load the column data
                let columnComponent: ColumnComponent = rowComponent.createColumn(index);
                columnComponent.setData(columnData);


                // Create the widget and load the widget data
                let widgetComponent = columnComponent.createWidget(this.getWidget(columnData.widgetData.widgetType));
                widgetComponent.setData(columnData.widgetData);

                // If this widget is a container
                if (columnData.widgetData.widgetType == WidgetType.Container) {
                    let containerWidget = widgetComponent as ContainerWidgetComponent;
                    let containerWidgetData = columnData.widgetData as ContainerWidgetData;

                    // Load this container's widgets
                    if (containerWidgetData.rows) {
                        this.setRows(containerWidgetData.rows, containerWidget.container);
                    }
                }
            })
        });
    }




    // -----------------------------( GET WIDGET )------------------------------ \\
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






    // -----------------------------( SET WIDGETS )------------------------------ \\
    setWidgets() {
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


        switch (this.type) {
            case PageType.Email:
                break;

            case PageType.LeadPage:
                this.widgetCursors.push({
                    title: 'Video',
                    widget: VideoWidgetComponent,
                    icon: '<i class="fas fa-film"></i>',
                    allowed: 'video-widget-allowed.png',
                    notAllowed: 'video-widget-not-allowed.png'
                })
                break;

            case PageType.Page:
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


export enum PageType {
    Page,
    Email,
    LeadPage
}