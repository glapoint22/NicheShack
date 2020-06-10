import { Component, HostListener } from '@angular/core';
import { FormService } from '../../../services/form.service';

@Component({
  template: '',
})
export class FormComponent {
  public show: boolean;

  constructor(public formService: FormService) { }

  @HostListener('document:keydown.escape')
  onEscapeKeydown() {
    this.show = false;
  }
}