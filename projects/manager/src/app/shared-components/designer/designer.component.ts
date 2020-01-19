import { Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation, ElementRef } from '@angular/core';
import { ButtonWidgetComponent } from './widgets/button-widget/button-widget.component';
import { ContainerWidgetComponent } from './widgets/container-widget/container-widget.component';
import { ImageWidgetComponent } from './widgets/image-widget/image-widget.component';
import { LineWidgetComponent } from './widgets/line-widget/line-widget.component';
import { TextWidgetComponent } from './widgets/text-widget/text-widget.component';
import { Widget } from '../../classes/widget';
import { WidgetService } from '../../services/widget.service';

@Component({
  selector: 'designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DesignerComponent implements OnInit {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;
  @ViewChild('content', { static: false }) content: ElementRef;
  @ViewChild('canvasElement', { static: false }) canvas: ElementRef;
  @ViewChild('widthDisplay', { static: false }) widthDisplay: ElementRef;

  public widgets: Array<Widget>;
  public showPublishMenu: boolean;
  public contentWidth: number = 1496;

  constructor(private widgetService: WidgetService) { }

  ngOnInit() {
    this.widgets = [
      {
        title: 'Button',
        component: ButtonWidgetComponent,
        icon: '<i class="fab fa-bootstrap"></i>',
        allowedCursor: 'button-widget-allowed.png',
        notAllowedCursor: 'button-widget-not-allowed.png'
      },
      {
        title: 'Text',
        component: TextWidgetComponent,
        icon: '<div class="text-icon">T</div>',
        allowedCursor: 'text-widget-allowed.png',
        notAllowedCursor: 'text-widget-not-allowed.png'
      },
      {
        title: 'Image',
        component: ImageWidgetComponent,
        icon: '<i class="fas fa-image"></i>',
        allowedCursor: 'image-widget-allowed.png',
        notAllowedCursor: 'image-widget-not-allowed.png'
      },
      {
        title: 'Container',
        component: ContainerWidgetComponent,
        icon: '<i class="fas fa-box-open"></i>',
        allowedCursor: 'container-widget-allowed.png',
        notAllowedCursor: 'container-widget-not-allowed.png'
      },
      {
        title: 'Line',
        component: LineWidgetComponent,
        icon: '<i class="fas fa-slash"></i>',
        allowedCursor: 'line-widget-allowed.png',
        notAllowedCursor: 'line-widget-not-allowed.png'
      }
    ]
  }

  ngAfterViewInit() {
    this.widthDisplay.nativeElement.value = this.canvas.nativeElement.clientWidth;
  }

  onWidgetIconMousedown(e: MouseEvent, widget: Widget) {
    this.widgetService.currentWidget = widget;
    document.body.style.cursor = 'url("assets/' + widget.notAllowedCursor + '"), auto';
    document.body.id = 'widget-cursor';

    // On Mouseup
    let onMouseup = () => {
      window.removeEventListener("mouseup", onMouseup);
      this.widgetService.currentWidget = null;
      document.body.removeAttribute('style');
      document.body.removeAttribute('id');
    }

    window.addEventListener("mouseup", onMouseup);
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

  setCursor(allowed: boolean) {
    if (this.widgetService.currentWidget) {
      if (allowed) {
        document.body.style.cursor = 'url("assets/' + this.widgetService.currentWidget.allowedCursor + '"), auto';
      } else {
        document.body.style.cursor = 'url("assets/' + this.widgetService.currentWidget.notAllowedCursor + '"), auto';
      }
    }
  }
}