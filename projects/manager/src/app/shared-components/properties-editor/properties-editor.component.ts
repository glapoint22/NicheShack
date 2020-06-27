import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'properties-editor',
  templateUrl: './properties-editor.component.html',
  styleUrls: ['./properties-editor.component.scss']
})
export class PropertiesEditorComponent implements OnInit {
  @ViewChild('sizingBar', { static: false }) sizingBar: ElementRef;
  private propertiesEditorContainer: HTMLElement;


  // ------------------( NG ON INIT )------------------- \\
  ngOnInit() {
    this.propertiesEditorContainer = document.getElementsByClassName('properties-editor-container')[0] as HTMLElement;
  }


  // ------------------( ON SIZING BAR MOUSEDOWN )------------------- \\
  onSizingBarMousedown(event: MouseEvent) {
    let startWidth: number = this.propertiesEditorContainer.getBoundingClientRect().width;
    let offset = this.propertiesEditorContainer.getBoundingClientRect().left - event.clientX;
    let anchorPoint = this.propertiesEditorContainer.getBoundingClientRect().left + startWidth;

    // Set the body to the resize cursor
    document.body.style.cursor = 'e-resize';

    // On Mousemove
    let onMousemove = (e: any) => {
      let mousePos = anchorPoint - e.clientX - offset;
      let percent = mousePos / startWidth;


      // Set the width of the canvas
      this.propertiesEditorContainer.style.maxWidth = (startWidth * percent) + 'px';
      this.propertiesEditorContainer.style.flexBasis = (startWidth * percent) + 'px';
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