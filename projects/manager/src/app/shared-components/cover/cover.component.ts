import { Component } from '@angular/core';
import { CoverService } from '../../services/cover.service';

@Component({
  selector: 'cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent {
  constructor(public coverService: CoverService) { }

  showCover(): boolean {
    let result: boolean;

    if (this.coverService.showPointerCover || this.coverService.showResizeCover) {
      result = true;
      this.coverService.showCover = true;

    } else {
      result = false;
      this.coverService.showCover = false;
    }
    return result;
  }
}