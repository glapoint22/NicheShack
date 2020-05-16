import { Component } from '@angular/core';
import { CoverService } from '../../services/cover.service';

@Component({
  selector: 'cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent {
  constructor(public coverService: CoverService) { }
}