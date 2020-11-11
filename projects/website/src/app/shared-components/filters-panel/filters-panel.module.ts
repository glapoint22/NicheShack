import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersPanelComponent } from './filters-panel.component';
import { FilterContainerComponent } from './filter-container/filter-container.component';
import { FilterComponent } from './filter/filter.component';
import { CustomInputModule } from 'shared-components/custom-input/custom-input.module';
import { CategoriesFilterComponent } from './categories-filter/categories-filter.component';
import { RatingFilterComponent } from './rating-filter/rating-filter.component';
import { StarsModule } from 'shared-components/stars/stars.module';
import { PriceFilterComponent } from './price-filter/price-filter.component';
import { FormsModule } from '@angular/forms';
import { CustomFilterComponent } from './custom-filter/custom-filter.component';



@NgModule({
  declarations: [
    FiltersPanelComponent,
    FilterContainerComponent,
    FilterComponent,
    CustomFilterComponent,
    CategoriesFilterComponent,
    RatingFilterComponent,
    PriceFilterComponent
  ],
  imports: [
    CommonModule,
    CustomInputModule,
    StarsModule,
    FormsModule
  ],
  exports: [FiltersPanelComponent]
})
export class FiltersPanelModule { }
