import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, HostListener } from '@angular/core';
import { ButtonWidgetComponent } from './widgets/button-widget/button-widget.component';
import { ContainerWidgetComponent } from './widgets/container-widget/container-widget.component';
import { ImageWidgetComponent } from './widgets/image-widget/image-widget.component';
import { LineWidgetComponent } from './widgets/line-widget/line-widget.component';
import { TextWidgetComponent } from './widgets/text-widget/text-widget.component';
import { WidgetCursor } from '../../classes/widget-cursor';
import { WidgetService } from '../../services/widget.service';
import { ContainerComponent } from './container/container.component';
import { BreakpointService } from '../../services/breakpoint.service';
import { VideoWidgetComponent } from './widgets/video-widget/video-widget.component';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DesignerComponent implements OnInit {
  @ViewChild('contentElement', { static: false }) contentElement: ElementRef;
  @ViewChild('canvasElement', { static: false }) canvasElement: ElementRef;
  @ViewChild('designAreaDropdown', { static: false }) designAreaDropdown: ElementRef;
  @ViewChild('rootContainer', { static: false }) rootContainer: ContainerComponent;
  @ViewChild('workArea', { static: false }) workArea: ElementRef;
  @ViewChild('designAreaContainer', { static: false }) designAreaContainer: ElementRef;
  @ViewChild('PropertiesEditorContainer', { static: false }) PropertiesEditorContainer: ElementRef;

  public widgetCursors: Array<WidgetCursor>;
  public showPublishMenu: boolean;
  public contentWidth: number = 1600;
  constructor(private widgetService: WidgetService, private breakpointService: BreakpointService, private menuService: MenuService) { }


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
      },
      {
        title: 'Video',
        component: VideoWidgetComponent,
        icon: '<i class="fas fa-film"></i>',
        allowed: 'video-widget-allowed.png',
        notAllowed: 'video-widget-not-allowed.png'
      }
    ]
  }


  // -----------------------------(NG AFTER VIEW INIT )------------------------------ \\
  ngAfterViewInit() {
    let propertiesEditorResizerPos: number = (this.workArea.nativeElement.offsetWidth * 88.15) / 100;

    this.onPropertiesEditorResize(propertiesEditorResizerPos);
    this.designAreaDropdown.nativeElement.value = this.contentElement.nativeElement.offsetWidth;
    this.rootContainer.width = this.contentWidth;
  }


  // -----------------------------( HOST LISTENER )------------------------------ \\
  @HostListener('window:resize') onResize() {
    let propertiesEditorResizerPos: number = (this.workArea.nativeElement.offsetWidth * 88.15) / 100;
    this.onPropertiesEditorResize(propertiesEditorResizerPos);
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
  onDesignAreaResizerMousedown(event: any, direction: number) {
    let mousePos = event.clientX;

    // On Mousemove
    let onMousemove = (e: any) => {
      let delta = mousePos - e.clientX;
      mousePos = e.clientX;

      this.canvasElement.nativeElement.style.width = (this.canvasElement.nativeElement.clientWidth + delta * direction * 2) + 'px';
      this.designAreaDropdown.nativeElement.value = this.contentElement.nativeElement.offsetWidth;
      this.breakpointService.onCanvasWidthChange.next(this.canvasElement.nativeElement.clientWidth);
    }

    // On Mouseup
    let onMouseup = () => {
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("mouseup", onMouseup);
    }

    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);
  }


  // -----------------------------( ON DESIGN AREA DROPDOWN KEYDOWN )------------------------------ \\
  onDesignAreaDropdownKeydown(event: any) {
    if (event.keyCode == 13) {
      this.canvasElement.nativeElement.style.width = event.target.value + 'px';
    } else if (event.keyCode == 38) {
      event.target.value = Number.parseInt(event.target.value) + 1;
      this.canvasElement.nativeElement.style.width = event.target.value + 'px';
    } else if (event.keyCode == 40) {
      event.target.value = Number.parseInt(event.target.value) - 1;
      this.canvasElement.nativeElement.style.width = event.target.value + 'px';
    }
  }


  // -----------------------------( ON PREVIEW )------------------------------ \\
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
    this.rootContainer.buildHTML(parent);

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


  // ------------------( ON PROPERTIES EDITOR RESIZER DOWN )------------------- \\
  onPropertiesEditorResizerDown() {
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
  }


  // -----------------------------( ON MOUSE MOVE )------------------------------ \\
  private onMouseMove = (event: MouseEvent) => {
    this.onPropertiesEditorResize(event.clientX);
  }


  // -----------------------------( ON MOUSE UP )------------------------------ \\
  private onMouseUp = () => {
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
  }


  // -----------------------------( ON PROPERTIES EDITOR RESIZE )------------------------------ \\
  onPropertiesEditorResize(propertiesEditorResizerPos) {
    let designAreaContainerPercent = (((propertiesEditorResizerPos - this.workArea.nativeElement.offsetLeft) / this.workArea.nativeElement.offsetWidth) * 100);
    let propertiesEditorResizerPercent = (4 / this.workArea.nativeElement.offsetWidth) * 100;
    let propertiesEditorContainerPercent = (100 - designAreaContainerPercent);

    this.designAreaDropdown.nativeElement.value = this.contentElement.nativeElement.offsetWidth;
    this.designAreaContainer.nativeElement.style.width = designAreaContainerPercent + "%";
    this.PropertiesEditorContainer.nativeElement.style.width = (propertiesEditorContainerPercent - propertiesEditorResizerPercent) + "%";
  }
}