import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit {
  public view: string = 'page';

  constructor(public pageService: PageService) { }

  ngOnInit() {
  }

}
