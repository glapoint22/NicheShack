import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent {
  public show: boolean;
  @Input() promptTitle: string;
  @Input() message: string;
  @Output() onYes: EventEmitter<void> = new EventEmitter();


  onKeydown(event: KeyboardEvent) {
    if (event.keyCode == 27) {
      this.show = false;
    }
  }
}