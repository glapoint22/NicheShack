import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit, HostListener } from '@angular/core';
import { WidgetCursor } from '../../classes/widget-cursor';
import { WidgetService } from '../../services/widget.service';
import { ContainerComponent } from './container/container.component';
import { PageService } from '../../services/page.service';
import { BreakpointService } from '../../services/breakpoint.service';

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


  constructor(public widgetService: WidgetService, public pageService: PageService, private breakpointService: BreakpointService) { }

  ngOnInit() {
    this.pageService.clearPage();
    this.pageService.page.widgetCursors = []
  }


  ngAfterViewInit() {
    this.pageService.page.rootContainer = this.rootContainer;
  }


  // -----------------------------( ON WIDGET ICON MOUSE DOWN )------------------------------ \\
  onWidgetIconMousedown(e: MouseEvent, widgetCursor: WidgetCursor) {
    this.widgetService.currentWidgetCursor = widgetCursor;
    document.body.style.cursor = 'url("assets/' + widgetCursor.notAllowed + '"), auto';
    document.body.id = 'widget-cursor';

    // On Mouseup
    let onMouseup = () => {
      window.removeEventListener("mouseup", onMouseup);
      this.widgetService.currentWidgetCursor = null;
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

  @HostListener('document:keydown.delete')
  onDeleteKeydown() {
    if (this.widgetService.selectedWidget) {
      this.widgetService.selectedWidget.column.row.deleteColumn(this.widgetService.selectedWidget.column);
    }
  }
}