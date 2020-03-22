import { Component, ViewChild, ElementRef, ApplicationRef } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { TextBox } from 'projects/manager/src/app/classes/text-box';
import { Color } from 'projects/manager/src/app/classes/color';

@Component({
  selector: 'text-widget',
  templateUrl: './text-widget.component.html',
  styleUrls: ['./text-widget.component.scss']
})
export class TextWidgetComponent extends FreeformWidgetComponent {
  @ViewChild('iframe', { static: false }) iframe: ElementRef;
  private textBox: TextBox;
  private fixedHeight: number;
  private bottomHandleMove: boolean;
  public handleMove: boolean;
  private content: HTMLElement;

  constructor(widgetService: WidgetService, private applicationRef: ApplicationRef, public _FormService: FormService) { super(widgetService) }

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

      this.textBox = new TextBox(contentDocument, this.applicationRef, new Color(0, 0, 0, 1));
      this.textBox.onChange.subscribe(() => {
        let contentHeight = this.getContentHeight();
        this.height = Math.max(contentHeight, this.fixedHeight);

        // Check for collision
        window.setTimeout(() => {
          this.column.row.container.collisionDown();
          this.applicationRef.tick();
        });

      });
    }
  }


  // -----------------------------( ON EDIT )------------------------------ \\
  onEdit() {
    this._FormService.textBox = this.textBox;
    this._FormService.margins = this.margins;

    // Open the text form
    this._FormService.showTextForm = true;
    this.textBox.selectContents();
  }

  onHandleMove(handle: string) {
    this.handleMove = true;
    if (handle == 'bottom') this.bottomHandleMove = true;
    super.onHandleMove(handle)
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
    for (let i = 0; i < this.content.childElementCount; i++) {
      let child = this.content.children[i];

      height += child.clientHeight;
    }

    return height;
  }


  getMinHeight(): number {
    return this.getContentHeight();
  }

}