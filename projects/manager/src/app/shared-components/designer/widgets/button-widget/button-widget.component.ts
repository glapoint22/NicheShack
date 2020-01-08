import { Component, OnInit } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';

@Component({
  selector: 'button-widget',
  templateUrl: './button-widget.component.html',
  styleUrls: ['./button-widget.component.scss']
})
export class ButtonWidgetComponent implements OnInit {
  public fillColor: string = "purple";
  public applyBorder: string = "";
  public borderWidth: number = 5;
  public borderStyle: string = "dashed";
  public borderColor: string = "green";
  public borderTopLeftRadius: number = 10;
  public borderTopRightRadius: number = 20;
  public borderBottomLeftRadius: number = 30;
  public borderBottomRightRadius: number = 40;
  public caption: string = "Button";
  public fontFamily: string = "arial";
  public fontSize: number = 30;
  public fontWeight: string = "bold";
  public fontStyle: string = "italic";
  public textColor: string = "orange";

  constructor(public _FormService: FormService) {}

  ngOnInit() {
  }

  onEdit() {
    this._FormService.showButtonEditForm = true;
  }

}
