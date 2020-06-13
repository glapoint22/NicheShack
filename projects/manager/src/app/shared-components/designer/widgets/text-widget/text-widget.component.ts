import { Component, ViewChild, ElementRef, ApplicationRef } from '@angular/core';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { TextBox } from 'projects/manager/src/app/classes/text-box';
import { Color } from 'projects/manager/src/app/classes/color';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { BreakpointsComponent } from 'projects/manager/src/app/classes/breakpoints-component';
import { WidgetType } from 'projects/manager/src/app/classes/widget-type';
import { Padding } from 'projects/manager/src/app/classes/padding';
import { BreakpointsPaddingComponent } from 'projects/manager/src/app/classes/breakpoints-padding-component';
import { Background } from 'projects/manager/src/app/classes/background';
import { TextWidgetData } from 'projects/manager/src/app/classes/text-widget-data';
import { ColumnData } from 'projects/manager/src/app/classes/column-data';

@Component({
  selector: 'text-widget',
  templateUrl: './text-widget.component.html',
  styleUrls: ['./text-widget.component.scss']
})
export class TextWidgetComponent extends FreeformWidgetComponent implements BreakpointsComponent, BreakpointsPaddingComponent {
  @ViewChild('iframe', { static: false }) iframe: ElementRef;
  private textBox: TextBox;
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

  constructor(widgetService: WidgetService,
    breakpointService: BreakpointService,
    private applicationRef: ApplicationRef) { super(widgetService, breakpointService) }

  ngOnInit() {
    this.height = 64;
    this.fixedHeight = this.height;
    this.name = 'Text';
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
      if (this.htmlContent) this.textBox.content.innerHTML = this.htmlContent;
      this.textBox.removeSelection();
      window.focus();
      this.textBox.onChange.subscribe(() => {
        let contentHeight = this.getContentHeight();
        let previousHeight = this.height;

        this.height = Math.max(contentHeight, this.fixedHeight);

        this.column.row.positionNextRow(this.height - previousHeight);
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

  getContentHeight() {
    let height: number = 0;

    if (this.content) {
      for (let i = 0; i < this.content.childElementCount; i++) {
        let child = this.content.children[i];

        height += child.clientHeight;
      }
    }


    return height;
  }


  getMinHeight(): number {
    return Math.max(this.getContentHeight(), 22);
  }



  ngDoCheck() {
    this.iframeHeight = Math.max(this.height, this.getContentHeight());

    // Set to be out of edit mode & remove selection
    if (this.textBox && this.widgetService.selectedWidget != this) {
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


  load(widgetData: TextWidgetData) {
    this.htmlContent = widgetData.htmlContent;
    if (widgetData.height) this.fixedHeight = widgetData.height;

    this.background.load(widgetData.background);
    this.padding.load(widgetData.padding);

    super.load(widgetData);
  }




  save(columnData: ColumnData) {
    let textWidgetData = columnData.widgetData = new TextWidgetData();

    // Name
    if (this.name != 'Text') textWidgetData.name = this.name;

    // Background
    this.background.save(textWidgetData.background);


    // Padding
    this.padding.save(textWidgetData.padding, this.breakpoints);
    this.breakpointService.saveBreakpoints(this.breakpoints, textWidgetData.breakpoints, this.padding.top);
    this.breakpointService.saveBreakpoints(this.breakpoints, textWidgetData.breakpoints, this.padding.right);
    this.breakpointService.saveBreakpoints(this.breakpoints, textWidgetData.breakpoints, this.padding.bottom);
    this.breakpointService.saveBreakpoints(this.breakpoints, textWidgetData.breakpoints, this.padding.left);

    // HTML Content
    if (this.htmlContent) textWidgetData.htmlContent = this.htmlContent;


    super.save(columnData);
  }





  buildHTML(parent: HTMLElement) {
    let text = document.createElement('div');
    let links = text.getElementsByTagName('a');

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


    // This will change the href attribute of each link to just the url
    for (let i = 0; i < links.length; i++) {
      let link = links[i];
      let regex = new RegExp(/(?:url":")([a-zA-Z0-9./?=:_&%+-]+)/);
      let url = regex.exec(link.getAttribute('href'))[1];
      link.attributes.removeNamedItem('href');
      link.setAttribute('href', url);
    }

    // This will add padding positions to this component (ie. top, right, bottom, left)
    this.padding.setPaddingComponent(this);

    // Set the classes
    this.breakpointService.setBreakpointClasses(this, text);

    // Append the text to the parent
    parent.appendChild(text);
  }
}