import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ViewEncapsulation, ElementRef, Type } from '@angular/core';
import { ButtonWidgetComponent } from './widgets/button-widget/button-widget.component';
import { ContainerWidgetComponent } from './widgets/container-widget/container-widget.component';
import { ImageWidgetComponent } from './widgets/image-widget/image-widget.component';
import { LineWidgetComponent } from './widgets/line-widget/line-widget.component';
import { TextWidgetComponent } from './widgets/text-widget/text-widget.component';
import { DragIcon } from '../../classes/drag-icon';
import { WidgetIcon } from '../../classes/widget-icon';

@Component({
  selector: 'designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DesignerComponent implements OnInit {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;
  @ViewChild('dragIconElement', { static: false }) dragIconElement: ElementRef;
  public widgetIcons: Array<WidgetIcon>;
  public showPublishMenu: boolean;
  public gridWidth: number = 1496;
  public dragIcon: DragIcon = new DragIcon();
  public get isDragIconInBounds(): boolean {
    return this.dragIcon.rect.x >= 0 &&
      this.dragIcon.rect.x + this.dragIcon.rect.width <= this.gridWidth &&
      this.dragIcon.rect.y >= 0;
  }

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.dragIcon.rect = {
      x: 0,
      y: 0,
      width: 40,
      height: 40
    };

    this.widgetIcons = [
      {
        title: 'Button',
        component: ButtonWidgetComponent,
        html: '<i class="fab fa-bootstrap"></i>'
      },
      {
        title: 'Text',
        component: TextWidgetComponent,
        html: '<div class="text-icon">T</div>'
      },
      {
        title: 'Image',
        component: ImageWidgetComponent,
        html: '<i class="fas fa-image"></i>'
      },
      {
        title: 'Container',
        component: ContainerWidgetComponent,
        html: '<i class="fas fa-box-open"></i>'
      },
      {
        title: 'Line',
        component: LineWidgetComponent,
        html: '<i class="fas fa-slash"></i>'
      }
    ]
  }

  createWidget(widgetType: Type<Component>) {
    let componentFactory = this.resolver.resolveComponentFactory(widgetType);
    this.viewContainerRef.createComponent(componentFactory);
  }

  onWidgetIconMousedown(e: MouseEvent, widget: any) {
    let offsetX: number;
    let offsetY: number;

    // Reset the drag icon position
    this.dragIcon.rect.x = 0;
    this.dragIcon.rect.y = 0;

    window.setTimeout(() => {
      // Reset the drag icon element position
      this.dragIconElement.nativeElement.style.left = 0;
      this.dragIconElement.nativeElement.style.top = 0;

      this.dragIconElement.nativeElement.innerHTML = widget.html;

      // Set the offsets
      offsetX = -this.dragIconElement.nativeElement.getBoundingClientRect().x;
      offsetY = -this.dragIconElement.nativeElement.getBoundingClientRect().y;

      // Calculate the drag icon position
      this.dragIcon.rect.x = offsetX + e.clientX - this.dragIcon.rect.width * 0.5;
      this.dragIcon.rect.y = offsetY + e.clientY - this.dragIcon.rect.height * 0.5;
    });

    // Show the drag icon
    this.dragIcon.show = true;

    // On Mousemove
    let onMousemove = (e: MouseEvent) => {
      // drag icon follows the cursor
      this.dragIcon.rect.x = offsetX + e.clientX - this.dragIcon.rect.width * 0.5;
      this.dragIcon.rect.y = offsetY + e.clientY - this.dragIcon.rect.height * 0.5;
    }


    // On Mouseup
    let onMouseup = () => {
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("mouseup", onMouseup);
      this.dragIcon.show = false;

      if (this.isDragIconInBounds) {
        this.createWidget(widget.component);
      }
    }

    // Add event listeners that will listen for a mousemove to move the drag icon and a mouseup to create the widget
    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);
  }
}