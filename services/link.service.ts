import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LinkOption } from 'classes/link-base';
import { LinkData } from 'classes/link-data';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private router: Router) { }

  navigate(link: LinkData) {
    if (!link || link.selectedOption == LinkOption.None || !link.selectedOption) {
      return;
    } else if (link.selectedOption == LinkOption.WebAddress) {
      if (link.url)
        window.open(link.url, '_blank');
    } else if (link.selectedOption == LinkOption.OnClick) {
      // code here
    } else {
      this.router.navigate([link.url]);
    }
  }
}