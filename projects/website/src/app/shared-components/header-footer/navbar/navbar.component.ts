import { Component, OnInit, OnDestroy } from '@angular/core';
import { KeyValue } from '@angular/common';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../interfaces/category';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AccountService } from 'services/account.service';
import { Customer } from 'classes/customer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public categories: Array<KeyValue<number, string>> = []
  public selectedCategoryIndex: number = 0;
  public customerName: string;
  public customerImage: string;
  private subscription: Subscription;

  constructor(private categoriesService: CategoriesService, private route: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit(): void {
    // Get the customer's first name
    this.subscription = this.accountService.customer
      .subscribe((customer: Customer) => {
        if(customer) {
          this.customerName = customer.firstName;
          this.customerImage = customer.image;
        }
      });


    this.route.queryParamMap.subscribe((queryParams: ParamMap) => {
      // If we don't have categories yet, use the categories service to get them from the database
      if (this.categories.length == 0) {
        this.categoriesService.categories.subscribe((categories: Array<Category>) => {
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
    this.categories = categories.slice().map(x => ({ key: x.id, value: x.name }));

    // Prepend "all" to the list of categories
    this.categories.unshift({ key: -1, value: 'All' });
  }

  setSelectedCategory(queryParams: ParamMap) {
    // Get the category id from the query params
    let categoryId: string = queryParams.get('categoryId');

    // If there is a category id, set as the selected category for the dropdown button
    if (categoryId) {
      let index: number = this.categories.findIndex(x => x.key == Number(categoryId));
      if (index >= 0) this.selectedCategoryIndex = index;
    }
  }
}