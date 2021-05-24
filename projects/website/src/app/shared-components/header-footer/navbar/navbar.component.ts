import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('input', { static: false }) searchInput: ElementRef<HTMLInputElement>;
  public categoriesList: Array<KeyValue<string, string>> = []
  public selectedCategoryIndex: number = 0;
  public customerName: string;
  public customerImage: string;
  public suggestionIndex: number = -1;
  public selectedCategory: Category;
  private subscription: Subscription;
  public suggestions: Array<Suggestion>;
  private isSuggestionBoxMousedown: boolean;
  private categories: Array<Category>;
  private searchwords: string;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private dataService: DataService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }



  ngAfterViewInit() {
    this.route.queryParamMap.subscribe((queryParams: ParamMap) => {
      this.searchInput.nativeElement.value = queryParams.get('search');
    });
  }


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
    this.categoriesList.unshift({ key: null, value: 'All Niches' });
  }

  setSelectedCategory(queryParams: ParamMap) {
    // Get the category id from the query params
    let categoryId: string = queryParams.get('categoryId');

    // If there is a category id, set as the selected category for the dropdown button
    if (categoryId) {
      let index: number = this.categoriesList.findIndex(x => x.key == categoryId);
      if (index >= 0) this.selectedCategoryIndex = index;
      this.selectedCategory = this.categories.find(x => x.urlId == categoryId);
    }
  }

  getSuggestions(input: HTMLInputElement) {
    this.searchwords = input.value;


    if (this.searchwords) {
      let parameters: Array<any>;

      if (this.selectedCategory) {
        parameters = [
          {
            key: 'searchWords',
            value: this.searchwords.toLowerCase()
          },
          {
            key: 'categoryId',
            value: this.selectedCategory.urlId
          }
        ]
      } else {
        parameters = [{ key: 'searchWords', value: this.searchwords.toLowerCase() }];
      }


      this.dataService.get('api/Products/GetSuggestions', parameters)
        .subscribe((suggestions: Array<Suggestion>) => {
          this.suggestions = [];
          this.suggestionIndex = -1;
          if (!input.value) return;

          if (suggestions) {
            let suggestionsCount: number;

            if (window.innerHeight > 800) {
              suggestionsCount = suggestions.length;
            } else if (window.innerHeight > 600) {
              suggestionsCount = Math.min(8, suggestions.length);
            } else if (window.innerHeight > 400) {
              suggestionsCount = Math.min(6, suggestions.length);
            } else {
              suggestionsCount = Math.min(4, suggestions.length);
            }


            for (let i = 0; i < suggestionsCount; i++) {
              let suggestion: Suggestion = suggestions[i];
              let html: string = suggestion.name.replace(new RegExp("\\b" + this.searchwords, "i"), '<span style="font-weight: 900;">' + this.searchwords.toLowerCase() + '</span>');

              this.suggestions.push({
                name: suggestion.name,
                category: suggestion.category,
                html: this.sanitizer.bypassSecurityTrustHtml(html)
              });
            }


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


  onCategoryClick(category: KeyValue<string, string>, input: HTMLInputElement) {
    if (category.key == null) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = this.categories.find(x => x.urlId == category.key);
    }

    input.focus();

    this.getSuggestions(input);

  }



  getSuggestionTooltip(suggestion: string) {
    if (this.selectedCategory) {
      return suggestion + ' in ' + this.selectedCategory.name;
    }

    return suggestion + ' in all categories';
  }



  search(searchword: string, category?: Category) {
    let queryParams: Params;

    if (!this.selectedCategory && !category) {
      queryParams = { 'search': searchword }
    } else {
      queryParams = {
        'search': searchword,
        'categoryId': (this.selectedCategory && this.selectedCategory.urlId) || (category && category.urlId),
        'categoryName': (this.selectedCategory && this.selectedCategory.urlName) || (category && category.urlName)
      }
    }

    this.router.navigate(['/search'], {
      queryParams: queryParams
    });
    this.suggestions = [];
  }


  onArrowPress(direction: number, input: HTMLInputElement) {
    this.suggestionIndex += direction;

    // Display the search words if the suggestionIndex is outside the bounds
    if (this.suggestions.length == 0 || this.suggestionIndex == -1 || this.suggestionIndex == this.suggestions.length) {
      input.value = this.searchwords;
      return;
    }

    // This will cause the selection to loop
    if (this.suggestionIndex == -2) {
      this.suggestionIndex = this.suggestions.length - 1;
    } else if (this.suggestionIndex == this.suggestions.length + 1) {
      this.suggestionIndex = 0;
    }

    // Display the suggestion in the search input
    input.value = this.suggestions[this.suggestionIndex].name;

    // Set the category in the category dropdown if the suggestion has a category
    if (this.suggestions.findIndex(x => x.category) != -1) {
      if (this.suggestions[this.suggestionIndex].category) {
        this.selectedCategoryIndex = this.categoriesList.findIndex(x => x.value == this.suggestions[this.suggestionIndex].category.name);
        this.selectedCategory = this.categories.find(x => x.name == this.categoriesList[this.selectedCategoryIndex].value);
      } else {
        this.selectedCategoryIndex = 0;
        this.selectedCategory = null;
      }
    }

  }
}