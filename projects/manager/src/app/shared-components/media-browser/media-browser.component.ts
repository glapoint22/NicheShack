import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'media-browser',
  templateUrl: './media-browser.component.html',
  styleUrls: ['./media-browser.component.scss']
})
export class MediaBrowserComponent implements OnInit {
  @Input() mediaType: string;

  constructor() { }

  ngOnInit() {
  }

}
