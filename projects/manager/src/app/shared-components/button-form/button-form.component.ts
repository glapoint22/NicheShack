import { Component } from '@angular/core';
import { FormService } from '../../services/form.service'

@Component({
  selector: 'button-form',
  templateUrl: './button-form.component.html',
  styleUrls: ['./button-form.component.scss']
})

export class ButtonFormComponent {
  public selectedNormalVerticalTab: string;
  public selectedHoverVerticalTab: string;
  constructor(public _FormService: FormService) {}


  // ----------------------------------------------( ON FORM OPEN )--------------------------------------------\\
  onFormOpen() {
    // Set the normal tab to be selected on form open
    this._FormService.buttonFormHoverTab.selected = false;
    // Set the fill tab to be the starting normal vertical tab on form open
    this.selectedNormalVerticalTab = "fill";
    // Set the fill tab to be the starting hover vertical tab on form open
    this.selectedHoverVerticalTab = "fill";
    

    // Set the intial
    this._FormService.initialFill.color.r = this._FormService.fill.color.r;
    this._FormService.initialFill.color.g = this._FormService.fill.color.g;
    this._FormService.initialFill.color.b = this._FormService.fill.color.b;
    this._FormService.initialFill.color.a = this._FormService.fill.color.a;
    this._FormService.initialFill.hoverColor.r = this._FormService.fill.hoverColor.r;
    this._FormService.initialFill.hoverColor.g = this._FormService.fill.hoverColor.g;
    this._FormService.initialFill.hoverColor.b = this._FormService.fill.hoverColor.b;
    this._FormService.initialFill.hoverColor.a = this._FormService.fill.hoverColor.a;

    this._FormService.initialBorder.apply = this._FormService.border.apply;
    this._FormService.initialBorder.width = this._FormService.border.width;
    this._FormService.initialBorder.style = this._FormService.border.style;
    this._FormService.initialBorder.color.r = this._FormService.border.color.r;
    this._FormService.initialBorder.color.g = this._FormService.border.color.g;
    this._FormService.initialBorder.color.b = this._FormService.border.color.b;
    this._FormService.initialBorder.color.a = this._FormService.border.color.a;
    this._FormService.initialBorder.hoverColor.r = this._FormService.border.hoverColor.r;
    this._FormService.initialBorder.hoverColor.g = this._FormService.border.hoverColor.g;
    this._FormService.initialBorder.hoverColor.b = this._FormService.border.hoverColor.b;
    this._FormService.initialBorder.hoverColor.a = this._FormService.border.hoverColor.a;

    this._FormService.initialCorners.constrainCorners = this._FormService.corners.constrainCorners;
    this._FormService.initialCorners.topLeft = this._FormService.corners.topLeft;
    this._FormService.initialCorners.topRight = this._FormService.corners.topRight;
    this._FormService.initialCorners.bottomLeft = this._FormService.corners.bottomLeft;
    this._FormService.initialCorners.bottomRight = this._FormService.corners.bottomRight;

    this._FormService.initialButtonText.caption = this._FormService.buttonText.caption;
    this._FormService.initialButtonText.fontFamily = this._FormService.buttonText.fontFamily;
    this._FormService.initialButtonText.fontSize = this._FormService.buttonText.fontSize;
    this._FormService.initialButtonText.fontWeight = this._FormService.buttonText.fontWeight;
    this._FormService.initialButtonText.fontStyle = this._FormService.buttonText.fontStyle;
    this._FormService.initialButtonText.color.r = this._FormService.buttonText.color.r;
    this._FormService.initialButtonText.color.g = this._FormService.buttonText.color.g;
    this._FormService.initialButtonText.color.b = this._FormService.buttonText.color.b;
    this._FormService.initialButtonText.color.a = this._FormService.buttonText.color.a;
    this._FormService.initialButtonText.hoverColor.r = this._FormService.buttonText.hoverColor.r;
    this._FormService.initialButtonText.hoverColor.g = this._FormService.buttonText.hoverColor.g;
    this._FormService.initialButtonText.hoverColor.b = this._FormService.buttonText.hoverColor.b;
    this._FormService.initialButtonText.hoverColor.a = this._FormService.buttonText.hoverColor.a;

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


  // -------------------------------------( ON NORMAL HORIZONTAL TAB SELECT )-----------------------------------\\
  onNormalHorizontalTabSelect() {
    // Close the color picker form if it is open
    this._FormService.closeColorPicker();

    // Display the newly selected horizontal tab as being selected
    this._FormService.buttonFormHoverTab.selected = false;
  }


  // -------------------------------------( ON HOVER HORIZONTAL TAB SELECT )-----------------------------------\\
  onHoverHorizontalTabSelect() {
    // Close the color picker form if it is open
    this._FormService.closeColorPicker();

    // Display the newly selected horizontal tab as being selected
    this._FormService.buttonFormHoverTab.selected = true;
  }


  // -------------------------------------( ON NORMAL VERTICAL TAB SELECT )-----------------------------------\\
  onNormalVerticalTabSelect(tab: string) {
    // Close the color picker form if it is open
    this._FormService.closeColorPicker();

    // Display the newly selected vertical tab as being selected
    this.selectedNormalVerticalTab = tab;
  }


  // -------------------------------------( ON HOVER VERTICAL TAB SELECT )-----------------------------------\\
  onHoverVerticalTabSelect(tab: string) {
    // Close the color picker form if it is open
    this._FormService.closeColorPicker();
    
    // Display the newly selected vertical tab as being selected
    this.selectedHoverVerticalTab = tab;
  }


  // ----------------------------------------------------( ON CANCEL )--------------------------------------------------\\
  onCancel() {
    this._FormService.fill.color.r = this._FormService.initialFill.color.r;
    this._FormService.fill.color.g = this._FormService.initialFill.color.g;
    this._FormService.fill.color.b = this._FormService.initialFill.color.b;
    this._FormService.fill.color.a = this._FormService.initialFill.color.a;
    this._FormService.fill.hoverColor.r = this._FormService.initialFill.hoverColor.r;
    this._FormService.fill.hoverColor.g = this._FormService.initialFill.hoverColor.g;
    this._FormService.fill.hoverColor.b = this._FormService.initialFill.hoverColor.b;
    this._FormService.fill.hoverColor.a = this._FormService.initialFill.hoverColor.a;

    this._FormService.border.apply = this._FormService.initialBorder.apply;
    this._FormService.border.width = this._FormService.initialBorder.width;
    this._FormService.border.style = this._FormService.initialBorder.style;
    this._FormService.border.color.r = this._FormService.initialBorder.color.r;
    this._FormService.border.color.g = this._FormService.initialBorder.color.g;
    this._FormService.border.color.b = this._FormService.initialBorder.color.b;
    this._FormService.border.color.a = this._FormService.initialBorder.color.a;
    this._FormService.border.hoverColor.r = this._FormService.initialBorder.hoverColor.r;
    this._FormService.border.hoverColor.g = this._FormService.initialBorder.hoverColor.g;
    this._FormService.border.hoverColor.b = this._FormService.initialBorder.hoverColor.b;
    this._FormService.border.hoverColor.a = this._FormService.initialBorder.hoverColor.a;

    this._FormService.corners.constrainCorners = this._FormService.initialCorners.constrainCorners;
    this._FormService.corners.topLeft = this._FormService.initialCorners.topLeft;
    this._FormService.corners.topRight = this._FormService.initialCorners.topRight;
    this._FormService.corners.bottomLeft = this._FormService.initialCorners.bottomLeft;
    this._FormService.corners.bottomRight = this._FormService.initialCorners.bottomRight;

    this._FormService.buttonText.caption = this._FormService.initialButtonText.caption;
    this._FormService.buttonText.fontFamily = this._FormService.initialButtonText.fontFamily;
    this._FormService.buttonText.fontSize = this._FormService.initialButtonText.fontSize;
    this._FormService.buttonText.fontWeight = this._FormService.initialButtonText.fontWeight;
    this._FormService.buttonText.fontStyle = this._FormService.initialButtonText.fontStyle;
    this._FormService.buttonText.color.r = this._FormService.initialButtonText.color.r;
    this._FormService.buttonText.color.g = this._FormService.initialButtonText.color.g;
    this._FormService.buttonText.color.b = this._FormService.initialButtonText.color.b;
    this._FormService.buttonText.color.a = this._FormService.initialButtonText.color.a;
    this._FormService.buttonText.hoverColor.r = this._FormService.initialButtonText.hoverColor.r;
    this._FormService.buttonText.hoverColor.g = this._FormService.initialButtonText.hoverColor.g;
    this._FormService.buttonText.hoverColor.b = this._FormService.initialButtonText.hoverColor.b;
    this._FormService.buttonText.hoverColor.a = this._FormService.initialButtonText.hoverColor.a;

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


    this._FormService.showButtonForm = false;
    this._FormService.buttonFormHoverTab.selected = false;
  }


  // ----------------------------------------------------( ON OK )--------------------------------------------------\\
  onOk() {
    this._FormService.showButtonForm = false;
    this._FormService.buttonFormHoverTab.selected = false;
  }
}