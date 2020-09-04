import { Injectable } from '@angular/core';
import { Redirect } from '../classes/redirect';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  // private _redirectUrl : string;
  // public get redirectUrl() : string {
  //   let redirectUrl: string;

  //   if(this._redirectUrl) {
  //     redirectUrl = this._redirectUrl;
  //   } else {
  //     redirectUrl = '';
  //   }

  //   this._redirectUrl = null;

  //   return redirectUrl;
  // }
  // public set redirectUrl(v : string) {
  //   this._redirectUrl = v;
  // }






  private _redirect: Redirect;
  public get redirect(): Redirect {

    let redirect: Redirect;

    if (this._redirect) {
      redirect = this._redirect;
    } else {
      redirect = { path: '', queryParams: null };
    }

    this._redirect = null;

    return redirect;



  }
  public set redirect(v: Redirect) {
    this._redirect = v;
  }





  public callback: string;


  public scrollPosition: number;




  constructor() { }
}
