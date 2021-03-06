import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';

@Directive({
  selector: '[show]'
})
export class ShowDirective {
  private id: string = 'show-hide';
  private timer: number;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private el: ElementRef) { }

  @Input() set show(condition: boolean) {
    if (condition) {
      // If element does not exist
      if (!this.el.nativeElement.nextSibling || (this.el.nativeElement.nextSibling && this.el.nativeElement.nextSibling.id != this.id)) {
        // Create the element
        this.viewContainer.createEmbeddedView(this.templateRef);

        // Assign the ID
        this.el.nativeElement.nextSibling.id = this.id;

        // Wait for the DOM to be updated
        window.setTimeout(() => {
          // Add the classes to the class list
          this.toggleClasses();
          if (this.el.nativeElement.nextSibling.focus) {
            this.el.nativeElement.nextSibling.focus();
          }

        }, 20);

      } else {
        clearTimeout(this.timer);
        // Add the classes to the class list
        this.toggleClasses();
        this.el.nativeElement.nextSibling.focus();
      }
    } else if (condition == false) {
      // Remove the classes from the class list
      this.toggleClasses();

      this.timer = window.setTimeout(() => {
        this.viewContainer.clear();
      }, 200);
    }
  }

  toggleClasses() {
    // This will remove or add classes to the class list
    if (this.el.nativeElement.nextSibling && this.el.nativeElement.nextSibling.attributes && this.el.nativeElement.nextSibling.attributes["transitionClass"]) {
      let classes: Array<string> = this.el.nativeElement.nextSibling.attributes["transitionClass"].value.split(' ');
      classes.forEach((currentClass: string) => {
        this.el.nativeElement.nextSibling.classList.toggle(currentClass);
      });
    }
  }
}