import { Component } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { FillColor } from 'projects/manager/src/app/classes/fill-color';
import { Border } from 'projects/manager/src/app/classes/border';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { BreakpointsComponent } from 'projects/manager/src/app/classes/breakpoints-component';

@Component({
  selector: 'line-widget',
  templateUrl: './line-widget.component.html',
  styleUrls: ['./line-widget.component.scss']
})
export class LineWidgetComponent extends FreeformWidgetComponent implements BreakpointsComponent {
  public fill: FillColor = new FillColor();
  public border: Border = new Border();
  public shadow: Shadow = new Shadow();

  constructor(widgetService: WidgetService,
    breakpointService: BreakpointService,
    public _FormService: FormService) { super(widgetService, breakpointService) }

  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {
    this._FormService.fill = this.fill;
    this._FormService.border = this.border;
    this._FormService.shadow = this.shadow;
    this._FormService.horizontalAlignment = this.horizontalAlignment;

    // Open the line form
    this._FormService.showLineForm = true;
  }


  buildHTML(parent: HTMLElement) {
    let lineContainer = document.createElement('div');

    // This is the line container
    if (this.width) lineContainer.style.maxWidth = this.width + 'px';
    lineContainer.style.height = '20px';
    lineContainer.style.display = 'flex';
    lineContainer.style.alignItems = 'center';
    lineContainer.style.width = '100%';

    // Create the line and set styles
    let line = document.createElement('div');
    line.style.width = '100%';
    line.style.borderBottom = this.border.width + 'px ' + this.border.style + ' ' + this.fill.color.toHexA();
    this.shadow.applyStyle(line);

    // Set the classes
    this.breakpointService.setBreakpointClasses(this, lineContainer);

    lineContainer.appendChild(line);
    parent.appendChild(lineContainer);
  }
}