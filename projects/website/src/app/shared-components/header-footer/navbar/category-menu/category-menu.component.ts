import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoriesService } from 'projects/website/src/app/services/categories.service';
import { Category } from 'projects/website/src/app/interfaces/category';
import { Niche } from 'projects/website/src/app/interfaces/niche';
import { Router } from '@angular/router';

@Component({
  selector: 'category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {
  public show: boolean;
  private isMouseDown: boolean;
  public categories: Array<Category>;
  public niches: Array<Niche>;
  public currentCategory: Category;
  public nicheView: boolean;

  @ViewChild('menu', {static: false}) menu: ElementRef;
  

  constructor(private categoriesService: CategoriesService, private router: Router) { }

  ngOnInit() {
    this.categoriesService.categories.subscribe((categories: Array<Category>) => {
      this.categories = categories;
    });
  }

  onKeydown(event: KeyboardEvent, dropdown: HTMLElement) {
    // If escape is pressed, hide the menu
    if (event.code === 'Escape' || event.keyCode === 27) {
      this.show = false;
      dropdown.blur();
    }
  }

  onClick() {
    if (this.isMouseDown) {
      this.isMouseDown = false;
      return;
    }

    // show the menu and set the focus
    this.nicheView = false;
    this.show = true;
    this.menu.nativeElement.focus();
  }

  onMousedown() {
    if(this.show) {
      this.isMouseDown = true;
    } else {
      this.isMouseDown = false;
    }
  }

  onCategoryClick(categoryId: number) {
    this.currentCategory = this.categories[categoryId];
    this.niches = this.categories[categoryId].niches;
    this.nicheView = true;
  }

  onNicheClick(nicheId: number) {
    this.router.navigate(['/search'], {
      queryParams: { 'categoryId': this.currentCategory.id, 'nicheId': nicheId }
    });
    this.show = false;
  }

}
