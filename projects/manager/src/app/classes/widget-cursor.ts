import { WidgetComponent } from '../shared-components/designer/widgets/widget/widget.component';
import { Type } from '@angular/core';

export interface WidgetCursor {
    title: string;
    component: Type<WidgetComponent>;
    icon: string;
    allowed: string;
    notAllowed: string;
}