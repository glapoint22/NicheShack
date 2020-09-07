import { Component, Input, ApplicationRef, Output, EventEmitter } from '@angular/core';
import { EditableNumberFieldComponent } from '../../elements/number-fields/editable-number-field/editable-number-field.component';
import { ProportionalWidgetComponent } from '../../designer/widgets/proportional-widget/proportional-widget.component';
import { FreeformWidgetComponent } from '../../designer/widgets/freeform-widget/freeform-widget.component';
import { VerticalAlign } from 'classes/vertical-align';

@Component({
  selector: 'dimensions',
  templateUrl: './dimensions.component.html',
  styleUrls: ['./dimensions.component.scss']
})
export class DimensionsComponent {
  @Input() widget: any;
  @Output() onChange: EventEmitter<void> = new EventEmitter();

  constructor(private applicationRef: ApplicationRef) { };

  getWidth() {
    // If the widget does not have a width defined or the width is greater or equal to the column width, return the column width
    if (!this.widget.width || this.widget.width >= this.widget.column.columnElement.clientWidth) {
      return Math.round(this.widget.column.columnElement.clientWidth);
    } else {
      // Return the widget's width
      return Math.round(this.widget.width);
    }
  }

  getHeight() {
    // If the widget is a proportional widget and he widget does not have a width defined or 
    // the width is greater or equal to the column width, return the height based on the aspect ratio
    if (this.widget.setDimensions && (!this.widget.width || this.widget.width >= this.widget.column.columnElement.clientWidth)) {

      // Calculate the aspet ratio
      let aspectRatio = this.widget.widgetElement.nativeElement.getBoundingClientRect().height /
        this.widget.widgetElement.nativeElement.getBoundingClientRect().width;

      // Return the widget's height calculated from the aspect ratio
      return Math.round(this.widget.column.columnElement.clientWidth * aspectRatio);

    } else {
      // Return the widget's height
      return Math.round(this.widget.height);
    }
  }

  setWidth(value, numberField: EditableNumberFieldComponent) {
    this.widget.width = value;

    // If this is a proportional widget
    if (this.widget.setDimensions) {
      // Cast the widget as a proportional widget
      let proportionalWidget: ProportionalWidgetComponent = this.widget as ProportionalWidgetComponent;

      // Set the dimensions
      this.setDimensions(proportionalWidget);


      // Update the number field with the new value
      if (proportionalWidget.width == null) {
        let aspectRatio = this.widget.widgetElement.nativeElement.getBoundingClientRect().width /
          this.widget.widgetElement.nativeElement.getBoundingClientRect().height;

        // Force change detection
        this.applicationRef.tick();
        numberField.value = proportionalWidget.height * aspectRatio;

      } else {
        numberField.value = Math.round(proportionalWidget.width);
      }




      // This is a freeform widget
    } else {
      // Cast the widget as a freeform widget
      let freeformWidget: FreeformWidgetComponent = this.widget as FreeformWidgetComponent;

      // Widgets column width
      let columnWidth: number = freeformWidget.column.columnElement.clientWidth;

      // Make sure the widget width is not greater than the column width
      if (freeformWidget.width > columnWidth) {
        freeformWidget.width = columnWidth;

        // Update the number field with the new value
        numberField.value = Math.round(freeformWidget.width);
      }
      this.onChange.emit();
    }
    
    
  }

  setHeight(value, numberField: EditableNumberFieldComponent) {
    // If this is a proportional widget
    if (this.widget.setDimensions) {
      // Cast the widget as a proportional widget
      let proportionalWidget: ProportionalWidgetComponent = this.widget as ProportionalWidgetComponent;

      // We get the aspect ratio so we can assign the widget's width based on the height
      let aspectRatio = proportionalWidget.widgetElement.nativeElement.getBoundingClientRect().width /
        proportionalWidget.widgetElement.nativeElement.getBoundingClientRect().height;


      // Assgin the widget's width
      proportionalWidget.width = value * aspectRatio;

      // Set the new dimensions
      this.setDimensions(proportionalWidget);

      // Force change detection
      this.applicationRef.tick();

      // Update the number field with the new value
      numberField.value = Math.round(proportionalWidget.height);


      // This is a freeform widget
    } else {
      // Cast the widget as a freeform widget
      let freeformWidget: FreeformWidgetComponent = this.widget as FreeformWidgetComponent;

      // We are setting up the parameters to be passed into the sizeTop or sizeBottom methods
      let maxHeight: number = freeformWidget.getMaxHeight();
      let minHeight: number = freeformWidget.getMinHeight();
      let maxRowHeight: number = freeformWidget.getMaxRowHeight();
      let previousHeight: number = freeformWidget.widgetElement.nativeElement.clientHeight;

      // Set the height of the widget
      freeformWidget.height = value;

      // If the widget's row vertical alignment is top or middle
      if (freeformWidget.column.row.verticalAlignment.value == VerticalAlign.Top ||
        freeformWidget.column.row.verticalAlignment.value == VerticalAlign.Middle) {

        // Size the widget from the bottom
        freeformWidget.sizeBottom(maxHeight, minHeight, maxRowHeight, previousHeight);
      } else {
        // Size the widget from the top
        freeformWidget.sizeTop(maxHeight, minHeight, maxRowHeight, previousHeight);
      }

      // Update the number field with the new value
      numberField.value = Math.round(freeformWidget.height);
    }
  }


  setDimensions(proportionalWidget: ProportionalWidgetComponent) {
    // We are setting up the parameters to be passed into the setDimensions method
    let columnWidth: number = proportionalWidget.column.columnElement.clientWidth;
    let maxRowHeight: number = proportionalWidget.getMaxRowHeight();
    let maxHeight: number = proportionalWidget.column.row.verticalAlignment.value == VerticalAlign.Middle ||
      proportionalWidget.column.row.verticalAlignment.value == VerticalAlign.Bottom ? proportionalWidget.getMaxHeight() : Infinity;
    let previousHeight: number = proportionalWidget.widgetElement.nativeElement.getBoundingClientRect().height;

    // Set the dimensions
    proportionalWidget.setDimensions(columnWidth, maxRowHeight, maxHeight, previousHeight);
  }
}