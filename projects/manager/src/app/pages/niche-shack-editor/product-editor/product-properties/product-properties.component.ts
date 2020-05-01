import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'projects/manager/src/app/classes/product';
import { delay } from 'rxjs/operators';
import { ProductMediaType } from 'projects/manager/src/app/classes/product-media';

@Component({
  selector: 'product-properties',
  templateUrl: './product-properties.component.html',
  styleUrls: ['./product-properties.component.scss']
})
export class ProductPropertiesComponent implements OnInit {
  public product$: Observable<Product>;

  constructor() { }

  // ---------------------Temp-----------------------------
  public getTempProduct(): Observable<Product> {

    return new Observable<Product>(subscriber => {
      subscriber.next({
        id: '1E61093062',
        image: '8307dc287c6147bcaddbfc921411eece.png',
        rating: 2.8,
        totalReviews: 60,
        hoplink: 'https://3243080do6mo2l19eepynzevdg.hop.clickbank.net/',
        description: '"The Skinny Asian Diet" Program gives you all of the incredible strategies and secret methods Asian women ' +
          'are using to get super-lean, super-healthy, and super-happy without expensive fitness gear and without going hungry. And it ' +
          'works even if your schedule is too busy for a single spare minute! Whether you\'re a career-oriented gal logging 60 hours a week ' +
          'at the office or a stay-at-home mom who would like to finally drop that annoying post-baby fat you\'ve been carrying, the program ' +
          'will get you where you want to be fast. The beauty of the program is that it works for every weight loss scenario. It doesn\'t matter ' +
          'if you\'re 10 pounds overweight or 100 pounds overweight, you will achieve your goal number quickly! "The Skinny Asian Diet" works for ' +
          'men too, so feel free to share the system with your husband or boyfriend if he has his own spare-tire you\'d like to see disappear. The ' +
          'best part of all is that it won\'t feel like you\'re on a diet at all. It will feel like you\'re living life to the fullest, eating large ' +
          'meals filled with great food that is simple to prepare, with no midnight cravings for sweets or other guilty pleasures!',
        filters: [
          {
            id: 0,
            name: 'Product Type',
            options: [
              {
                id: 0,
                name: 'Physical',
              },
              {
                id: 1,
                name: 'Digital Download',
              },
              {
                id: 2,
                name: 'Email',
              },
              {
                id: 3,
                name: 'Online Membership',
              }
            ]
          },
          {
            id: 1,
            name: 'Billing Type',
            options: [
              {
                id: 4,
                name: 'Single Payment',
              },
              {
                id: 5,
                name: 'Recurring',
              },
              {
                id: 6,
                name: 'Trial',
              }
            ]
          }
        ],
        content: [
          {
            id: '0006C245A7',
            title: 'Cooking Tips',
            icon: 'video.png',
            priceIndices: [
              0,
              3
            ]
          },
          {
            id: '0004B385G7',
            title: 'Audio Cooking methods',
            icon: 'audio.png',
            priceIndices: [
              1,
              2,
              3
            ]
          },
          {
            id: '0008R755Y2',
            title: 'Recipes',
            icon: 'pdf.png',
            priceIndices: [
              0,
              1
            ]
          }
        ],
        pricePoints: [
          {
            price: 5.16,
            description: 'Single Payment of {0:C2}'
          },
          {
            price: 7.12,
            description: '{0:C2} per Week'
          },
          {
            price: 15.59,
            description: '3 Easy Payments of {0:C2} per Month'
          },
          {
            price: 16.8,
            description: '{0:C2} a Year'
          }
        ],
        media: [
          {
            thumbnail: 'thumbnail1.png',
            type: ProductMediaType.Video,
            url: '//player.vimeo.com/video/173192945?title=0&byline=0&portrait=0&color=ffffff'
          },
          {
            thumbnail: 'thumbnail2.png',
            type: ProductMediaType.Video,
            url: 'https://www.youtube.com/embed/1AI6RS1st2E'
          },
          {
            thumbnail: 'thumbnail3.png',
            type: ProductMediaType.Video,
            url: '//player.vimeo.com/video/179479722?title=0&byline=0&portrait=0&color=ffffff'
          },
          {
            thumbnail: 'thumbnail4.png',
            type: ProductMediaType.Video,
            url: 'https://www.youtube.com/embed/3ZEu6ZOMhlw'
          },
          {
            thumbnail: 'thumbnail5.png',
            type: ProductMediaType.Video,
            url: 'https://player.vimeo.com/video/218732620'
          },
          {
            thumbnail: 'thumbnail6.png',
            type: ProductMediaType.Video,
            url: 'https://player.vimeo.com/video/264188894'
          },
          {
            thumbnail: '0a2b8633118d4719bddfe468521d8a39.png',
            type: ProductMediaType.Image,
          },
          {
            thumbnail: '2a08e8f8bc7940b087f7e29d2e80a106.png',
            type: ProductMediaType.Image,
          },
          {
            thumbnail: '4ea6699537b04c7db407052d58d3bccb.png',
            type: ProductMediaType.Image,
          },
          {
            thumbnail: '0037b470cdef401a94195bc5c391c404.png',
            type: ProductMediaType.Image,
          }
        ],
        keywords: [
          'Gumpy',
          'Ice Cream',
          'Chocolate',
          'Vanilla',
          'Strawberry',
          'Sundae',
          'Ice Cream Cone',
          'Mint Chocolate Chip'
        ]
      });
    }).pipe(delay(1000));
  }

  ngOnInit() {
    this.product$ = this.getTempProduct();
  }

}
