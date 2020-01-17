import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ViewEncapsulation, ElementRef, Type } from '@angular/core';
import { ButtonWidgetComponent } from './widgets/button-widget/button-widget.component';
import { ContainerWidgetComponent } from './widgets/container-widget/container-widget.component';
import { ImageWidgetComponent } from './widgets/image-widget/image-widget.component';
import { LineWidgetComponent } from './widgets/line-widget/line-widget.component';
import { TextWidgetComponent } from './widgets/text-widget/text-widget.component';
import { DragIcon } from '../../classes/drag-icon';
import { WidgetIcon } from '../../classes/widget-icon';
import { RowComponent } from './row/row.component';

@Component({
  selector: 'designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DesignerComponent implements OnInit {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;
  @ViewChild('dragIconElement', { static: false }) dragIconElement: ElementRef;
  @ViewChild('content', { static: false }) content: ElementRef;
  @ViewChild('canvasElement', { static: false }) canvas: ElementRef;
  @ViewChild('widthDisplay', { static: false }) widthDisplay: ElementRef;

  public widgetIcons: Array<WidgetIcon>;
  public showPublishMenu: boolean;
  public currentWidget: any;
  
  
  
  // public dragIcon: DragIcon = new DragIcon();
  // public get isDragIconInBounds(): boolean {
  //   return this.dragIcon.rect.x >= this.content.nativeElement.offsetLeft &&
  //     this.dragIcon.rect.x + this.dragIcon.rect.width <= this.content.nativeElement.clientWidth + this.content.nativeElement.offsetLeft &&
  //     this.dragIcon.rect.y >= this.content.nativeElement.offsetTop && 
  //     this.dragIcon.rect.y < this.content.nativeElement.clientHeight + this.content.nativeElement.offsetTop - this.dragIcon.rect.height;
  // }

  public contentWidth: number = 1496;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    // this.dragIcon.rect = {
    //   x: 0,
    //   y: 0,
    //   width: 40,
    //   height: 40
    // };

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

  ngAfterViewInit() {
    // this.widthDisplay.nativeElement.value = this.canvas.nativeElement.clientWidth;
  }


  // createWidget(widgetType: Type<Component>) {
  //   let foo = this.resolver.resolveComponentFactory(ButtonWidgetComponent);
  //   let button = foo.create(this.viewContainerRef.injector);
  //   button.changeDetectorRef.detectChanges();


  //   let componentFactory = this.resolver.resolveComponentFactory(RowComponent);
  //   this.viewContainerRef.createComponent(componentFactory, null, null, [[button.location.nativeElement]]);
  // }

  onWidgetIconMousedown(e: MouseEvent, widget: any) {
    this.currentWidget = widget.component;
    // let offsetX: number;
    // let offsetY: number;

    // // Reset the drag icon position
    // this.dragIcon.rect.x = 0;
    // this.dragIcon.rect.y = 0;

    // window.setTimeout(() => {
    //   // Reset the drag icon element position
    //   this.dragIconElement.nativeElement.style.left = 0;
    //   this.dragIconElement.nativeElement.style.top = 0;

    //   this.dragIconElement.nativeElement.innerHTML = widget.html;

    //   // Set the offsets
    //   offsetX = -this.dragIconElement.nativeElement.getBoundingClientRect().x;
    //   offsetY = -this.dragIconElement.nativeElement.getBoundingClientRect().y;

    //   // Calculate the drag icon position
    //   this.dragIcon.rect.x = offsetX + e.clientX - this.dragIcon.rect.width * 0.5;
    //   this.dragIcon.rect.y = offsetY + e.clientY - this.dragIcon.rect.height * 0.5;
    // });

    // // Show the drag icon
    // this.dragIcon.show = true;

    // // On Mousemove
    // let onMousemove = (e: MouseEvent) => {
    //   // drag icon follows the cursor
    //   this.dragIcon.rect.x = offsetX + e.clientX - this.dragIcon.rect.width * 0.5;
    //   this.dragIcon.rect.y = offsetY + e.clientY - this.dragIcon.rect.height * 0.5;

      
    // }


    // // On Mouseup
    // let onMouseup = () => {
    //   window.removeEventListener("mousemove", onMousemove);
    //   window.removeEventListener("mouseup", onMouseup);
    //   this.dragIcon.show = false;

    //   if (this.isDragIconInBounds) {
    //     // this.createWidget(widget.component);
    //   }
    // }

    // // Add event listeners that will listen for a mousemove to move the drag icon and a mouseup to create the widget
    // window.addEventListener("mousemove", onMousemove);
    // window.addEventListener("mouseup", onMouseup);
  }




  onSizingBarMousedown(e: any, direction: number) {
    let mousePos = e.clientX;

    // On Mousemove
    let onMousemove = (e: any) => {
      let delta = mousePos - e.clientX;
      mousePos = e.clientX;

      this.canvas.nativeElement.style.width = (this.canvas.nativeElement.clientWidth + delta * direction * 2) + 'px';
      this.widthDisplay.nativeElement.value = this.canvas.nativeElement.clientWidth;
    }


    // On Mouseup
    let onMouseup = () => {
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("mouseup", onMouseup);
    }


    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);
  }

  onWidthDisplayKeydown(event: any) {
    if (event.keyCode == 13) {
      this.canvas.nativeElement.style.width = event.target.value + 'px';
    } else if (event.keyCode == 38) {
      event.target.value = Number.parseInt(event.target.value) + 1;
      this.canvas.nativeElement.style.width = event.target.value + 'px';
    } else if (event.keyCode == 40) {
      event.target.value = Number.parseInt(event.target.value) - 1;
      this.canvas.nativeElement.style.width = event.target.value + 'px';
    }
  }


}