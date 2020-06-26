import { Component, OnInit, HostListener } from '@angular/core';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'video-url-form',
  templateUrl: './video-url-form.component.html',
  styleUrls: ['./video-url-form.component.scss']
})
export class VideoUrlFormComponent extends FormComponent implements OnInit {
  public submitButtonDisabled: boolean;
  private urlInputValue: string;


  @HostListener('document:keydown.enter')
  onEnterKeydown() {
    this.show = false;
    if(!this.submitButtonDisabled) this.formService.onVideoUrlFormSubmit.next(this.urlInputValue);
  }

  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.formService.videoUrlForm = this;
  }


  // --------------------------------( ON SHOW )-------------------------------- \\
  onShow(urlInput: HTMLInputElement) {
    urlInput.focus();
    this.submitButtonDisabled = true;
  }


  // --------------------------------( ON SUBMIT CLICK )-------------------------------- \\
  onSubmitClick(urlInput: HTMLInputElement) {
    this.show = false;
    this.formService.onVideoUrlFormSubmit.next(urlInput.value);
  }


  onInputChange(urlInput: HTMLInputElement) {
    this.submitButtonDisabled = urlInput.value.length == 0 ? true : false;
    this.urlInputValue = urlInput.value;
  }
}
