import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent {
  @Output() onRowSelected: EventEmitter<RowComponent> = new EventEmitter();
  @Output() onRowMove: EventEmitter<number> = new EventEmitter();
  public top: number;

  onRowMoveMousedown(event) {
    let offset = event.clientY - this.top;
    let currentPos = this.top;

    this.onRowSelected.emit(this);

    let onMousemove = (e: MouseEvent) => {
      this.top = e.clientY - offset;

      let delta = this.top - currentPos;
      currentPos = this.top;
      this.onRowMove.emit(Math.sign(delta));
    }

    let onMouseup = () => {
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("mouseup", onMouseup);

    }

    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);
  }
}