import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoverService {
  public showCover: boolean = false;
  public showPointerCover: boolean = false;
  public showResizeCover: boolean = false;
}