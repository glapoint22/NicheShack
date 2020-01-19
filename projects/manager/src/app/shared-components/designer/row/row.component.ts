import { Component, Output, EventEmitter, ComponentFactoryResolver, ViewChild, ViewContainerRef, Type } from '@angular/core';
import { WidgetService } from '../../../services/widget.service';

@Component({
  selector: 'row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;
  @Output() onRowSelected: EventEmitter<RowComponent> = new EventEmitter();
  @Output() shiftRows: EventEmitter<number> = new EventEmitter();
  public top: number;
  private columns: Array<HTMLElement> = new Array<HTMLElement>();

  constructor(private resolver: ComponentFactoryResolver, private widgetService: WidgetService) { }


  onRowMoveMousedown(event) {
    let offset = event.clientY - this.top;
    let currentPos = this.top;

    // Emit that this row has been selected
    this.onRowSelected.emit(this);

    // Mousemove
    let onMousemove = (e: MouseEvent) => {
      this.top = e.clientY - offset;

      let delta = this.top - currentPos;
      currentPos = this.top;

      // Shift neighboring rows up or down if this rows collides with them
      this.shiftRows.emit(Math.sign(delta));
    }

    // Mouseup
    let onMouseup = () => {
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("mouseup", onMouseup);

    }

    // Add the listeners
    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);
  }




  addWidget(element: HTMLElement) {
    let componentFactory = this.resolver.resolveComponentFactory(this.widgetService.currentWidget.component);
    let componentRef = this.viewContainerRef.createComponent(componentFactory);

    // New column
    let column = document.createElement('div');
    column.id = 'column';

    // Add this column to the columns array
    this.columns.push(column);

    // Add or update each column with the correct col class based on the number of columns in this row
    this.columns.forEach((column: HTMLElement) => {
      column.setAttribute('class', 'col-' + Math.max(2, Math.floor(12 / this.columns.length)));
    });

    // Append the widget within the column
    column.appendChild(componentRef.location.nativeElement);
    this.viewContainerRef.element.nativeElement.parentElement.insertBefore(column, element);

    // Add the drop indicators
    for (let i = 0; i < 2; i++) {
      let dropIndicator = document.createElement('div');
      dropIndicator.classList.add('drop-indicator');

      // Show the allowed cursor when entering the drop indicator
      dropIndicator.addEventListener('mouseenter', () => {
        if (this.widgetService.currentWidget) {
          document.body.style.cursor = 'url("assets/' + this.widgetService.currentWidget.allowedCursor + '"), auto'
        }
      });

      // Show the not allowed cursor when leaving the drop indicator
      dropIndicator.addEventListener('mouseleave', () => {
        if (this.widgetService.currentWidget) {
          document.body.style.cursor = 'url("assets/' + this.widgetService.currentWidget.notAllowedCursor + '"), auto'
        }
      });

      // Append the drop indicator to the column
      column.appendChild(dropIndicator);
    }

    // Mouseup
    column.addEventListener('mouseup', (e: any) => {
      if (this.widgetService.currentWidget) {
        let leftDropIndicator = e.currentTarget.lastElementChild.previousElementSibling.getBoundingClientRect();
        let rightDropIndicator = e.currentTarget.lastElementChild.getBoundingClientRect();

        // Mouseup on left drop indicator
        if (e.clientX >= leftDropIndicator.x && e.clientX < leftDropIndicator.x + leftDropIndicator.width) {
          this.addWidget(e.currentTarget);

          // Mouseup on right drop indicator
        } else if (e.clientX >= rightDropIndicator.x && e.clientX < rightDropIndicator.x + rightDropIndicator.width) {
          this.addWidget(e.currentTarget.nextElementSibling);
        }

        // Clear current widget
        this.widgetService.currentWidget = null;
      }
    });

    // Show the not allowed cursor when entering the column
    column.addEventListener('mouseenter', () => {
      if (this.widgetService.currentWidget) {
        document.body.style.cursor = 'url("assets/' + this.widgetService.currentWidget.notAllowedCursor + '"), auto';
        document.body.classList.add('over-row');
      }
    });


    // Emit that this row has been selected
    this.onRowSelected.emit(this);

    // Shift rows down if this row collides with its neighboring rows
    this.shiftRows.emit(1);
  }
}