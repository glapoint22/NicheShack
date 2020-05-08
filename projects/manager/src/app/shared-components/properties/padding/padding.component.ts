import { Component, Input } from '@angular/core';
import { Padding } from '../../../classes/padding';
import { BreakpointSpacing } from '../../../classes/breakpoint';

@Component({
  selector: 'padding',
  templateUrl: './padding.component.html',
  styleUrls: ['./padding.component.scss']
})
export class PaddingComponent {
  @Input() padding: Padding;
  public paddingValues: Array<string>;

  ngOnInit() {
    this.paddingValues = Object.values(BreakpointSpacing);
  }

  onValueChange(position: string, value: string) {
    // If constrained, set the value for each position
    if (this.padding.constrain) {
      this.padding.top.value = value;
      this.padding.right.value = value;
      this.padding.bottom.value = value;
      this.padding.left.value = value;
    } else {
      // Set the value for the passed in position
      this.padding[position].value = value;
    }
  }
}
