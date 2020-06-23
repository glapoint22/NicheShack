import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { KeyValue } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TempDataService {

  get(url: string, parameters?: Array<KeyValue<string, string>>, responseType?: any): Observable<any> {
    switch (url) {
      // Filters
      case 'api/Filters':

        return of([
          {
            id: 'yrttretwt',
            name: 'Product Type'
          },
          {
            id: 'jhgfsdgfa',
            name: 'Billing Type'
          },
          {
            id: 'qwerghghjkjg',
            name: 'Promotional'
          },
          {
            id: 'rtewghdgfadfdsfs',
            name: 'Media Type'
          },
          {
            id: 'oiuiiytreygsgdfg',
            name: 'Gender'
          }
        ]).pipe(delay(1000));




      // Filter options
      case 'api/FilterOptions':
        if (parameters[0].value == 'yrttretwt') {
          return of([
            {
              id: 'hgfdhfhgfh',
              name: 'Physical',
              checked: true
            },
            {
              id: 'kjhgkjkhk',
              name: 'Digital Download',
              checked: false
            },
            {
              id: 'qwfeerwer',
              name: 'Email',
              checked: false
            },
            {
              id: 'hgfdfgfghfhgf',
              name: 'Online Membership',
              checked: true
            }
          ]).pipe(delay(1000));
        } else if (parameters[0].value == 'jhgfsdgfa') {
          return of([
            {
              id: 'pouiuy',
              name: 'Single Payment',
              checked: false
            },
            {
              id: 'nbcvnvbnn',
              name: 'Recurring',
              checked: true
            },
            {
              id: 'kjghkhkhkgfd',
              name: 'Trial',
              checked: false
            }
          ]).pipe(delay(1000));
        } else if (parameters[0].value == 'qwerghghjkjg') {
          return of([
            {
              id: 'ldlflflfs',
              name: 'Videos',
              checked: false
            }
          ]).pipe(delay(1000));
        } else if (parameters[0].value == 'rtewghdgfadfdsfs') {
          return of([
            {
              id: 'lqrewqrwqerwre',
              name: 'Book',
              checked: true
            },
            {
              id: 'zfzfzdfxfxffs',
              name: 'Video',
              checked: true
            },
            {
              id: 'isgdgjhgja',
              name: 'Audio',
              checked: false
            },
            {
              id: 'tfadghfgddhj',
              name: 'Software',
              checked: false
            }
          ]).pipe(delay(1000));
        } else if (parameters[0].value == 'oiuiiytreygsgdfg') {
          return of([
            {
              id: 'yyerwtgdsfg',
              name: 'Men',
              checked: false
            },
            {
              id: 'aaaafdsafsdf',
              name: 'Women',
              checked: true
            }
          ]).pipe(delay(1000));
        }







      // Categories
      case 'api/Categories':
        return of([
          {
            id: 'fdsafdfds',
            name: 'Health & Fitness'
          },
          {
            id: 'hgfdhfhhgf',
            name: 'Self-Help'
          },
          {
            id: 'rewqrewer',
            name: 'E-business & E-marketing'
          }
        ]).pipe(delay(1000));





      // Niches
      case 'api/Niches':
        return of([
          {
            id: 'fsdfafsdf',
            name: 'Diets & Weight Loss'
          },
          {
            id: 'yttrtr',
            name: 'Exercise & Fitness'
          },
          {
            id: 'rewqerweer',
            name: 'Remedies'
          },
          {
            id: 'hffgdhfggh',
            name: 'Nutrition'
          }
        ]).pipe(delay(1000));





      // Products
      case 'api/Products':
        return of([
          {
            id: '102B896BF0',
            name: 'Booty Type Training'
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
        ]).pipe(delay(1000));




      // Products Search
      case 'api/Products/Search':
        return of([
          {
            id: 'IFDASFRQEWQ',
            name: 'It\'s Good To Be A Gumpy'
          },
          {
            id: 'OIUGSFDGDA',
            name: 'Gumpy Flavor of the Month'
          },
          {
            id: 'QRTREYEYHRTY',
            name: 'There Are Two Sides To Every Gumpy'
          },
          {
            id: 'LHDSGFGEFRFR',
            name: 'The History of Gumpy\'s Ice Cream'
          }
        ]).pipe(delay(1000));




      // Niches Search
      case 'api/Niches/Search':
        return of([
          {
            id: 'fsdfafsdf',
            name: 'Diets & Weight Loss Gumpy'
          },
          {
            id: 'yttrtr',
            name: 'Exercise & Fitness Gumpy'
          },
          {
            id: 'rewqerweer',
            name: 'Remedies Gumpy'
          },
          {
            id: 'hffgdhfggh',
            name: 'Nutrition Gumpy'
          }
        ]).pipe(delay(1000));





      // Categories Search
      case 'api/Categories/Search':
        return of([
          {
            id: 'fdsafdfds',
            name: 'Health & Gumpy Fitness'
          },
          {
            id: 'hgfdhfhhgf',
            name: 'Self-Gumpy-Help'
          },
          {
            id: 'rewqrewer',
            name: 'E-business & E-marketing a Gumpy'
          }
        ]).pipe(delay(1000));



    }

  }


  post(url: string, body: any): Observable<any> {
    return of({}).pipe(delay(1000));
  }

  put(url: string, body: any): Observable<any> {
    return of({}).pipe(delay(1000));
  }

  delete(url: string, params: any): Observable<any> {
    return of({}).pipe(delay(1000));
  }
}
