import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersPanelComponent } from './filters-panel/filters-panel.component';
import { CustomInputModule } from 'shared-components/custom-input/custom-input.module';
import { StarsModule } from 'shared-components/stars/stars.module';
import { FormsModule } from '@angular/forms';
import { FilterContainerComponent } from './filter-container/filter-container.component';
import { FilterComponent } from './filter/filter.component';
import { CategoriesFilterComponent } from './categories-filter/categories-filter.component';
import { RatingFilterComponent } from './rating-filter/rating-filter.component';
import { PriceFilterComponent } from './price-filter/price-filter.component';
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
  exports: [
    FiltersPanelComponent,
    FilterContainerComponent,
    FilterComponent,
    CustomFilterComponent,
    CategoriesFilterComponent,
    RatingFilterComponent,
    PriceFilterComponent
  ]
})
export class ProductFiltersModule { }
