import { PageData } from './page-data';
import { ContainerComponent } from '../shared-components/page-content/container/container.component';
import { RowData } from './row-data';
import { RowComponent } from '../shared-components/page-content/row/row.component';
import { ColumnData } from './column-data';
import { ColumnComponent } from '../shared-components/page-content/column/column.component';
import { WidgetType } from 'classes/widget-type';
import { Type } from '@angular/core';
import { WidgetComponent } from '../shared-components/page-content/widget/widget.component';
import { ButtonWidgetComponent } from '../shared-components/page-content/button-widget/button-widget.component';
import { TextWidgetComponent } from '../shared-components/page-content/text-widget/text-widget.component';
import { ImageWidgetComponent } from '../shared-components/page-content/image-widget/image-widget.component';
import { ContainerWidgetComponent } from '../shared-components/page-content/container-widget/container-widget.component';
import { LineWidgetComponent } from '../shared-components/page-content/line-widget/line-widget.component';
import { VideoWidgetComponent } from '../shared-components/page-content/video-widget/video-widget.component';
import { ProductGroupWidgetComponent } from '../shared-components/page-content/product-group-widget/product-group-widget.component';
import { CarouselWidgetComponent } from '../shared-components/page-content/carousel-widget/carousel-widget.component';
import { BackgroundBase } from 'classes/background-base';
import { ContainerWidgetData } from './container-widget-data';
import { RowDataBase } from 'classes/row-data-base';
import { GridWidgetComponent } from '../shared-components/page-content/grid-widget/grid-widget.component';
import { ShopWidgetComponent } from '../shared-components/page-content/shop-widget/shop-widget.component';
import { Color } from 'classes/color';

export class Page {
    public width: number;
    public background: BackgroundBase = new BackgroundBase();
    public rootContainer: ContainerComponent;


    // -----------------------------( SET DATA )------------------------------ \\
    setData(pageData: PageData) {
        this.clear();
        this.width = pageData.width;

        // Set the background data
        this.background.setData(pageData.background);

        if (pageData.rows && pageData.rows.length > 0) {
            this.setRows(pageData.rows, this.rootContainer);
        }
    }



    // -----------------------------( CLEAR )------------------------------ \\
    clear() {
        if (this.rootContainer) {
            this.rootContainer.viewContainerRef.clear();
            this.background = new BackgroundBase();
            this.background.color = new Color(0, 0, 0, 0);
        }
    }



    // -----------------------------( SET ROWS )------------------------------ \\
    private setRows(rows: Array<RowDataBase>, container: ContainerComponent) {
        // Loop through all the rows
        rows.forEach((rowData: RowData) => {
            let top = rowData.top ? rowData.top : 0;

            // Create the row and load the row data
            let rowComponent: RowComponent = container.createRow(top);
            rowComponent.setData(rowData);

            // Loop through each column
            rowData.columns.forEach((columnData: ColumnData, index: number) => {

                // Create the column and load the column data
                let columnComponent: ColumnComponent = rowComponent.createColumn();
                columnComponent.setData(columnData);


                // Create the widget and load the widget data
                let widgetComponent = columnComponent.createWidget(this.getWidget(columnData.widgetData.widgetType));
                widgetComponent.setData(columnData.widgetData);

                // If this widget is a container
                if (columnData.widgetData.widgetType == WidgetType.Container) {
                    let containerWidget = widgetComponent as ContainerWidgetComponent;
                    let containerWidgetData = columnData.widgetData as ContainerWidgetData;

                    // Load this container's widgets
                    if(containerWidgetData.rows) {
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


            // Shop
            case WidgetType.Shop:
                widget = ShopWidgetComponent;
                break;


            // Carousel
            case WidgetType.Carousel:
                widget = CarouselWidgetComponent;
                break;

                // Grid
            case WidgetType.Grid:
                widget = GridWidgetComponent;
                break;
        }

        return widget;
    }
}