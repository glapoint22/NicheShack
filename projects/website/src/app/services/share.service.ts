import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  onFacebookClick(url: string, quote?: string) {
    window['FB'].ui({
      method: 'share',
      href: location.origin + url,
      quote: quote
    });
  }

  onTwitterClick(url: string, text: string) {
    this.openWindow('https://twitter.com/intent/tweet?text=' + text + '&url=' + location.origin + url);
  }

  onPinterestClick(url: string, image: string, description: string) {
    this.openWindow('https://www.pinterest.com/pin/create/button/?url=' + location.origin + url
      + '&media=' + location.origin + '/images/' + image
      + '&description=' + description)
  }

  openWindow(url: string) {
    let width: number = 580;
    let height: number = 360;
    let horizontalCenter = (window.innerWidth - width) / 2;
    let verticalCenter = (window.innerHeight - height) / 2;

    window.open(url, '_blank', 'toolbar=yes,scrollbars=no,resizable=yes,top=' +
      verticalCenter + ',left=' + horizontalCenter + ',width=' + width + ',height=' + height);
  }
}
