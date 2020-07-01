import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  public show: boolean;
  public promptTitle: string;
  public message: string;
  public onYes: Function;
  public onNo: Function;
  private currentObject: any;
  private argArray: any;

  showPrompt(promptTitle: string, message: string, onYes: Function, currentObject: any, argArray?: any, onNo?: Function) {
    this.show = true;
    this.promptTitle = promptTitle;
    this.message = message;
    this.onYes = onYes;
    this.onNo = onNo;
    this.currentObject = currentObject;
    this.argArray = argArray;
  }

  onYesClick() {
    this.onYes.apply(this.currentObject, this.argArray);
  }

  onNoClick() {
    if(this.onNo != null) {
      this.onNo.apply(this.currentObject);
    }
  }
}
