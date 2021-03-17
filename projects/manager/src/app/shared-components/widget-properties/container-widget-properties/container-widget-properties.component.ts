import { Component, Input, OnChanges } from '@angular/core';
import { ContainerWidgetComponent } from '../../designer/widgets/container-widget/container-widget.component';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'container-widget-properties',
  templateUrl: './container-widget-properties.component.html',
  styleUrls: ['./container-widget-properties.component.scss']
})
export class ContainerWidgetPropertiesComponent implements OnChanges {
  @Input() containerWidget: ContainerWidgetComponent;
  private paddingBottom: number;
  private border: number;

  constructor(public pageService: PageService) { }


  ngOnChanges() {
    this.paddingBottom = parseInt(this.containerWidget.padding.bottom.value);
    this.border = this.containerWidget.border.enable ? this.containerWidget.border.width : 0;
  }

  onPaddingChanges() {
    // We have to adjust the row on padding changes
    let newPaddingBottomValue = parseInt(this.containerWidget.padding.bottom.value);
    let delta = newPaddingBottomValue - this.paddingBottom;

    this.containerWidget.onRowTransform(delta);
    this.paddingBottom = newPaddingBottomValue;
  }


  onBorderChanges() {
    // We have to adjust the row on border changes
    let newBorderValue = this.containerWidget.border.enable ? this.containerWidget.border.width : 0;
    let delta = newBorderValue - this.border;

    if (delta != 0) {
      this.containerWidget.onRowTransform(delta);
      this.border = newBorderValue;
    }
  }
}