import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {
  public show: boolean;
  @Input() promptName: string;
  @Input() message: string;
  @Output() onYes: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
