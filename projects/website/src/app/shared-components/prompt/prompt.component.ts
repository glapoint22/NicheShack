import { Component } from '@angular/core';
import { PromptService } from 'services/prompt.service';

@Component({
  selector: 'prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent {

  constructor(public promptService: PromptService) { }

  onKeydown(event: KeyboardEvent) {
    if (event.code == 'Escape') {
      // window.setTimeout(() => {
        this.promptService.show = false;
        // this.promptService.onNoClick();
      // })
    }
  }

}
