import { Component, Input } from '@angular/core';
import { Link } from '../../../classes/link';

@Component({
  selector: 'link-property',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {
  @Input() link: Link;
}