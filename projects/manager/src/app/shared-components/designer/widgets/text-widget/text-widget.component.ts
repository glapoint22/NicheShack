import { Component } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { WidgetComponent } from '../widget/widget.component';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';

@Component({
  selector: 'text-widget',
  templateUrl: './text-widget.component.html',
  styleUrls: ['./text-widget.component.scss']
})
export class TextWidgetComponent extends WidgetComponent {
  constructor(widgetService: WidgetService, public _FormService: FormService) { super(widgetService)}

  public textForm: any = {open: false}


  // --------------------------Text--------------------------- \\
  public text: any = {caption: "Button", 
                      fontFamily: "Arial, Helvetica, sans-serif", 
                      fontSize: 30, 
                      fontWeight: "normal", 
                      fontStyle: "normal", 
                      color: {r: 0, g: 255, b: 255, a: 1}, 
                      highlightColor: {r: 255, g: 255, b: 255, a: 1}};

  // --------------------------Margins--------------------------- \\
  public margins: any = {top: 0, 
                         right: 0, 
                         bottom: 0, 
                         left: 0};

  
  onEdit() {
    // this._FormService.textForm = this.textForm;

    // Fix this!!! Son of a Bitch!
    // this._FormService.buttonText = this.text;

    this._FormService.margins = this.margins;
    
    // Open the text form
    this.textForm.open = true;
  }
}
