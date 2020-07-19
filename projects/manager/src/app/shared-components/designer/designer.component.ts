import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit, HostListener } from '@angular/core';
import { WidgetCursor } from '../../classes/widget-cursor';
import { ContainerComponent } from './container/container.component';
import { PageService } from '../../services/page.service';
import { BreakpointService } from '../../services/breakpoint.service';
import { PromptService } from '../../services/prompt.service';

@Component({
  selector: 'designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DesignerComponent implements AfterViewInit {
  @ViewChild('contentElement', { static: false }) contentElement: ElementRef;
  @ViewChild('canvasElement', { static: false }) canvasElement: ElementRef;
  @ViewChild('designAreaDropdown', { static: false }) designAreaDropdown: ElementRef;
  @ViewChild('rootContainer', { static: false }) rootContainer: ContainerComponent;
  @ViewChild('workArea', { static: false }) workArea: ElementRef;
  @ViewChild('designAreaContainer', { static: false }) designAreaContainer: ElementRef;
  @ViewChild('PropertiesEditorContainer', { static: false }) PropertiesEditorContainer: ElementRef;
  public widgetCursors: Array<WidgetCursor>;


  constructor(
    public pageService: PageService,
    private breakpointService: BreakpointService,
    private promptService: PromptService
  ) { }

  ngOnInit() {
    this.pageService.clearPage();
    this.pageService.page.widgetCursors = []
  }


  ngAfterViewInit() {
    this.pageService.page.rootContainer = this.rootContainer;
  }


  // -----------------------------( ON WIDGET ICON MOUSE DOWN )------------------------------ \\
  onWidgetIconMousedown(e: MouseEvent, widgetCursor: WidgetCursor) {
    this.pageService.currentWidgetCursor = widgetCursor;
    document.body.style.cursor = 'url("assets/' + widgetCursor.notAllowed + '"), auto';
    document.body.id = 'widget-cursor';

    // On Mouseup
    let onMouseup = () => {
      window.removeEventListener("mouseup", onMouseup);
      this.pageService.currentWidgetCursor = null;
      document.body.removeAttribute('style');
      document.body.removeAttribute('id');
      document.body.removeAttribute('class');
    }
    window.addEventListener("mouseup", onMouseup);
  }


  // ------------------( ON DESIGN AREA RESIZER MOUSE DOWN )------------------- \\
  onDesignAreaResizerMousedown(event: any, side: number) {
    let startWidth: number = this.canvasElement.nativeElement.getBoundingClientRect().width;
    let anchorWidth = startWidth * 0.5;
    let offset = this.canvasElement.nativeElement.getBoundingClientRect().left - event.clientX;
    let anchorPoint = this.canvasElement.nativeElement.getBoundingClientRect().left + anchorWidth;

    // Set the body to the resize cursor
    document.body.style.cursor = 'e-resize';

    // On Mousemove
    let onMousemove = (e: any) => {
      let mousePos = side == 1 ? anchorPoint - e.clientX - offset : startWidth - (anchorPoint - e.clientX - offset);
      let percent = mousePos / anchorWidth;


      // Set the width of the canvas
      this.canvasElement.nativeElement.style.maxWidth = (startWidth * percent) + 'px';


      // Alert that the canvas width has changed
      this.breakpointService.onCanvasWidthChange.next(this.contentElement.nativeElement.getBoundingClientRect().width);
    }

    // On Mouseup
    let onMouseup = () => {
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("mouseup", onMouseup);
      document.body.removeAttribute('style');
    }

    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);
  }



  // ------------------( ON DELETE KEYDOWN )------------------- \\
  @HostListener('document:keydown.delete')
  onDeleteKeydown() {
    window.setTimeout(() => {
      if (!this.promptService.show) {
        if (this.pageService.selectedWidget) {

          // Delete widget
          this.promptService.showPrompt('Delete Widget', 'Are you sure you want to delete this widget?', this.deleteWidget, this);



          // Delete row
        } else if (this.pageService.selectedRow) {
          this.promptService.showPrompt('Delete Row', 'Are you sure you want to delete this row?', this.deleteRow, this);
        }
      }
    });
  }



  // ------------------( DELETE WIDGET )------------------- \\
  deleteWidget() {
    // Test to see if we need to delete the widget or the whole row
    if (this.pageService.selectedWidget.column.row.columns.length == 1) {
      this.pageService.selectedWidget.column.row.container.deleteRow(this.pageService.selectedWidget.column.row);
    } else {

      this.pageService.selectedWidget.column.row.deleteColumn(this.pageService.selectedWidget.column);
    }
  }




  // ------------------( DELETE ROW )------------------- \\
  deleteRow() {
    this.pageService.selectedRow.container.deleteRow(this.pageService.selectedRow);
  }
}