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
  public inEditMode: boolean;
  private textBox: TextBox;

  constructor(widgetService: WidgetService, private applicationRef: ApplicationRef, public _FormService: FormService) { super(widgetService) }

  ngOnInit() {
    this.height = 80;
    super.ngOnInit();
  }

  ngAfterViewInit() {
    this.iframe.nativeElement.srcdoc = document.createElement('div').outerHTML;
    this.iframe.nativeElement.onload = (event) => {
      this.textBox = new TextBox(event.currentTarget.contentDocument, this.applicationRef, new Color(0, 0, 0, 1));
    }
  }


  // -----------------------------( ON EDIT )------------------------------ \\
  onEdit() {
    this._FormService.textBox = this.textBox;
    this._FormService.margins = this.margins;

    // Open the text form
    this._FormService.showTextForm = true;
    this.inEditMode = true;
    this.textBox.selectContents();
  }
}