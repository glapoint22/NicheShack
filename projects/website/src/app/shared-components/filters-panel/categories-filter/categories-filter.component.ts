import { Component, Input } from '@angular/core';
import { Params } from '@angular/router';
import { CategoryFilter } from '../../../classes/category-filter';
import { NicheFilter } from '../../../classes/niche-filter';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['./categories-filter.component.scss']
})
export class CategoriesFilterComponent extends FilterComponent {
  @Input() categories: Array<CategoryFilter>;
  
  

  onCategoryClick(category: CategoryFilter) {
    let params: Params = {
      categoryId: category.urlId,
      categoryName: category.urlName,
      nicheId: null,
      nicheName: null,
      page: null
    }

    // this.updateUrl(params);
  }



  onNicheClick(niche: NicheFilter) {
    let params: Params = {
      categoryId: null,
      categoryName: null,
      nicheId: niche.urlId,
      nicheName: niche.urlName,
      page: null
    }

    // this.updateUrl(params);
  }

}
