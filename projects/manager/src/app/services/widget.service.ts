import { Injectable } from '@angular/core';
import { WidgetCursor } from '../classes/widget-cursor';
import { WidgetComponent } from '../shared-components/designer/widgets/widget/widget.component';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  public currentWidgetCursor: WidgetCursor;
  public selectedWidget: WidgetComponent;
  public currentContainer: HTMLElement;
  public currentContainerSet: boolean;
  public currentColumn: HTMLElement;
  public currentColumnSet: boolean;
  public overColumn: boolean;
  public buttonClasses: DocumentFragment;


  constructor() { }
}
