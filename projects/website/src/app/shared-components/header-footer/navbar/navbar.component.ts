import { Component, OnInit, OnDestroy } from '@angular/core';
import { KeyValue } from '@angular/common';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../interfaces/category';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { AccountService } from 'services/account.service';
import { Customer } from 'classes/customer';
import { Subscription } from 'rxjs';
import { DataService } from 'services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Suggestion } from '../../../classes/suggestion';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public categoriesList: Array<KeyValue<string, string>> = []
  public selectedCategoryIndex: number = 0;
  public customerName: string;
  public customerImage: string;
  private subscription: Subscription;
  public suggestions: Array<Suggestion>;
  // public suggestedCategory: SuggestedCategory;
  private isSuggestionBoxMousedown: boolean;
  private categories: Array<Category>;
  private selectedCategory: Category;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private dataService: DataService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    // Get the customer's first name
    this.subscription = this.accountService.customer
      .subscribe((customer: Customer) => {
        if (customer) {
          this.customerName = customer.firstName;
          this.customerImage = customer.image;
        }
      });


    this.route.queryParamMap.subscribe((queryParams: ParamMap) => {
      // If we don't have categories yet, use the categories service to get them from the database
      if (this.categoriesList.length == 0) {
        this.categoriesService.categories.subscribe((categories: Array<Category>) => {
          this.categories = categories;

          // Set the categories for the category dropdown button
          this.setCategoriesForDropdown(categories);
          this.setSelectedCategory(queryParams);
        });
      } else {
        // Set the selected category in the dropdown button based on the query params
        this.setSelectedCategory(queryParams);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  setCategoriesForDropdown(categories: Array<Category>): void {
    // Map the categories into a key value pair(id, name)
    this.categoriesList = categories.slice().map(x => ({ key: x.urlId, value: x.name }));

    // Prepend "all" to the list of categories
    this.categoriesList.unshift({ key: null, value: 'All' });
  }

  setSelectedCategory(queryParams: ParamMap) {
    // Get the category id from the query params
    let categoryId: string = queryParams.get('categoryId');

    // If there is a category id, set as the selected category for the dropdown button
    if (categoryId) {
      let index: number = this.categoriesList.findIndex(x => x.key == categoryId);
      if (index >= 0) this.selectedCategoryIndex = index;
    }
  }

  getSuggestions(searchwords: string) {
    if (searchwords) {
      let parameters: Array<any>;

      if (this.selectedCategory) {
       parameters = [
          {
            key: 'searchWords',
            value: searchwords
          },
          {
            key: 'categoryId',
            value: this.selectedCategory.urlId
          }
        ]
      } else {
        parameters = [{ key: 'searchWords', value: searchwords }];
      }


      this.dataService.get('api/Products/GetSuggestions', parameters)
        .subscribe((suggestions: Array<Suggestion>) => {
          this.suggestions = [];
          // this.suggestedCategory = null;

          if (suggestions) {
            // this.suggestedCategory = suggestions.suggestedCategory;
            suggestions.forEach((suggestion) => {
              let html: string = suggestion.name.replace(new RegExp(searchwords, "i"), '<span style="font-weight: normal">' + searchwords.toLowerCase() + '</span>');

              this.suggestions.push({
                name: suggestion.name,
                category: suggestion.category,
                html: this.sanitizer.bypassSecurityTrustHtml(html)
              });
            });
          }

        });
    } else {
      this.suggestions = [];
    }
  }


  hideSuggestionBox() {
    if (this.isSuggestionBoxMousedown) {
      this.isSuggestionBoxMousedown = false;
      return;
    }

    let suggestionBox = document.getElementById('suggestionBox');

    if (suggestionBox) this.suggestions = [];
  }

  mousedown() {
    this.isSuggestionBoxMousedown = true;
  }


  onCategoryClick(category: KeyValue<string, string>) {
    if (category.key == null) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = this.categories.find(x => x.urlId == category.key);
    }
  }



  getSuggestionTooltip(suggestion: string) {
    if (this.selectedCategory) {
      return suggestion + ' in ' + this.selectedCategory.name;
    }

    return suggestion + ' in all categories';
  }



  search(searchword: string) {
    let queryParams: Params;

    if (!this.selectedCategory) {
      queryParams = { 'query': searchword }
    } else {


      queryParams = {
        'query': searchword,
        'categoryId': this.selectedCategory.urlId,
        'categoryName': this.selectedCategory.urlName
      }
    }

    this.router.navigate(['/search'], {
      queryParams: queryParams
    });
    this.suggestions = [];
  }
}