import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { CarouselElement } from '../classes/carousel-element';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[carousel]'
})
export class CarouselDirective {
  @Output() onChange: EventEmitter<number> = new EventEmitter();
  @Output() onClick: EventEmitter<void> = new EventEmitter();
  private carouselElements: Array<CarouselElement> = [];
  private translate: number = 0;
  private currentElementIndex: number = 0;

  constructor(private el: ElementRef) { }


  ngAfterViewInit() {
    if (this.el.nativeElement.childElementCount <= 1) return;

    let elementArray = Array.from(this.el.nativeElement.children);
    let firstElement = this.el.nativeElement.children[0].cloneNode(true);
    let start = 0;

    // This will get the start and end positions for each carousel element
    elementArray.forEach((element: HTMLElement) => {
      this.carouselElements.push({
        start: start,
        end: -element.clientWidth + start
      });

      start = -element.clientWidth + start;
    });


    // Append the first elemnt at the end for a seamless transition
    this.el.nativeElement.appendChild(firstElement);



    fromEvent(this.el.nativeElement, 'touchend').pipe(debounceTime(1000)).subscribe(() => {
      if (this.translate == this.carouselElements[this.carouselElements.length - 1].end) {
        this.translate = 0;

        // Translate the element
        this.el.nativeElement.style.transform = 'translateX(' + this.translate + 'px)';
      }

      // Reset the transition
      this.el.nativeElement.style.transition = '';

    });


    this.el.nativeElement.addEventListener("click", ()=> this.onMediaClick());

    this.el.nativeElement.addEventListener("touchstart", (e: TouchEvent)=> this.onTouchstart(e));
  }



  onTouchstart(touchStartEvent: TouchEvent) {
    if (this.carouselElements.length == 0) return;

    let currentX = touchStartEvent.changedTouches[0].clientX;
    let delta: number = 0;
    let direction: number = 0;


    let onTouchemove = (touchMoveEvent: TouchEvent) => {
      // Reset the transition
      this.el.nativeElement.style.transition = 'all 0ms ease 0s';

      // Calculate the delta
      delta = touchMoveEvent.changedTouches[0].clientX - currentX;
      currentX = touchMoveEvent.changedTouches[0].clientX;

      // Get the direction the carousel is moving
      if (delta != 0) direction = Math.sign(delta);


      // Calculate the translation of the carousel
      this.translate += delta;


      // This will translate the carousel at the end when the carousel has moved beyond zero
      // This is needed for a seamless transition
      if (this.translate > 0) {
        this.translate = this.carouselElements[this.carouselElements.length - 1].end;
      }


      // This will translate the carousel at the begining when the carousel has moved beyond the last element
      // This is needed for a seamless transition
      if (this.translate < this.carouselElements[this.carouselElements.length - 1].end) {
        this.translate = 0;
      }

      // Translate the element
      this.el.nativeElement.style.transform = 'translateX(' + this.translate + 'px)';

    }

    // touchend
    let onTouchend = () => {
      // Set the transition
      this.el.nativeElement.style.transition = 'all 500ms cubic-bezier(0.22, 0.5, 0.5, 1) 0s';

      if (direction == -1) {
        this.currentElementIndex++;

        // If we are on the last element
        if (this.currentElementIndex == this.carouselElements.length) {
          // Go to the last appended element
          this.translate = this.carouselElements[this.currentElementIndex - 1].end
          this.currentElementIndex = 0
        } else {
          // Go to the next element
          this.translate = this.carouselElements[this.currentElementIndex].start;
        }


      } else if (direction == 1) {
        this.currentElementIndex--;

        // If we are on the first element
        if (this.currentElementIndex < 0) {
          // Set the current media index at the last element
          this.currentElementIndex = this.carouselElements.length - 1;
        }

        this.translate = this.carouselElements[this.currentElementIndex].start;
      }

      // Translate the element
      this.el.nativeElement.style.transform = 'translateX(' + this.translate + 'px)';

      this.onChange.emit(this.currentElementIndex);

      document.removeEventListener("touchmove", onTouchemove);
      document.removeEventListener("touchend", onTouchend);
    }

    // Add the listeners
    document.addEventListener("touchmove", onTouchemove);
    document.addEventListener("touchend", onTouchend);
  }




  onMediaClick() {
    this.onClick.emit();
  }




  @HostListener('window:resize') onResize() {
    if (this.carouselElements.length == 0) return;
    let start = 0;

    this.carouselElements.forEach((element: CarouselElement, index) => {
      let end = -this.el.nativeElement.children[index].clientWidth + start;

      element.start = start;
      element.end = end;

      start = end;
    });

    this.translate = 0;
    this.currentElementIndex = 0;

    // Translate the element
    this.el.nativeElement.style.transform = 'translateX(' + this.translate + 'px)';

    this.onChange.emit(this.currentElementIndex);
  }
}