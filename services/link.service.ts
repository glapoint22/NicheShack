import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LinkBase, LinkOption } from 'classes/link-base';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private router: Router) {}

  navigate(link: LinkBase) {
    if (link.selectedOption == LinkOption.WebAddress) {
      if (link.url)
        window.open(link.url, '_blank');
    } else if(link.selectedOption == LinkOption.OnClick) {

    } else {
      this.router.navigate([link.url]);
    }
  }
}