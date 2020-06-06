import { Component } from '@angular/core';
import { PromptService } from '../../services/prompt.service';

@Component({
  selector: 'prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent {

  constructor(private promptService: PromptService) { }


  onKeydown(event: KeyboardEvent) {
    if (event.keyCode == 27) {
      this.promptService.show = false;
    }
  }
}