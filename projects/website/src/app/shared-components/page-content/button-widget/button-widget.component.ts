import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { BackgroundBase } from 'classes/background-base';
import { BackgroundColorBase } from 'classes/background-color-base';
import { BorderBase } from 'classes/border-base';
import { BorderColor } from 'classes/border-color';
import { Button } from 'classes/button';
import { ButtonWidgetDataBase } from 'classes/button-widget-data-base';
import { Color } from 'classes/color';
import { CornersBase } from 'classes/corners-base';
import { LinkBase, LinkOption } from 'classes/link-base';
import { PaddingBase } from 'classes/padding-base';
import { ShadowBase } from 'classes/shadow-base';
import { TextColorBase } from 'classes/text-color-base';
import { CssButtonService } from 'services/css-button.service';
import { Caption } from '../../../classes/caption';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'button-widget',
  templateUrl: './button-widget.component.html',
  styleUrls: ['./button-widget.component.scss']
})
export class ButtonWidgetComponent extends WidgetComponent implements Button, OnInit {
  public background: BackgroundBase = new BackgroundBase();
  public border: BorderBase = new BorderBase();
  public caption: Caption = new Caption();
  public corners: CornersBase = new CornersBase();
  public shadow: ShadowBase = new ShadowBase();
  public padding: PaddingBase = new PaddingBase();
  public link: LinkBase = new LinkBase();

  // Background Hover & Active colors
  public backgroundHoverColor: BackgroundColorBase = new BackgroundColorBase(new Color(150, 150, 150, 1));
  public backgroundActiveColor: BackgroundColorBase = new BackgroundColorBase(new Color(135, 135, 135, 1));;

  // Border Hover & Active colors
  public borderHoverColor: BorderColor = new BorderColor(new Color(240, 240, 240, 1));
  public borderActiveColor: BorderColor = new BorderColor(new Color(220, 220, 220, 1));

  // Text Hover & Active colors
  public textHoverColor: TextColorBase = new TextColorBase(new Color(255, 255, 255, 1));
  public textActiveColor: TextColorBase = new TextColorBase(new Color(225, 225, 225, 1));

  constructor(private cssButtonService: CssButtonService, @Inject(DOCUMENT) public document: Document) { super() }


  ngOnInit() {
    this.height = 40;
  }


  setData(widgetData: ButtonWidgetDataBase) {
    let buttonClassName: string;
    let buttonClass: string;
    let buttonStyles = document.createElement('style');

    // Set the data
    this.background.setData(widgetData.background);
    this.border.setData(widgetData.border);
    this.caption.setData(widgetData.caption);
    this.corners.setData(widgetData.corners);
    this.shadow.setData(widgetData.shadow);
    this.padding.addClasses(widgetData.breakpoints, this.widgetElement, widgetData.padding);
    this.link.setData(widgetData.link);
    this.backgroundHoverColor.setData(widgetData.backgroundHoverColor);
    this.backgroundActiveColor.setData(widgetData.backgroundActiveColor);
    this.borderHoverColor.setData(widgetData.borderHoverColor);
    this.borderActiveColor.setData(widgetData.borderActiveColor);
    this.textHoverColor.setData(widgetData.textHoverColor);
    this.textActiveColor.setData(widgetData.textActiveColor);
    super.setData(widgetData);

    // Create the button class and add it to the button element
    buttonClassName = this.cssButtonService.getClassName();
    buttonClass = this.cssButtonService.createClass(buttonClassName, this);
    this.widgetElement.classList.add(buttonClassName);


    // Add the button class to the document
    buttonStyles.appendChild(this.document.createTextNode(buttonClass));
    this.document.head.appendChild(buttonStyles);
  }


  onClick() {
    if (this.link.selectedOption = LinkOption.WebAddress) {
      if (this.link.url)
        window.open(this.link.url, '_blank');
    } else {

    }
  }
}