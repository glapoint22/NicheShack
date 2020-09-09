import { PageData } from './page-data';
import { Background } from './background';
import { ContainerComponent } from '../shared-components/page-content/container/container.component';
import { RowData } from './row-data';
import { RowComponent } from '../shared-components/page-content/row/row.component';
import { ColumnData } from './column-data';
import { ColumnComponent } from '../shared-components/page-content/column/column.component';

export class Page {
    public width: number;
    public background: Background = new Background();
    public rootContainer: ContainerComponent;


    // -----------------------------( SET DATA )------------------------------ \\
    setData(pageData: PageData) {
        this.width = pageData.width;

        // Set the background data
        this.background.setData(pageData.background);

        if (pageData.rows && pageData.rows.length > 0) {
            this.setRows(pageData.rows, this.rootContainer);
        }
    }



    // -----------------------------( SET ROWS )------------------------------ \\
    private setRows(rows: Array<RowData>, container: ContainerComponent) {
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
                // let widgetComponent = columnComponent.createWidget(this.getWidget(columnData.widgetData.widgetType));
                // widgetComponent.setData(columnData.widgetData);

                // // If this widget is a container
                // if (columnData.widgetData.widgetType == WidgetType.Container) {
                //     let containerWidget = widgetComponent as ContainerWidgetComponent;
                //     let containerWidgetData = columnData.widgetData as ContainerWidgetData;

                //     // Load this container's widgets
                //     if(containerWidgetData.rows) {
                //         this.setRows(containerWidgetData.rows, containerWidget.container);
                //     }
                    
                // }
            })
        });
    }
}