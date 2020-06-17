import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MediaType } from 'projects/manager/src/app/classes/media';
import { ProductProperties } from 'projects/manager/src/app/classes/product-properties';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { ProductService } from 'projects/manager/src/app/services/product.service';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductPricePoint } from 'projects/manager/src/app/classes/product-price-point';

@Component({
  selector: 'product-properties',
  templateUrl: './product-properties.component.html',
  styleUrls: ['./product-properties.component.scss']
})
export class ProductPropertiesComponent implements OnChanges {
  @Input() productId: string;
  @ViewChild('description', { static: false }) productDescription: ProductDescriptionComponent;
  public productProperties: ProductProperties;

  constructor(public loadingService: LoadingService, public productService: ProductService) { }

  // ---------------------Temp-----------------------------
  public getTempProductProperties(): Observable<ProductProperties> {

    return new Observable<ProductProperties>(subscriber => {
      subscriber.next({
        id: 'TGHUQ7OWNK',
        name: 'Booty Type Training',
        vendor: null
        // {
        //   id: 'LWDT6IQHNX',
        //   name: 'Gumpy\'s',
        // }
        ,
        rating: 0,
        totalReviews: 0,
        hoplink: null,
        description: null
        // '<div>"The Skinny Asian Diet" Program gives you all of the incredible strategies and secret methods Asian women ' +
        //   'are using to get super-lean, super-healthy, and super-happy without expensive fitness gear and without going hungry. And it ' +
        //   'works even if your schedule is too busy for a single spare minute! Whether you\'re a career-oriented gal logging 60 hours a week ' +
        //   'at the office or a stay-at-home mom who would like to finally drop that annoying post-baby fat you\'ve been carrying, the program ' +
        //   'will get you where you want to be fast. The beauty of the program is that it works for every weight loss scenario. It doesn\'t matter ' +
        //   'if you\'re 10 pounds overweight or 100 pounds overweight, you will achieve your goal number quickly! "The Skinny Asian Diet" works for ' +
        //   'men too, so feel free to share the system with your husband or boyfriend if he has his own spare-tire you\'d like to see disappear. The ' +
        //   'best part of all is that it won\'t feel like you\'re on a diet at all. It will feel like you\'re living life to the fullest, eating large ' +
        //   'meals filled with great food that is simple to prepare, with no midnight cravings for sweets or other guilty pleasures!</div>'
          ,
        filters: [
          // {
          //   id: 0,
          //   name: 'Product Type',
          //   options: [
          //     {
          //       id: 0,
          //       name: 'Physical',
          //     },
          //     {
          //       id: 1,
          //       name: 'Digital Download',
          //     },
          //     {
          //       id: 2,
          //       name: 'Email',
          //     },
          //     {
          //       id: 3,
          //       name: 'Online Membership',
          //     }
          //   ]
          // },
          // {
          //   id: 1,
          //   name: 'Billing Type',
          //   options: [
          //     {
          //       id: 4,
          //       name: 'Single Payment',
          //     },
          //     {
          //       id: 5,
          //       name: 'Recurring',
          //     },
          //     {
          //       id: 6,
          //       name: 'Trial',
          //     }
          //   ]
          // }
        ],
        content: [
          {
            id: '0006C245A7',
            title: 'Cooking Tips',
            icon: 'video.png',
            priceIndices: [
              true,
              false,
              false,
              true
            ]
          },
          {
            id: '0004B385G7',
            title: 'Audio Cooking methods',
            icon: 'audio.png',
            priceIndices: [
              false,
              true,
              true,
              true
            ]
          },
          {
            id: '0008R755Y2',
            title: 'Recipes',
            icon: 'pdf.png',
            priceIndices: [
              true,
              true,
              false,
              false
            ]
          }
        ],
        pricePoints: [
          {
            id: 'HGAFDSDFAF',
            textBefore: "Single Payment of",
            wholeNumber: 5,
            decimal: 16,
            textAfter: ""
          },
          {
            id: 'ASFSDAFFSDF',
            textBefore: "",
            wholeNumber: 7,
            decimal: 12,
            textAfter: "per Week"
          },
          {
            id: 'AFHHTRETET',
            textBefore: "3 Easy Payments of",
            wholeNumber: 15,
            decimal: 59,
            textAfter: "per Month"
          },
          {
            id: 'J34ERGFGG',
            textBefore: "",
            wholeNumber: 16,
            decimal: 80,
            textAfter: "a Year"
          }
        ],
        media: [
          // {
          //   id: 'UTWERTFASD',
          //   image: {
          //     url: '8d5741456a824e8981efdfa348d2cb0d.jpg',
          //     title: 'Booty Type Training',
          //     load: null,
          //     save: null
          //   },
          //   type: MediaType.ProductImage
          // },
          // {
          //   id: 'AFSDFFASDFSD',
          //   image: {
          //     url: 'thumbnail1.png',
          //     title: 'Gumpy\'s',
          //     load: null,
          //     save: null
          //   },
          //   type: MediaType.Video,
          //   url: '//player.vimeo.com/video/173192945?title=0&byline=0&portrait=0&color=ffffff'
          // },
          // {
          //   id: 'RGDFVFGHJTGFSA',
          //   image: {
          //     url: 'thumbnail2.png',
          //     title: 'fsdassdaf',
          //     load: null,
          //     save: null
          //   },
          //   type: MediaType.Video,
          //   url: 'https://www.youtube.com/embed/1AI6RS1st2E'
          // },
          // {
          //   id: 'JKYUJSGDFA',
          //   image: {
          //     url: 'thumbnail3.png',
          //     title: 'hgfdhafsda',
          //     load: null,
          //     save: null
          //   },
          //   type: MediaType.Video,
          //   url: '//player.vimeo.com/video/179479722?title=0&byline=0&portrait=0&color=ffffff'
          // },
          // {
          //   id: 'UYTREYRHJGHJSDF',
          //   image: {
          //     url: 'thumbnail4.png',
          //     title: 'FSDFSADFSGFFD',
          //     load: null,
          //     save: null
          //   },
          //   type: MediaType.Video,
          //   url: 'https://www.youtube.com/embed/3ZEu6ZOMhlw'
          // },
          // {
          //   id: 'AFSDFHJJKEG',
          //   image: {
          //     url: 'thumbnail5.png',
          //     title: 'pooiouiouyi',
          //     load: null,
          //     save: null
          //   },
          //   type: MediaType.Video,
          //   url: 'https://player.vimeo.com/video/218732620'
          // },
          // {
          //   id: '345HSDDGFDSFSDD',
          //   image: {
          //     url: 'thumbnail6.png',
          //     title: 'kjfgdfsg',
          //     load: null,
          //     save: null
          //   },
          //   type: MediaType.Video,
          //   url: 'https://player.vimeo.com/video/264188894'
          // },
          // {
          //   id: '4GFDSFSDFSAA',
          //   image: {
          //     url: '0a2b8633118d4719bddfe468521d8a39.png',
          //     title: 'jfgdfsdd',
          //     load: null,
          //     save: null
          //   },
          //   type: MediaType.ProductImage,
          // },
          // {
          //   id: '4DSASFSDFSDFSD',
          //   image: {
          //     url: '2a08e8f8bc7940b087f7e29d2e80a106.png',
          //     title: 'tretewtwefsa',
          //     load: null,
          //     save: null
          //   },
          //   type: MediaType.ProductImage,
          // },
          // {
          //   id: 'UUEYTGGSSDFGG',
          //   image: {
          //     url: '4ea6699537b04c7db407052d58d3bccb.png',
          //     title: 'utyruyttraf',
          //     load: null,
          //     save: null
          //   },
          //   type: MediaType.ProductImage,
          // },
          // {
          //   id: 'UTYDGDFSGJHTG',
          //   image: {
          //     url: '0037b470cdef401a94195bc5c391c404.png',
          //     title: 'bdfgsdfafgqfg',
          //     load: null,
          //     save: null
          //   },
          //   type: MediaType.ProductImage,
          // }
        ],
        keywords: [
          // {
          //   id: 'AFSDFFDSFS',
          //   name: 'Gumpy'
          // },
          // {
          //   id: 'GGFSDFGFSDAF',
          //   name: 'Ice Cream'
          // },
          // {
          //   id: 'WFWFASF',
          //   name: 'Chocolate'
          // },
          // {
          //   id: 'HYTREYREY',
          //   name: 'Vanilla'
          // },
          // {
          //   id: 'UYTUYRUY',
          //   name: 'Strawberry'
          // },
          // {
          //   id: 'YTRYRE',
          //   name: 'Sundae'
          // },
          // {
          //   id: 'AFSDFFDSFS',
          //   name: 'Ice Cream Cone'
          // },
          // {
          //   id: 'AFSDFFDSFS',
          //   name: 'Mint Chocolate Chip'
          // }
        ],
        price: '$5.16 - $16.80'
      });
    }).pipe(delay(1000));
  }

  ngOnChanges() {
    if (this.productId) {
      // Display the loading screen
      this.loadingService.loading = true;

      this.getTempProductProperties().subscribe((productProperties: ProductProperties) => {
        if (productProperties.media.length > 0) {
          this.productService.currentSelectedMedia = productProperties.media[0];
        }


        this.productProperties = productProperties;
        this.productService.product = productProperties;
        this.loadingService.loading = false;

        if (this.productDescription && this.productDescription.description) {
          this.productDescription.description.content.innerHTML = productProperties.description;
          this.productDescription.description.onChange.next();
        }
      });
    }

  }

}
