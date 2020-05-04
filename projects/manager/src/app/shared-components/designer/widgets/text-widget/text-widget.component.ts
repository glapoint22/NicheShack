import { Component, ViewChild, ElementRef, ApplicationRef } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { TextBox } from 'projects/manager/src/app/classes/text-box';
import { Color } from 'projects/manager/src/app/classes/color';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { PaddingTop } from 'projects/manager/src/app/classes/padding-top';
import { PaddingRight } from 'projects/manager/src/app/classes/padding-right';
import { PaddingBottom } from 'projects/manager/src/app/classes/padding-bottom';
import { PaddingLeft } from 'projects/manager/src/app/classes/padding-left';
import { BreakpointsComponent } from 'projects/manager/src/app/classes/breakpoints-component';

@Component({
  selector: 'text-widget',
  templateUrl: './text-widget.component.html',
  styleUrls: ['./text-widget.component.scss']
})
export class TextWidgetComponent extends FreeformWidgetComponent implements BreakpointsComponent {
  @ViewChild('iframe', { static: false }) iframe: ElementRef;
  private textBox: TextBox;
  private fixedHeight: number;
  private bottomHandleMove: boolean;
  public handleMove: boolean;
  private content: HTMLElement;
  public document: Document = document;
  public iframeHeight: number;
  private defaultColor: Color = new Color(0, 0, 0, 1);
  public paddingTop: PaddingTop = new PaddingTop();
  public paddingRight: PaddingRight = new PaddingRight();
  public paddingBottom: PaddingBottom = new PaddingBottom();
  public paddingLeft: PaddingLeft = new PaddingLeft();

  constructor(widgetService: WidgetService,
    breakpointService: BreakpointService,
    private applicationRef: ApplicationRef,
    public _FormService: FormService) { super(widgetService, breakpointService) }

  ngOnInit() {
    this.height = 64;
    this.fixedHeight = this.height;
    super.ngOnInit();
  }

  ngAfterViewInit() {
    this.iframe.nativeElement.srcdoc = document.createElement('div').outerHTML;
    this.iframe.nativeElement.onload = (event) => {
      let contentDocument: Document = event.currentTarget.contentDocument;
      this.content = contentDocument.body.firstElementChild as HTMLElement;

      this.textBox = new TextBox(contentDocument, this.applicationRef, this.defaultColor);
      this.textBox.onChange.subscribe(() => {
        let contentHeight = this.getContentHeight();
        let previousHeight = this.height;

        this.height = Math.max(contentHeight, this.fixedHeight);

        this.column.row.positionNextRow(this.height - previousHeight);
      });
    }
  }


  // -----------------------------( ON EDIT )------------------------------ \\
  onEdit() {
    this._FormService.textBox = this.textBox;
    this._FormService.horizontalAlignment = this.horizontalAlignment;

    // Open the text form
    this._FormService.showTextForm = true;
  }

  onHandleMousedown(handle: string) {
    this.handleMove = true;
    if (handle == 'bottom') this.bottomHandleMove = true;
    super.onHandleMousedown(handle)
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

  showCover() {
    if (this.widgetService.selectedWidget != this) {
      this._FormService.showTextForm = false;
      this.textBox.removeSelection();
    }

    return !this._FormService.showTextForm || this.handleMove || document.body.id == 'column-resize' || document.body.id == 'widget-cursor' || this.widgetService.selectedWidget != this;
  }

  ngDoCheck() {
    this.iframeHeight = Math.max(this.height, this.getContentHeight());

    // Set the padding
    if (this.content) {
      this.content.style.paddingTop = this.paddingTop.value;
      this.content.style.paddingRight = this.paddingRight.value;
      this.content.style.paddingBottom = this.paddingBottom.value;
      this.content.style.paddingLeft = this.paddingLeft.value;
    }
  }


  buildHTML(parent: HTMLElement) {
    let text = document.createElement('div');
    let links = text.getElementsByTagName('a');

    // Styles
    text.style.fontFamily = 'Arial, Helvetica, sans-serif';
    text.style.fontSize = '14px';
    text.style.color = this.defaultColor.toRGBString();
    if (this.width) text.style.maxWidth = this.width + 'px';
    // this.horizontalAlignment.applyStyle(text);
    text.style.width = '100%';
    text.style.lineHeight = 'normal';

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

    // Set the classes
    this.breakpointService.setBreakpointClasses(this, text);

    // Append the text to the parent
    parent.appendChild(text);
  }
}