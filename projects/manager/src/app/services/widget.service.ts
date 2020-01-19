import { Injectable } from '@angular/core';
import { Widget } from '../classes/widget';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  public currentWidget: Widget;

  constructor() { }
}
