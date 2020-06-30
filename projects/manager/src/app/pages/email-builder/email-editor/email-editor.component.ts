import { Component, OnInit } from '@angular/core';
import { PageEditorComponent } from '../../page-builder/page-editor/page-editor.component';

@Component({
  selector: 'email-editor',
  templateUrl: '../../page-builder/page-editor/page-editor.component.html',
  styleUrls: ['../../page-builder/page-editor/page-editor.component.scss']
})
export class EmailEditorComponent extends PageEditorComponent implements OnInit {


  // ---------------------------------------------------------------------- Ng On Init --------------------------------------------------------
  ngOnInit() {
    this.apiUrl = 'api/Emails';
    this.pageType = 'email';
    this.setPageView();
  }


  // --------------------------------------------------------------------- On Delete Click --------------------------------------------------------
  onDeleteClick() {
    if (!this.currentPageId) return;

    // Prompt the user
    let promptTitle = 'Delete Email';
    let promptMessage = 'Are you sure you want to delete this email?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.deletePage, this);
  }

}
