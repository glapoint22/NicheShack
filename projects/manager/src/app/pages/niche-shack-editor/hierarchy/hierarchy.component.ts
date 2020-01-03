import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class HierarchyComponent implements OnInit {
  public categories: Array<any>;
  public selectedItem: any;
  public isCollapsed: boolean;
  public showMenu: boolean;



  // ---------------------Temp-----------------------------
  public getTempNiches(): Observable<any> {
    return new Observable(subscriber => {
      subscriber.next([
        {
          id: 0,
          name: 'Diets & Weight Loss'
        },
        {
          id: 1,
          name: 'Exercise & Fitness'
        },
        {
          id: 2,
          name: 'Remedies'
        },
        {
          id: 3,
          name: 'Nutrition'
        }
      ]);

    }).pipe(delay(1000))
  }


  public getTempProducts(): Observable<any> {
    return new Observable(subscriber => {
      subscriber.next([
        {
          id: '102B896BF0',
          name: 'The Paruresis Treatment System'
        },
        {
          id: '10C45610AF',
          name: 'SocialSaleRep'
        },
        {
          id: '10F6F95D3F',
          name: 'Crunch Cholesterol'
        },
        {
          id: '112298D096',
          name: 'Wealth Trigger 360'
        }
      ]);

    }).pipe(delay(1000))
  }
  // --------------------------------------------------------







  ngOnInit() {
    this.categories = [
      {
        id: 0,
        name: 'Health & Fitness'
      },
      {
        id: 1,
        name: 'Self-Help'
      },
      {
        id: 2,
        name: 'E-business & E-marketing'
      }
    ]
  }

  getNiches(categoryId: number, input: HTMLInputElement) {
    // Get the category from the categories array based on the passed in category id
    let category = this.categories.find(x => x.id == categoryId);

    // Mark this category as the selected item
    this.selectedItem = category;

    // If the category has not retrieved its niches
    if (!category.niches) {
      // Prevent the arrow button from rotating while loading the niches
      window.setTimeout(() => {
        input.checked = false;
      });

      // If this category is already in the process of loading niches, return
      if (category.loadingNiches) return;

      this.getTempNiches() // <- Replace with this.dataService.get(...)
        .subscribe(niches => {
          // Assign the niches to the category and flag loading has completed
          category.niches = niches;
          category.loadingNiches = false;

          // This will rotate the arrow button
          input.checked = true;

          // flag that we are expanding
          window.setTimeout(() => {
            category.expanded = true;
          }, 100);
        });

      // Flag that this category is loading its niches
      category.loadingNiches = true;


    } else {
      window.setTimeout(() => {
        // Expand or collapse
        category.expanded = input.checked;

        // Collapse each niche if the category is not checked
        if (!input.checked) {
          category.niches.forEach(niche => {
            niche.expanded = false;
          });
        }
      });
    }
  }



  getProducts(categoryId: number, nicheId: number, input: HTMLInputElement) {
    // Get the niche from the niches array based on the passed in category id and niche id
    let category = this.categories.find(x => x.id == categoryId);
    let niche = category.niches.find(x => x.id == nicheId);

    // Mark this niche as the selected item
    this.selectedItem = niche;

    // If the niche has not retrieved its products
    if (!niche.products) {

      // Prevent the arrow button from rotating while loading the products
      window.setTimeout(() => {
        input.checked = false;
      });


      // If this niche is already in the process of loading products, return
      if (niche.loadingProducts) return;

      this.getTempProducts() // <- Replace with this.dataService.get(...)
        .subscribe(products => {
          // Assign the products to the niche and flag loading has completed
          niche.products = products;
          niche.loadingProducts = false;

          // This will rotate the arrow button
          input.checked = true;

          // flag that we are expanding
          window.setTimeout(() => {
            niche.expanded = true;
          }, 100);
        });

      // Flag that this niche is loading its products
      niche.loadingProducts = true;

    } else {
      window.setTimeout(() => {
        niche.expanded = input.checked;
      });
    }
  }


  collapse() {
    this.selectedItem = null;

    this.categories.forEach(category => {
      category.expanded = false;

      if (category.niches) {
        category.niches.forEach(niche => {
          niche.expanded = false;
        });
      }

    });
  }


  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.code === 'Escape' || event.keyCode === 27) {
      this.selectedItem = null;
    }
  }

  transitionend(event) {
    if (event.target.classList.contains('expand-arrow-button')) {
      event.target.style = "";
    } else {
      event.target.style = "visibility: hidden";
    }
  }
}