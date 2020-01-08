import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  public showColorPicker: boolean;
  public showButtonEditForm: boolean;
  public rgba: any = {r: 255, g: 0, b: 255, a: 1};
  public fillColor: any = {r: 0, g: 0, b: 255, a: 0.75};
  public borderColor: any = {r: 0, g: 255, b: 255, a: 0.72};
  public textColor: any = {r: 255, g: 255, b: 0, a: 0.5};
  public shadowColor: any = {r: 0, g: 0, b: 0, a: 0.8};
  constructor() { }
}