import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent {
  public selectedTab: string;
  constructor(public _FormService: FormService) {}


  // -------------------------------------( ON FORM OPEN )-----------------------------------\\
  onFormOpen() {
    // Set the image tab to be the starting tab on form open
    this.selectedTab = "image";

    this._FormService.initialBorder.apply = this._FormService.border.apply;
    this._FormService.initialBorder.width = this._FormService.border.width;
    this._FormService.initialBorder.style = this._FormService.border.style;
    this._FormService.initialBorder.color.r = this._FormService.border.color.r;
    this._FormService.initialBorder.color.g = this._FormService.border.color.g;
    this._FormService.initialBorder.color.b = this._FormService.border.color.b;
    this._FormService.initialBorder.color.a = this._FormService.border.color.a;

    this._FormService.initialCorners.constrainCorners = this._FormService.corners.constrainCorners;
    this._FormService.initialCorners.topLeft = this._FormService.corners.topLeft;
    this._FormService.initialCorners.topRight = this._FormService.corners.topRight;
    this._FormService.initialCorners.bottomLeft = this._FormService.corners.bottomLeft;
    this._FormService.initialCorners.bottomRight = this._FormService.corners.bottomRight;

    this._FormService.initialShadow.enable = this._FormService.shadow.enable;
    this._FormService.initialShadow.x = this._FormService.shadow.x;
    this._FormService.initialShadow.y = this._FormService.shadow.y;
    this._FormService.initialShadow.blur = this._FormService.shadow.blur;
    this._FormService.initialShadow.size = this._FormService.shadow.size;
    this._FormService.initialShadow.color.r = this._FormService.shadow.color.r;
    this._FormService.initialShadow.color.g = this._FormService.shadow.color.g;
    this._FormService.initialShadow.color.b = this._FormService.shadow.color.b;
    this._FormService.initialShadow.color.a = this._FormService.shadow.color.a;

    this._FormService.initialMargins.top = this._FormService.margins.top;
    this._FormService.initialMargins.right = this._FormService.margins.right;
    this._FormService.initialMargins.bottom = this._FormService.margins.bottom;
    this._FormService.initialMargins.left = this._FormService.margins.left;
  }

  // -------------------------------------( ON TAB SELECT )-----------------------------------\\
  onTabSelect(tab: string) {
    // Close the color picker form if it is open
    this._FormService.showColorPicker = false;
    
    // Display the newly selected tab as being selected
    this.selectedTab = tab;
  }


  // ----------------------------------------------------( ON CANCEL )--------------------------------------------------\\
  onCancel() {
    this._FormService.border.apply = this._FormService.initialBorder.apply;
    this._FormService.border.width = this._FormService.initialBorder.width;
    this._FormService.border.style = this._FormService.initialBorder.style;
    this._FormService.border.color.r = this._FormService.initialBorder.color.r;
    this._FormService.border.color.g = this._FormService.initialBorder.color.g;
    this._FormService.border.color.b = this._FormService.initialBorder.color.b;
    this._FormService.border.color.a = this._FormService.initialBorder.color.a;

    this._FormService.corners.constrainCorners = this._FormService.initialCorners.constrainCorners;
    this._FormService.corners.topLeft = this._FormService.initialCorners.topLeft;
    this._FormService.corners.topRight = this._FormService.initialCorners.topRight;
    this._FormService.corners.bottomLeft = this._FormService.initialCorners.bottomLeft;
    this._FormService.corners.bottomRight = this._FormService.initialCorners.bottomRight;

    this._FormService.shadow.enable = this._FormService.initialShadow.enable;
    this._FormService.shadow.x = this._FormService.initialShadow.x;
    this._FormService.shadow.y = this._FormService.initialShadow.y;
    this._FormService.shadow.blur = this._FormService.initialShadow.blur;
    this._FormService.shadow.size = this._FormService.initialShadow.size;
    this._FormService.shadow.color.r = this._FormService.initialShadow.color.r;
    this._FormService.shadow.color.g = this._FormService.initialShadow.color.g;
    this._FormService.shadow.color.b = this._FormService.initialShadow.color.b;
    this._FormService.shadow.color.a = this._FormService.initialShadow.color.a;

    this._FormService.margins.top = this._FormService.initialMargins.top;
    this._FormService.margins.right = this._FormService.initialMargins.right;
    this._FormService.margins.bottom = this._FormService.initialMargins.bottom;
    this._FormService.margins.left = this._FormService.initialMargins.left;

    this._FormService.showImageForm = false;
  }
}