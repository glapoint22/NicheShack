import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  public openColorPicker: boolean;
  public initialColorPickerColor: any = {r: 0, g: 0, b: 0, a: 0};
  public colorPickerColor: any;
  
  

  public buttonForm: any;
  public textForm: any;
  public imageForm: any;
  

  public initialFill: any = { color: {r: 0, g: 0, b: 0, a: 0}, hoverColor: {r: 0, g: 0, b: 0, a: 0}};
  public initialBorder: any = {apply: false, width: 0, style: "", color: {r: 0, g: 0, b: 0, a: 0}, hoverColor: {r: 0, g: 0, b: 0, a: 0}};
  public initialCorners: any = {constrainCorners: true, topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0};
  public initialText: any = {caption: "", fontFamily: "", fontSize: 0, fontWeight: "", fontStyle: "", color: {r: 0, g: 0, b: 0, a: 0}, hoverColor: {r: 0, g: 0, b: 0, a: 0}};
  public initialShadow: any = {enable: false, x: 0, y: 0, blur: 0, size: 0, color: {r: 0, g: 0, b: 0, a: 0}};
  public initialMargins: any = {top: 0, right: 0, bottom: 0, left: 0};

  public fill: any;
  public border: any;
  public corners: any;
  public text: any;
  public shadow: any;
  public margins: any;
}