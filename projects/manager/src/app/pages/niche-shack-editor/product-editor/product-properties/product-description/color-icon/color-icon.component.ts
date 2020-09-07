import { Component, Input } from '@angular/core';
import { ColorSwatchComponent } from '../../../../../../shared-components/elements/color-swatch/color-swatch.component';
import { Color } from '../../../../../../../../../../classes/color';
import { Description } from 'projects/manager/src/app/classes/description';

@Component({
  selector: 'color-icon',
  templateUrl: './color-icon.component.html',
  styleUrls: ['./color-icon.component.scss']
})
export class ColorIconComponent extends ColorSwatchComponent {
  @Input() icon: string;
  @Input() title: string;
  @Input() removable: string;
  @Input() description: Description;

  // ---------------------------------------------------------------- On Click --------------------------------------------------------------
  onClick(sourceElement: HTMLElement) {
    if (this.removable && !this.color.isEqual(Color.zero) && !this.popupService.colorPickerPopup.show) {
      // This will open the highlight popup
      this.popupService.sourceElement = sourceElement;
      this.popupService.highlightPopup.color = this.color;
      this.popupService.highlightPopup.description = this.description;
      this.popupService.highlightPopup.show = !this.popupService.highlightPopup.show;

    } else {
      // This will open up the color picker
      super.onClick(sourceElement);
    }
  }
}