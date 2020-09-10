import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BreakpointService } from '../../../services/breakpoint.service';
import { BreakpointsPaddingComponent } from '../../../classes/breakpoints-padding-component';
import { BreakpointSpacing } from 'projects/manager/src/app/classes/breakpoint';
import { BreakpointType } from 'classes/breakpoint-type';

@Component({
  selector: 'padding',
  templateUrl: './padding.component.html',
  styleUrls: ['./padding.component.scss']
})
export class PaddingComponent {
  @Input() paddingComponent: BreakpointsPaddingComponent;
  @Output() onChange: EventEmitter<void> = new EventEmitter();
  public paddingValues: Array<string>;


  constructor(public breakpointService: BreakpointService) { }


  // -------------------------------------------------------------- Ng On Init ----------------------------------------------------------------------
  ngOnInit() {
    this.paddingValues = Object.values(BreakpointSpacing);
    this.checkBreakpoints();

    this.breakpointService.onBreakpointChange.subscribe(() => {
      this.checkBreakpoints();
    });
  }




  // ------------------------------------------------------------ On Value Change ----------------------------------------------------------------------
  onValueChange(position: string, value: string) {
    // If constrained, set the value for each position
    if (this.paddingComponent.padding.constrain) {
      this.setValue('Top', value);
      this.setValue('Right', value);
      this.setValue('Bottom', value);
      this.setValue('Left', value);
    } else {
      this.setValue(position, value);
    }

    this.onChange.emit();
  }





  // ------------------------------------------------------------------ Set Value --------------------------------------------------------------------------  
  setValue(position: string, value: string) {
    this.breakpointService.setBreakpointValue(value, this.paddingComponent.breakpoints, this.paddingComponent.padding[position.toLowerCase()], BreakpointType['Padding' + position]);
  }







  // ------------------------------------------------------------ Check Breakpoints ----------------------------------------------------------------------  
  checkBreakpoints() {
    this.breakpointService.isBreakpointSet(this.paddingComponent.breakpoints, this.paddingComponent.padding.top);
    this.breakpointService.isBreakpointSet(this.paddingComponent.breakpoints, this.paddingComponent.padding.right);
    this.breakpointService.isBreakpointSet(this.paddingComponent.breakpoints, this.paddingComponent.padding.bottom);
    this.breakpointService.isBreakpointSet(this.paddingComponent.breakpoints, this.paddingComponent.padding.left);
  }








  // ---------------------------------------------------------- On Breakpoint Change ------------------------------------------------------------------------  
  onBreakpointChange(position: string) {
    if (this.paddingComponent.padding.constrain) {
      this.toggleBreakpoint('Top');
      this.toggleBreakpoint('Right');
      this.toggleBreakpoint('Bottom');
      this.toggleBreakpoint('Left');
    } else {
      this.toggleBreakpoint(position);
    }

    this.onChange.emit();
  }





  // ------------------------------------------------------------ Set Breakpoint ----------------------------------------------------------------------------  
  toggleBreakpoint(position: string) {
    this.breakpointService.toggleBreakpoint(this.paddingComponent.breakpoints, this.paddingComponent.padding[position.toLowerCase()], BreakpointType['Padding' + position]);
  }
}