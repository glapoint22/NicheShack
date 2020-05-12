import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ButtonWidgetComponent } from './widgets/button-widget/button-widget.component';
import { ContainerWidgetComponent } from './widgets/container-widget/container-widget.component';
import { ImageWidgetComponent } from './widgets/image-widget/image-widget.component';
import { LineWidgetComponent } from './widgets/line-widget/line-widget.component';
import { TextWidgetComponent } from './widgets/text-widget/text-widget.component';
import { WidgetCursor } from '../../classes/widget-cursor';
import { WidgetService } from '../../services/widget.service';
import { ContainerComponent } from './container/container.component';
import { VideoWidgetComponent } from './widgets/video-widget/video-widget.component';
import { ProductGroupWidgetComponent } from './widgets/product-group-widget/product-group-widget.component';
import { CategoriesWidgetComponent } from './widgets/categories-widget/categories-widget.component';
import { CarouselWidgetComponent } from './widgets/carousel-widget/carousel-widget.component';
import { PageService } from '../../services/page.service';
import { BreakpointService } from '../../services/breakpoint.service';

@Component({
  selector: 'designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DesignerComponent implements OnInit, AfterViewInit {
  @ViewChild('contentElement', { static: false }) contentElement: ElementRef;
  @ViewChild('canvasElement', { static: false }) canvasElement: ElementRef;
  @ViewChild('designAreaDropdown', { static: false }) designAreaDropdown: ElementRef;
  @ViewChild('rootContainer', { static: false }) rootContainer: ContainerComponent;
  @ViewChild('workArea', { static: false }) workArea: ElementRef;
  @ViewChild('designAreaContainer', { static: false }) designAreaContainer: ElementRef;
  @ViewChild('PropertiesEditorContainer', { static: false }) PropertiesEditorContainer: ElementRef;
  public widgetCursors: Array<WidgetCursor>;

  
  constructor(private widgetService: WidgetService, public pageService: PageService, private breakpointService: BreakpointService) { }


  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    this.widgetCursors = [
      {
        title: 'Button',
        component: ButtonWidgetComponent,
        icon: '<i class="fab fa-bootstrap"></i>',
        allowed: 'button-widget-allowed.png',
        notAllowed: 'button-widget-not-allowed.png'
      },
      {
        title: 'Text',
        component: TextWidgetComponent,
        icon: '<div class="text-icon">T</div>',
        allowed: 'text-widget-allowed.png',
        notAllowed: 'text-widget-not-allowed.png'
      },
      {
        title: 'Image',
        component: ImageWidgetComponent,
        icon: '<i class="fas fa-image"></i>',
        allowed: 'image-widget-allowed.png',
        notAllowed: 'image-widget-not-allowed.png'
      },
      {
        title: 'Container',
        component: ContainerWidgetComponent,
        icon: '<img class="image-icon" src="assets/container-widget-icon.png">',
        allowed: 'container-widget-allowed.png',
        notAllowed: 'container-widget-not-allowed.png'
      },
      {
        title: 'Line',
        component: LineWidgetComponent,
        icon: '<i class="fas fa-slash"></i>',
        allowed: 'line-widget-allowed.png',
        notAllowed: 'line-widget-not-allowed.png'
      },
      {
        title: 'Video',
        component: VideoWidgetComponent,
        icon: '<i class="fas fa-film"></i>',
        allowed: 'video-widget-allowed.png',
        notAllowed: 'video-widget-not-allowed.png'
      }
      ,
      {
        title: 'Product Group',
        component: ProductGroupWidgetComponent,
        icon: '<img class="image-icon" src="assets/product-group-widget-icon.png">',
        allowed: 'product-group-widget-allowed.png',
        notAllowed: 'product-group-widget-not-allowed.png'
      },
      {
        title: 'Categories',
        component: CategoriesWidgetComponent,
        icon: '<img class="categories-icon" src="assets/categories-widget-icon.png">',
        allowed: 'categories-widget-allowed.png',
        notAllowed: 'categories-widget-not-allowed.png'
      },
      {
        title: 'Carousel',
        component: CarouselWidgetComponent,
        icon: '<img class="carousel-icon" src="assets/carousel-widget-icon.png">',
        allowed: 'carousel-widget-allowed.png',
        notAllowed: 'carousel-widget-not-allowed.png'
      }
    ]
  }

  ngAfterViewInit() {
    this.pageService.rootContainer = this.rootContainer;
  }


  // -----------------------------( ON WIDGET ICON MOUSE DOWN )------------------------------ \\
  onWidgetIconMousedown(e: MouseEvent, widgetCursor: WidgetCursor) {
    this.widgetService.currentWidgetCursor = widgetCursor;
    document.body.style.cursor = 'url("assets/' + widgetCursor.notAllowed + '"), auto';
    document.body.id = 'widget-cursor';

    // On Mouseup
    let onMouseup = () => {
      window.removeEventListener("mouseup", onMouseup);
      this.widgetService.currentWidgetCursor = null;
      document.body.removeAttribute('style');
      document.body.removeAttribute('id');
      document.body.removeAttribute('class');
    }
    window.addEventListener("mouseup", onMouseup);
  }


  // ------------------( ON DESIGN AREA RESIZER MOUSE DOWN )------------------- \\
  onDesignAreaResizerMousedown(event: any, side: number) {
    let startWidth: number = this.canvasElement.nativeElement.getBoundingClientRect().width;
    let anchorWidth = startWidth * 0.5;
    let offset = this.canvasElement.nativeElement.getBoundingClientRect().left - event.clientX;
    let anchorPoint = this.canvasElement.nativeElement.getBoundingClientRect().left + anchorWidth;

    // Set the body to the resize cursor
    document.body.style.cursor = 'e-resize';

    // On Mousemove
    let onMousemove = (e: any) => {
      let mousePos = side == 1 ? anchorPoint - e.clientX - offset : startWidth - (anchorPoint - e.clientX - offset);
      let percent = mousePos / anchorWidth;


      // Set the width of the canvas
      this.canvasElement.nativeElement.style.maxWidth = (startWidth * percent) + 'px';
      

      // Alert that the canvas width has changed
      this.breakpointService.onCanvasWidthChange.next(this.contentElement.nativeElement.getBoundingClientRect().width);
    }

    // On Mouseup
    let onMouseup = () => {
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("mouseup", onMouseup);
      document.body.removeAttribute('style');
    }

    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);
  }
}