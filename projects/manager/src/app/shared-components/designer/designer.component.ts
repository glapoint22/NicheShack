import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { ButtonWidgetComponent } from './widgets/button-widget/button-widget.component';
import { ContainerWidgetComponent } from './widgets/container-widget/container-widget.component';
import { ImageWidgetComponent } from './widgets/image-widget/image-widget.component';
import { LineWidgetComponent } from './widgets/line-widget/line-widget.component';
import { TextWidgetComponent } from './widgets/text-widget/text-widget.component';
import { WidgetCursor } from '../../classes/widget-cursor';
import { WidgetService } from '../../services/widget.service';
import { ContainerComponent } from './container/container.component';
import { BreakpointService } from '../../services/breakpoint.service';

@Component({
  selector: 'designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DesignerComponent implements OnInit {
  @ViewChild('content', { static: false }) content: ElementRef;
  @ViewChild('canvasElement', { static: false }) canvas: ElementRef;
  @ViewChild('widthDisplay', { static: false }) widthDisplay: ElementRef;
  @ViewChild('container', { static: false }) container: ContainerComponent;

  public widgetCursors: Array<WidgetCursor>;
  public showPublishMenu: boolean;
  public contentWidth: number = 1496;

  constructor(private widgetService: WidgetService, private breakpointService: BreakpointService) { }

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
        icon: '<i class="fas fa-box-open"></i>',
        allowed: 'container-widget-allowed.png',
        notAllowed: 'container-widget-not-allowed.png'
      },
      {
        title: 'Line',
        component: LineWidgetComponent,
        icon: '<i class="fas fa-slash"></i>',
        allowed: 'line-widget-allowed.png',
        notAllowed: 'line-widget-not-allowed.png'
      }
    ]
  }

  ngAfterViewInit() {
    this.widthDisplay.nativeElement.value = this.canvas.nativeElement.clientWidth;
    this.container.width = this.contentWidth;
  }

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


  onSizingBarMousedown(event: any, direction: number) {
    let mousePos = event.clientX;

    // On Mousemove
    let onMousemove = (e: any) => {
      let delta = mousePos - e.clientX;
      mousePos = e.clientX;

      this.canvas.nativeElement.style.width = (this.canvas.nativeElement.clientWidth + delta * direction * 2) + 'px';
      this.widthDisplay.nativeElement.value = this.canvas.nativeElement.clientWidth;
      this.breakpointService.onCanvasWidthChange.next(this.canvas.nativeElement.clientWidth);
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

  onPreview() {
    let previewWindow = window.open();
    let parent = document.createElement('div');
    let title = document.createElement('title');
    let meta = document.createElement('meta');
    let buttonStyles = document.createElement('style');
    let pageStyles = document.createElement('style');

    // Center the parent div
    parent.style.margin = 'auto';

    // This documnet fragment will hold all the button styles for the buttons on the page
    this.widgetService.buttonStylesDocumentFragment = document.createDocumentFragment();
    
    // Append the button styles style element to the button styles document fragment
    buttonStyles.type = 'text/css';
    this.widgetService.buttonStylesDocumentFragment.appendChild(buttonStyles);

    // This will build the HTML for each widget on the page
    this.container.buildHTML(parent);

    // Add the grid class
    (parent.firstElementChild as HTMLElement).style.height = '100%';
    (parent.firstElementChild as HTMLElement).classList.add('grid');


    // Write out the html to the preview window
    previewWindow.document.write(parent.outerHTML);

    
    // Title
    title.appendChild(document.createTextNode('Alita'));
    previewWindow.document.head.appendChild(title);


    // Meta tag
    meta.setAttribute('charset', 'utf-8');
    previewWindow.document.head.appendChild(meta);
    meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width, initial-scale=1');
    previewWindow.document.head.appendChild(meta);

    

    // Append the styles to the head
    pageStyles.type = 'text/css';
    pageStyles.innerHTML = document.head.querySelector('style').innerHTML;
    previewWindow.document.head.appendChild(pageStyles);
    previewWindow.document.head.appendChild(this.widgetService.buttonStylesDocumentFragment);


    // Page color
    previewWindow.document.body.style.background = 'white';
  }
}