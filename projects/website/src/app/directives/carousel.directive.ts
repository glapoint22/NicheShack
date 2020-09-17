import { Directive, ElementRef, HostListener, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { CarouselElement } from '../classes/carousel-element';

@Directive({
  selector: '[carousel]'
})
export class CarouselDirective implements AfterViewChecked {
  @Output() onChange: EventEmitter<number> = new EventEmitter();
  @Output() onClick: EventEmitter<number> = new EventEmitter();
  public isPlaying: boolean;
  private transitionSpeed: number = 500;
  private carouselElements: Array<CarouselElement> = [];
  private translation: number = 0;
  private currentElementIndex: number = 0;
  private currentX: number;
  private direction: number;
  private interval: number;
  private inTransition: boolean;

  constructor(private el: ElementRef<HTMLElement>) { }



  // ----------------------------------------------------Ng After View Checked----------------------------------------------------------
  ngAfterViewChecked() {
    if (this.el.nativeElement.childElementCount > 1 && this.carouselElements.length == 0) {
      let elementArray = Array.from(this.el.nativeElement.children);
      let firstElement = this.el.nativeElement.children[0].cloneNode(true) as HTMLElement;
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
      firstElement.onclick = (event) => event.preventDefault();
      firstElement.onmousedown = (event) => event.preventDefault();
      this.el.nativeElement.appendChild(firstElement);


      // Add the listeners
      this.el.nativeElement.addEventListener("touchstart", (e: TouchEvent) => this.onTouchstart(e));
      this.el.nativeElement.addEventListener("mousedown", (e: MouseEvent) => this.onMousedown(e));
      this.el.nativeElement.addEventListener("click", () => this.click());
      this.el.nativeElement.addEventListener('transitionend', () => {
        this.inTransition = false;
        this.el.nativeElement.style.transition = '';
        if (this.isPlaying) {
          window.clearInterval(this.interval);
          this.play();
        }
      });
    }
  }







  // ----------------------------------------------------Move----------------------------------------------------------
  move() {
    if (this.translation == this.carouselElements[this.carouselElements.length - 1].end && this.direction == -1) {
      this.el.nativeElement.style.transition = 'all 0ms ease 0s';
      this.translation = 0;
      this.el.nativeElement.style.transform = 'translateX(' + this.translation + 'px)';
      window.setTimeout(() => {
        this.translate();
      });
    } else
      if (this.translation == 0 && this.direction == 1) {
        this.el.nativeElement.style.transition = 'all 0ms ease 0s';
        this.translation = this.carouselElements[this.carouselElements.length - 1].end;
        this.el.nativeElement.style.transform = 'translateX(' + this.translation + 'px)';
        window.setTimeout(() => {
          this.translate();
        });
      } else {
        this.translate();
      }
  }












  // ----------------------------------------------------On Drag----------------------------------------------------------
  onDrag(clientX: number) {
    // Reset the transition
    this.el.nativeElement.style.transition = 'all 0ms ease 0s';

    // Calculate the delta
    let delta = clientX - this.currentX;
    this.currentX = clientX;

    // Get the direction the carousel is moving
    if (delta != 0) this.direction = Math.sign(delta);


    // Calculate the translation of the carousel
    this.translation += delta;


    // This will translate the carousel at the end when the carousel has moved beyond zero
    // This is needed for a seamless transition
    if (this.translation > 0) {
      this.translation = this.carouselElements[this.carouselElements.length - 1].end;
    }


    // This will translate the carousel at the begining when the carousel has moved beyond the last element
    // This is needed for a seamless transition
    if (this.translation < this.carouselElements[this.carouselElements.length - 1].end) {
      this.translation = 0;
    }

    // Translate the element
    this.el.nativeElement.style.transform = 'translateX(' + this.translation + 'px)';
  }













  // ----------------------------------------------------Translate----------------------------------------------------------
  translate() {
    // Set the transition
    this.el.nativeElement.style.transition = 'all ' + this.transitionSpeed + 'ms cubic-bezier(0.22, 0.5, 0.5, 1) 0s';

    // If we are on the last element
    if (this.currentElementIndex == this.carouselElements.length) {
      // Go to the last appended element
      this.translation = this.carouselElements[this.currentElementIndex - 1].end
      this.currentElementIndex = 0
    }

    // If we are on the first element
    else if (this.currentElementIndex < 0) {
      // Set the current media index at the last element
      this.currentElementIndex = this.carouselElements.length - 1;
      this.translation = this.carouselElements[this.currentElementIndex].start;
    } else {
      this.translation = this.carouselElements[this.currentElementIndex].start;
    }


    // Translate the element
    this.el.nativeElement.style.transform = 'translateX(' + this.translation + 'px)';

    this.onChange.emit(this.currentElementIndex);
  }












  // ----------------------------------------------------On Touch Start----------------------------------------------------------
  onTouchstart(touchStartEvent: TouchEvent) {
    if (this.carouselElements.length == 0) return;


    this.inTransition = true;

    this.currentX = touchStartEvent.changedTouches[0].clientX;
    this.direction = 0;

    let onTouchemove = (touchMoveEvent: TouchEvent) => {
      this.onDrag(touchMoveEvent.changedTouches[0].clientX);
    }


    // touchend
    let onTouchend = () => {
      this.currentElementIndex -= this.direction;
      this.translate();



      // Remove the listeners
      document.removeEventListener("touchmove", onTouchemove);
      document.removeEventListener("touchend", onTouchend);
    }

    // Add the listeners
    document.addEventListener("touchmove", onTouchemove);
    document.addEventListener("touchend", onTouchend);
  }






  // ----------------------------------------------------On Mouse Down----------------------------------------------------------
  onMousedown(mousedownEvent: MouseEvent) {
    if (this.carouselElements.length == 0) return;

    this.inTransition = true;

    this.currentX = mousedownEvent.clientX;
    this.direction = 0;

    let onMousemove = (mousemoveEvent: MouseEvent) => {
      this.onDrag(mousemoveEvent.clientX);
    }


    // touchend
    let onMouseup = () => {
      this.currentElementIndex -= this.direction;
      this.translate();

      // Remove the listeners
      document.removeEventListener("mousemove", onMousemove);
      document.removeEventListener("mouseup", onMouseup);
    }

    // Add the listeners
    document.addEventListener("mousemove", onMousemove);
    document.addEventListener("mouseup", onMouseup);
  }











  // ----------------------------------------------------Click----------------------------------------------------------
  click() {
    if (this.direction == 0) {
      this.onClick.emit(this.currentElementIndex);
      this.inTransition = false;
    }

  }









  // ----------------------------------------------------Next----------------------------------------------------------
  next(direction: number) {
    this.inTransition = true;
    this.direction = direction;
    this.currentElementIndex -= direction;
    this.move();
  }










  // ----------------------------------------------------Goto----------------------------------------------------------
  goto(index: number) {
    this.inTransition = true;
    this.direction = Math.sign(this.currentElementIndex - index);
    this.currentElementIndex = index;
    this.move();
  }










  // ----------------------------------------------------Play----------------------------------------------------------
  play() {
    this.isPlaying = true;
    this.interval = window.setInterval(() => {
      if (!this.inTransition) {
        this.direction = -1;
        this.currentElementIndex -= this.direction;
        this.move();
      }

    }, 5000);
  }











  // ----------------------------------------------------Pause----------------------------------------------------------
  pause() {
    window.clearInterval(this.interval);
    this.isPlaying = false;
  }










  // ----------------------------------------------------On Resize----------------------------------------------------------
  @HostListener('window:resize') onResize() {
    if (this.carouselElements.length == 0) return;
    let start = 0;

    this.carouselElements.forEach((element: CarouselElement, index) => {
      let end = -this.el.nativeElement.children[index].clientWidth + start;

      element.start = start;
      element.end = end;

      start = end;
    });

    this.translation = 0;
    this.currentElementIndex = 0;

    // Translate the element
    this.el.nativeElement.style.transform = 'translateX(' + this.translation + 'px)';

    this.onChange.emit(this.currentElementIndex);
  }
}