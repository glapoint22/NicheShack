import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { PopupService } from '../../services/popup.service';

@Directive({
  selector: '[showPopup]'
})
export class ShowPopupDirective {
  @Input() popup: string;

  constructor(private sourceElement: ElementRef, private popupService: PopupService) { }

  @HostListener('click')
  onClick() {
    this.popupService.sourceElement = this.sourceElement.nativeElement;
    this.popupService[this.popup] = !this.popupService[this.popup];
  }
}