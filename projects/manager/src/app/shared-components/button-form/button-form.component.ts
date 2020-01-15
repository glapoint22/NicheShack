import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service'

@Component({
  selector: 'button-form',
  templateUrl: './button-form.component.html',
  styleUrls: ['./button-form.component.scss']
})
export class ButtonFormComponent {
  public normalVerticalTab: boolean[] = [true, false, false, false, false, false, false];
  public hoverVerticalTab: boolean[] = [true, false, false];
  constructor(public _FormService: FormService) {}


  // ------------------------------------------------( ON SHOW )----------------------------------------------\\
  onFormOpen() {
    // Set the button fill color to be the starting swatch color on form open
    this._FormService.colorPickerColor = this._FormService.fillColor;
    // Set the normal button to be selected on form open
    this._FormService.buttonEditForm.normalTabSelected = true;
  }


  // -------------------------------------( ON NORMAL HORIZONTAL TAB SELECT )-----------------------------------\\
  onNormalHorizontalTabSelect() {
    // If the color Picker form is open
    if(this._FormService.openColorPicker) {
      // Close the the Color Picker form and reset any color changes made back to the original color
      this._FormService.openColorPicker = false;
      this._FormService.colorPickerColor.r = this._FormService.currentcolorPickerColor.r;
      this._FormService.colorPickerColor.g = this._FormService.currentcolorPickerColor.g;
      this._FormService.colorPickerColor.b = this._FormService.currentcolorPickerColor.b;
      this._FormService.colorPickerColor.a = this._FormService.currentcolorPickerColor.a;
    }

    // Deselect the hover horizontal tab
    this._FormService.buttonEditForm.normalTabSelected = true;

    // Get the index of the normal vertical tab that is selected
    let selectedIndex = this.normalVerticalTab.indexOf(true);

    // Then depending on which tab is selected, update its color swatch accordingly
    if(selectedIndex == 0) this._FormService.colorPickerColor = this._FormService.fillColor;// Fill Tab
    if(selectedIndex == 1) this._FormService.colorPickerColor = this._FormService.borderColor;// Border Tab
    if(selectedIndex == 3) this._FormService.colorPickerColor = this._FormService.textColor;// Text Tab
    if(selectedIndex == 4) this._FormService.colorPickerColor = this._FormService.shadowColor;// Shadow Tab
  }


  // -------------------------------------( ON HOVER HORIZONTAL TAB SELECT )-----------------------------------\\
  onHoverHorizontalTabSelect() {
    // If the color Picker form is open
    if(this._FormService.openColorPicker) {
      // Close the the Color Picker form and reset any color changes made back to the original color
      this._FormService.openColorPicker = false;
      this._FormService.colorPickerColor.r = this._FormService.currentcolorPickerColor.r;
      this._FormService.colorPickerColor.g = this._FormService.currentcolorPickerColor.g;
      this._FormService.colorPickerColor.b = this._FormService.currentcolorPickerColor.b;
      this._FormService.colorPickerColor.a = this._FormService.currentcolorPickerColor.a;
    }

    // Deselect the normal horizontal tab
    this._FormService.buttonEditForm.normalTabSelected = false;

    // Get the index of the hover vertical tab that is selected
    let selectedIndex = this.hoverVerticalTab.indexOf(true);

    // Then depending on which tab is selected, update its color swatch accordingly
    if(selectedIndex == 0) this._FormService.colorPickerColor = this._FormService.hoverFillColor;// Fill Tab
    if(selectedIndex == 1) this._FormService.colorPickerColor = this._FormService.hoverBorderColor;// Border Tab
    if(selectedIndex == 2) this._FormService.colorPickerColor = this._FormService.hoverTextColor;// Text Tab
  }


  // -------------------------------------( ON NORMAL VERTICAL TAB SELECT )-----------------------------------\\
  onNormalVerticalTabSelect(index: number) {
    // If the color Picker form is open
    if(this._FormService.openColorPicker) {
      // Close the the Color Picker form and reset any color changes made back to the original color
      this._FormService.openColorPicker = false;
      this._FormService.colorPickerColor.r = this._FormService.currentcolorPickerColor.r;
      this._FormService.colorPickerColor.g = this._FormService.currentcolorPickerColor.g;
      this._FormService.colorPickerColor.b = this._FormService.currentcolorPickerColor.b;
      this._FormService.colorPickerColor.a = this._FormService.currentcolorPickerColor.a;
    }

    // Deselect the vertical tab that is currently selected
    this.normalVerticalTab[   this.normalVerticalTab.indexOf(true)   ] = false;
    
    // Display the newly selected vertical tab as being selected
    this.normalVerticalTab[index] = true;

    // Then depending on which tab is selected, update its color swatch accordingly
    if(index == 0) this._FormService.colorPickerColor = this._FormService.fillColor;// Fill Tab
    if(index == 1) this._FormService.colorPickerColor = this._FormService.borderColor;// Border Tab
    if(index == 3) this._FormService.colorPickerColor = this._FormService.textColor;// Text Tab
    if(index == 4) this._FormService.colorPickerColor = this._FormService.shadowColor;// Shadow Tab
  }


  // -------------------------------------( ON HOVER VERTICAL TAB SELECT )-----------------------------------\\
  onHoverVerticalTabSelect(index: number) {
    // If the color Picker form is open
    if(this._FormService.openColorPicker) {
      // Close the the Color Picker form and reset any color changes made back to the original color
      this._FormService.openColorPicker = false;
      this._FormService.colorPickerColor.r = this._FormService.currentcolorPickerColor.r;
      this._FormService.colorPickerColor.g = this._FormService.currentcolorPickerColor.g;
      this._FormService.colorPickerColor.b = this._FormService.currentcolorPickerColor.b;
      this._FormService.colorPickerColor.a = this._FormService.currentcolorPickerColor.a;
    }

    // Deselect the vertical tab that is currently selected
    this.hoverVerticalTab[   this.hoverVerticalTab.indexOf(true)   ] = false;

    // Display the newly selected vertical tab as being selected
    this.hoverVerticalTab[index] = true;

    // Then depending on which tab is selected, update its color swatch accordingly
    if(index == 0) this._FormService.colorPickerColor = this._FormService.hoverFillColor;// Fill Tab
    if(index == 1) this._FormService.colorPickerColor = this._FormService.hoverBorderColor;// Border Tab
    if(index == 2) this._FormService.colorPickerColor = this._FormService.hoverTextColor;// Text Tab
  }
}