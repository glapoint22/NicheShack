import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'projects/website/src/app/services/categories.service';
import { Category } from 'projects/website/src/app/interfaces/category';
import { Niche } from 'projects/website/src/app/interfaces/niche';
import { Router } from '@angular/router';

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


  constructor(private categoriesService: CategoriesService, private router: Router) { }

  onClick() {
    this.nicheView = false;
    this.show = !this.show;
  }

  ngOnInit() {
    this.categoriesService.categories.subscribe((categories: Array<Category>) => {
      this.categories = categories;
    });
  }


  // onCategoryClick(categoryId: number) {
  //   this.currentCategory = this.categories[categoryId];
  //   this.niches = this.categories[categoryId].niches;
  //   this.nicheView = true;
  // }

  // onNicheClick(nicheId: number) {
  //   this.router.navigate(['/search'], {
  //     queryParams: { 'categoryId': this.currentCategory.id, 'nicheId': nicheId }
  //   });
  //   this.show = false;
  // }
}