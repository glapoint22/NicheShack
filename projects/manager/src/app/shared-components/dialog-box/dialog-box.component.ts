import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})

export class DialogBoxComponent {
  public x: number;
  public y: number;
  private initialCursorPosX: number;
  private initialCursorPosY: number;
  @Input() width: number = 330;
  @Input() dialogBoxName = "Dialog Box Name";
  @Input() isModal: boolean = false;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  @ViewChild('container', { static: false }) container: ElementRef;


  formMoveBegin(e: MouseEvent) {
    if (!this.isModal) {
      // Get the initial x and y position of the cursor on mousedown of the bar
      this.initialCursorPosX = (e.clientX - this.x);
      this.initialCursorPosY = (e.clientY - this.y);

      let formMove = (e: MouseEvent) => {
        this.x = e.clientX - this.initialCursorPosX;
        this.y = e.clientY - this.initialCursorPosY;
      }

      let formMoveEnd = () => {
        window.removeEventListener("mousemove", formMove);
        window.removeEventListener("mouseup", formMoveEnd);
      }

      // Add event listeners that will listen for a mousemove to move the form and a mouseup to stop moving the form
      window.addEventListener("mousemove", formMove);
      window.addEventListener("mouseup", formMoveEnd);
    }

  }


  // Initialize the position of the form
  ngAfterViewInit() {
    if (!this.isModal) {
      window.setTimeout(() => {
        this.x = (window.innerWidth / 2) - (this.width / 2);
        this.y = (window.innerHeight / 2) - (this.container.nativeElement.offsetHeight / 2);
      });
    }

  }
}
