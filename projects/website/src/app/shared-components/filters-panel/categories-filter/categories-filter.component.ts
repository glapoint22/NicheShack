import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoriesFilter } from '../../../classes/categories-filter';
import { CategoryFilter } from '../../../classes/category-filter';
import { NicheFilter } from '../../../classes/niche-filter';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['./categories-filter.component.scss']
})
export class CategoriesFilterComponent extends FilterComponent {
  @Input() categories: CategoriesFilter;
  public seeAllCategories: boolean;


  constructor(public route: ActivatedRoute, private router: Router) { super() }


  onCategoryClick(category: CategoryFilter) {
    let params: Params = {
      categoryId: category.urlId,
      categoryName: category.urlName,
      nicheId: null,
      nicheName: null,
      page: null
    }

    this.updateUrl(params);
  }



  onNicheClick(niche: NicheFilter) {
    let params: Params = {
      categoryId: null,
      categoryName: null,
      nicheId: niche.urlId,
      nicheName: niche.urlName,
      page: null
    }

    this.updateUrl(params);
  }


  onAnyCategoryClick() {
    let params: Params = {
      categoryId: null,
      categoryName: null,
      nicheId: null,
      nicheName: null,
      page: null
    }

    this.updateUrl(params);
  }

  updateUrl(params: Params) {
    this.router.navigate([location.pathname], { queryParams: params, queryParamsHandling: 'merge' });
  }
}