import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';

@Directive({
  selector: '[show]'
})
export class ShowDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private el: ElementRef) { }

  @Input() set show(condition: boolean) {
    if (condition && !this.el.nativeElement.nextSibling.style.opacity) {
      this.hasView = true;
      this.viewContainer.createEmbeddedView(this.templateRef);
      
      // Add opacity and transition properties
      this.el.nativeElement.nextSibling.style.opacity = 0;
      this.el.nativeElement.nextSibling.style.transition = 'opacity 0.2s linear';

      // This event is triggered when the element has faded out
      this.el.nativeElement.nextSibling.addEventListener("transitionend", (event) => {
        if (!this.hasView && event.propertyName == 'opacity') {
          // Remove the element
          this.viewContainer.clear();
        }
      });

      // Wait 100 milliseconds to set the opacity property
      setTimeout(() => {
        this.el.nativeElement.nextSibling.style.opacity = 1;
      }, 100);
    } else if (!condition && this.hasView) {
      // Set the opacity to 0 to start the fading out
      this.el.nativeElement.nextSibling.style.opacity = 0;
      this.hasView = false;
    }
  }
}