import { Component, Input } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';
import { Enableable } from '../../../classes/enableable';

@Component({
  selector: 'enableable-panel',
  templateUrl: '../panel/panel.component.html',
  styleUrls: ['./enableable-panel.component.scss', '../panel/panel.component.scss']
})
export class EnableablePanelComponent extends PanelComponent {
  @Input() enableableProperty: Enableable;
}