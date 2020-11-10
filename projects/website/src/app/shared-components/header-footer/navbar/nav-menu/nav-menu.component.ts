import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'projects/website/src/app/services/categories.service';
import { Category } from 'projects/website/src/app/interfaces/category';
import { Niche } from 'projects/website/src/app/interfaces/niche';
import { Router } from '@angular/router';
import { DataService } from 'services/data.service';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  public categories: Array<Category>;
  public niches: Array<Niche>;
  public currentCategory: Category;
  public nicheView: boolean;
  public show: boolean;


  constructor(private categoriesService: CategoriesService, private router: Router, private dataService: DataService) { }

  onClick() {
    this.nicheView = false;
    this.show = !this.show;
  }

  ngOnInit() {
    this.categoriesService.categories.subscribe((categories: Array<Category>) => {
      this.categories = categories;
    });
  }


  onCategoryClick(category: Category) {
    this.dataService.get('api/Niches', [{ key: 'categoryId', value: category.id }])
      .subscribe(niches => {
        this.niches = niches;
        this.nicheView = true;
        this.currentCategory = category;
      });
  }

  onNicheClick(niche: Niche) {
    let queryParams = {
      'nicheName': niche.urlName,
      'nicheId': niche.urlId
    }

    this.router.navigate(['/browse'], {
      queryParams
    });
    this.show = false;
  }
}