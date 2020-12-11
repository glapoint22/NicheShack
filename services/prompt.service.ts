import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
  private yesArgsArray: any;
  private noArgsArray: any;
  public onPromptClose = new Subject<void>();

  showPrompt(promptTitle: string, message: string, onYes?: Function, currentObject?: any, yesArgsArray?: any, onNo?: Function, noArgsArray?: any) {
    this.show = true;
    this.promptTitle = promptTitle;
    this.message = message;
    this.onYes = onYes;
    this.onNo = onNo;
    this.currentObject = currentObject;
    this.yesArgsArray = yesArgsArray;
    this.noArgsArray = noArgsArray;
  }

  onYesClick() {
    this.onYes.apply(this.currentObject, this.yesArgsArray);
    this.onPromptClose.next();
  }

  onNoClick() {
    if(this.onNo != null) {
      this.onNo.apply(this.currentObject, this.noArgsArray);
    }
    this.onPromptClose.next();
  }
}
