import { Component, ViewChild } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { FillColor } from 'projects/manager/src/app/classes/fill-color';
import { Border } from 'projects/manager/src/app/classes/border';
import { Corners } from 'projects/manager/src/app/classes/corners';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { Color } from 'projects/manager/src/app/classes/color';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { ContainerComponent } from '../../container/container.component';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { PaddingTop } from 'projects/manager/src/app/classes/padding-top';
import { PaddingRight } from 'projects/manager/src/app/classes/padding-right';
import { PaddingBottom } from 'projects/manager/src/app/classes/padding-bottom';
import { PaddingLeft } from 'projects/manager/src/app/classes/padding-left';

@Component({
  selector: 'container-widget',
  templateUrl: './container-widget.component.html',
  styleUrls: ['./container-widget.component.scss']
})
export class ContainerWidgetComponent extends FreeformWidgetComponent {
  @ViewChild('container', { static: false }) container: ContainerComponent;
  public fill: FillColor = new FillColor();
  public border: Border = new Border();
  public corners: Corners = new Corners();
  public shadow: Shadow = new Shadow();
  public paddingTop: PaddingTop = new PaddingTop();
  public paddingRight: PaddingRight = new PaddingRight();
  public paddingBottom: PaddingBottom = new PaddingBottom();
  public paddingLeft: PaddingLeft = new PaddingLeft();
  // private fixedHeight: number;

  constructor(widgetService: WidgetService,
    breakpointService: BreakpointService,
    public _FormService: FormService) { super(widgetService, breakpointService) }

  ngOnInit() {
    // this.fixedHeight = this.height = 250;
    this.height = 250
    super.ngOnInit();
  }


  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {
    this._FormService.fill = this.fill;
    this._FormService.border = this.border;
    this._FormService.corners = this.corners;
    this._FormService.shadow = this.shadow;
    this._FormService.horizontalAlignment = this.horizontalAlignment;

    // Open the container form
    this._FormService.showContainerForm = true;
  }


  // -------------------------------------------------( GET BORDER COLOR )-----------------------------------------------\\
  getBorderColor() {
    return Color.RGBAToHexA(this.border.color);
  }


  // -------------------------------------------------( GET SHADOW COLOR )-----------------------------------------------\\
  getShadowColor() {
    return Color.RGBAToHexA(this.shadow.color);
  }



  getMinHeight(): number {
    if (this.container.rows.length == 0) return 20;

    let index = this.container.rows.length - 1;

    return this.container.rows[index].component.top + this.container.rows[index].element.firstElementChild.clientHeight;
  }

  // onHeightChange(value: number) {
  //   // Set the height and force detection change
  //   this.height += value;
  //   this.height = Math.max(this.height, this.fixedHeight);
  //   this.applicationRef.tick();

  //   // Check the height for the parent container
  //   this.column.row.container.checkHeightChange();
  //   this.column.row.container.collisionDown();
  // }


  // onBottomHandleMousedown() {
  //   super.onBottomHandleMousedown();

  //   let onMousemove = (e: MouseEvent) => {
  //     // Reset the fixed height
  //     this.fixedHeight = this.height;
  //   }

  //   let onMouseup = () => {
  //     this.mouseUp(onMousemove, onMouseup);
  //   }

  //   this.addEventListeners(onMousemove, onMouseup);
  // }

  // setWidth(startWidth: number, percent: number) {
  //   super.setWidth(startWidth, percent);

  //   // Check to see if any proportional widgets have changed the container height
  //   this.container.checkHeightChange();
  // }

  buildHTML(parent: HTMLElement) {
    // Build the grid
    this.container.buildHTML(parent);

    // Get the container
    let container = parent.firstElementChild as HTMLElement;

    // Add width and height styles
    if (this.width) container.style.maxWidth = this.width + 'px';
    container.style.minHeight = this.height + 'px';

    // Add fill if applied
    if (this.fill.apply) this.fill.applyColor(container);

    // Other styles
    this.border.applyStyle(container);
    this.corners.applyStyle(container);
    this.shadow.applyStyle(container);

    // Set the breakpoint classes
    this.breakpointService.setBreakpointClasses(this, container);
  }
}