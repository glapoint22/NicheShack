import { Component, ViewChild, ViewContainerRef, ComponentFactory, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { RowComponent } from '../row/row.component';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) { }


  createRow(top: number): RowComponent {
    // Create the new row
    let rowComponentFactory: ComponentFactory<RowComponent> = this.resolver.resolveComponentFactory(RowComponent);
    let rowComponentRef: ComponentRef<RowComponent> = this.viewContainerRef.createComponent(rowComponentFactory);

    // Set the position of the row
    rowComponentRef.instance.top = top;

    // Detect changes
    rowComponentRef.hostView.detectChanges();

    // Return the new row
    return rowComponentRef.instance;
  }
}