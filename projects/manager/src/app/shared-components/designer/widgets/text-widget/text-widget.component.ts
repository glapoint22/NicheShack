import { Component, ViewChild, ElementRef, ApplicationRef } from '@angular/core';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { TextBox } from 'projects/manager/src/app/classes/text-box';
import { Color } from 'classes/color';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { BreakpointsComponent } from 'projects/manager/src/app/classes/breakpoints-component';
import { WidgetType } from 'classes/widget-type';
import { Padding } from 'projects/manager/src/app/classes/padding';
import { BreakpointsPaddingComponent } from 'projects/manager/src/app/classes/breakpoints-padding-component';
import { Background } from 'projects/manager/src/app/classes/background';
import { TextWidgetData } from 'projects/manager/src/app/classes/text-widget-data';
import { BreakpointData } from 'classes/breakpoint-data';

@Component({
  selector: 'text-widget',
  templateUrl: './text-widget.component.html',
  styleUrls: ['./text-widget.component.scss']
})
export class TextWidgetComponent extends FreeformWidgetComponent implements BreakpointsComponent, BreakpointsPaddingComponent {
  @ViewChild('iframe', { static: false }) iframe: ElementRef;
  public textBox: TextBox;
  private fixedHeight: number;
  private bottomHandleMove: boolean;
  public handleMove: boolean;
  private content: HTMLElement;
  public document: Document = document;
  public iframeHeight: number;
  private defaultColor: Color = new Color(0, 0, 0, 1);
  public padding: Padding = new Padding();
  public background: Background = new Background();
  public inEditMode: boolean;
  private htmlContent: string;

  constructor(
    breakpointService: BreakpointService,
    private applicationRef: ApplicationRef
  ) { super(breakpointService) }

  ngOnInit() {
    this.height = 64;
    this.fixedHeight = this.height;
    this.name = this.defaultName = 'Text';
    this.type = WidgetType.Text;
    this.background.color = new Color(255, 255, 255, 1);
    super.ngOnInit();
  }

  ngAfterViewInit() {
    this.iframe.nativeElement.srcdoc = document.createElement('div').outerHTML;
    this.iframe.nativeElement.onload = (event) => {
      let contentDocument: Document = event.currentTarget.contentDocument;
      this.content = contentDocument.body.firstElementChild as HTMLElement;

      this.textBox = new TextBox(contentDocument, this.applicationRef, this.defaultColor);

      if (this.htmlContent) {
        this.textBox.content.innerHTML = this.htmlContent;
        this.textBox.initialize();
      }



      window.focus();


      this.textBox.onChange.subscribe(() => {
        let contentHeight = this.textBox.getContentHeight();
        let previousHeight = this.height;

        this.height = Math.max(contentHeight, this.fixedHeight);

        this.column.row.positionNextRow(this.height - previousHeight);
        this.column.row.container.save();
      });
    }
  }


  onHandleMousedown(handle: string, event: MouseEvent) {
    this.handleMove = true;
    if (handle == 'bottom') this.bottomHandleMove = true;
    super.onHandleMousedown(handle, event)
  }

  mouseUp(onMousemove, onMouseup) {
    this.handleMove = false;
    super.mouseUp(onMousemove, onMouseup);

    if (this.bottomHandleMove) {
      this.bottomHandleMove = false;
      this.fixedHeight = this.height;
    }
  }



  getMinHeight(): number {
    return Math.max(this.textBox.getContentHeight(), 22);
  }



  ngDoCheck() {
    if (this.textBox) this.iframeHeight = Math.max(this.height, this.textBox.getContentHeight());


    // Set to be out of edit mode & remove selection
    if (this.textBox && this.column.row.pageService.selectedWidget != this) {
      this.textBox.removeSelection();
      this.inEditMode = false
    }

    // Set the padding
    if (this.content) {
      this.content.style.paddingTop = this.padding.top.value;
      this.content.style.paddingRight = this.padding.right.value;
      this.content.style.paddingBottom = this.padding.bottom.value;
      this.content.style.paddingLeft = this.padding.left.value;
    }
  }

  setEditMode() {
    if (this.inEditMode) {
      this.inEditMode = false;
      this.textBox.removeSelection();
    } else {
      this.inEditMode = true;
      this.textBox.selectContents();
    }

  }


  setData(widgetData: TextWidgetData) {
    this.htmlContent = widgetData.htmlContent;
    if (widgetData.height) this.fixedHeight = widgetData.height;

    this.background.setData(widgetData.background);
    this.padding.setData(widgetData.padding);

    super.setData(widgetData);
  }




  getData(): TextWidgetData {
    let widgetData = super.getData();

    return {
      name: this.name != this.defaultName ? this.name : null,
      widgetType: widgetData.widgetType,
      width: widgetData.width,
      height: widgetData.height,
      horizontalAlignment: widgetData.horizontalAlignment,
      background: this.background.getData(),
      padding: this.padding.getData(this.breakpoints),
      breakpoints: this.getBreakpointData(widgetData.breakpoints),
      htmlContent: this.textBox && this.textBox.content.innerHTML ? this.textBox.content.innerHTML : null
    }
  }





  getBreakpointData(breakpointData: Array<BreakpointData>): Array<BreakpointData> {
    // Padding
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.padding.top);
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.padding.right);
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.padding.bottom);
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.padding.left);

    return breakpointData;
  }





  buildPreview(parent: HTMLElement) {
    let text = document.createElement('div');

    // Styles
    text.style.fontFamily = 'Arial, Helvetica, sans-serif';
    text.style.fontSize = '14px';
    text.style.color = this.defaultColor.toRGBString();
    if (this.width) text.style.maxWidth = this.width + 'px';
    text.style.width = '100%';
    text.style.minHeight = this.height + 'px';
    text.style.lineHeight = 'normal';

    // Background
    this.background.applyStyles(text);

    // The content
    text.innerHTML = this.content.innerHTML;


    // Add the padding classes to the text element
    this.padding.addClasses(this.breakpoints, text, this.padding.getValues());

    super.buildPreview(parent, text);
  }
}