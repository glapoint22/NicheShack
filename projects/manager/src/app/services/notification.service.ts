import { Injectable } from '@angular/core';
import { Notification, NotificationType } from '../classes/notification';
import { ProductNotification } from '../classes/product-notification';
import { merge, of } from 'rxjs';
import { ReviewComplaintNotification } from '../classes/review-complaint-notification';
import { ProductNotificationDescription } from '../classes/product-notification-description';
import { ProductNotificationImage } from '../classes/product-notification-image';
import { ProductNotificationContent } from '../classes/product-notification-content';
import { ProductNotificationMedia } from '../classes/product-notification-media';
import { ProductMediaType } from '../classes/product-media';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notificationTypeList: Array<string> = [];
  public notificationProductImageList: Array<string> = [];
  public notifications: Array<Notification> = [];


  updateNotificationTypeList() {
    let notificationTypes: Array<string>;


    notificationTypes = this.notifications.map(x => {
      let notificationType: string;

      switch (x.type) {
        case 0: {
          notificationType = 'Message';
          break;
        }
        case 1: {
          notificationType = 'Review Complaint'
          break;
        }
        case 2: {
          notificationType = 'Product Name Doesn\'t Match With Product Description'
          break;
        }
        case 3: {
          notificationType = 'Product Name Doesn\'t Match With Product Image'
          break;
        }
        case 4: {
          notificationType = 'Product Name (Other)'
          break;
        }
        case 5: {
          notificationType = 'Product Price Too High'
          break;
        }
        case 6: {
          notificationType = 'Product Price Not Correct'
          break;
        }
        case 7: {
          notificationType = 'Product Price (Other)'
          break;
        }
        case 8: {
          notificationType = 'Videos & Images are Different From Product'
          break;
        }
        case 9: {
          notificationType = 'Not Enough Videos & Images'
          break;
        }
        case 10: {
          notificationType = 'Videos & Images Not Clear'
          break;
        }
        case 11: {
          notificationType = 'Videos & Images Misleading'
          break;
        }
        case 12: {
          notificationType = 'Videos & Images (Other)'
          break;
        }
        case 13: {
          notificationType = 'Product Description Incorrect'
          break;
        }
        case 14: {
          notificationType = 'Product Description Too Vague'
          break;
        }
        case 15: {
          notificationType = 'Product Description Misleading'
          break;
        }
        case 16: {
          notificationType = 'Product Description (Other)'
          break;
        }
        case 17: {
          notificationType = 'Product Reported As Illegal'
          break;
        }
        case 18: {
          notificationType = 'Product Reported As Having Adult Content'
          break;
        }
        case 19: {
          notificationType = 'Offensive Product (Other)'
          break;
        }
        case 20: {
          notificationType = 'Product Inactive'
          break;
        }
        case 21: {
          notificationType = 'Product site no longer in service'
          break;
        }
        case 22: {
          notificationType = 'Missing Product (Other)'
          break;
        }
      }
      return notificationType;
    })

    this.notificationTypeList = notificationTypes;
  }



  updateNotificationProductImageList() {
    let notificationImages: Array<string>;

    notificationImages = this.notifications.map(x => {
      let notificationProductImage: string;

      if (x.type == NotificationType.Message) {
        notificationProductImage = 'bc9ce0cc860e422aa7c9cafaaf61fc8a.png'

      } else if (x.type == NotificationType.ReviewComplaint) {


        notificationProductImage = '143968bba73642898bb4a6715a1efd3d.png'

      } else {
        notificationProductImage = (x as ProductNotification).productThumbnail
      }

      return notificationProductImage;
    });


    this.notificationProductImageList = notificationImages;
  }










































































  tempData() {



    // ================================= MESSAGE ================================ \\
    let message = of({
      type: NotificationType.Message,
      customerText: [{
        timeStamp: new Date(),
        thumbnail: 'no-account-pic.png',
        text: 'Hi,\nI was wondering if your company was hiring. I would love to be part of your team. Please get back to me as sson as you possibly can. Thank you and have a wonderful day.\nKaitlin'
      }],
      notesText: [{
        timeStamp: new Date(),
        thumbnail: 'no-account-pic.png',
        text: 'Hi Kaitlin,\nSorry, but we are not hiring at this time, but please reach out to us next year and maybe we will be then. Thank you for your interest in Niche Shack.\nBron'
      }]
    } as Notification)



    // ================================= REVIEW COMPLAINT ================================ \\
    let reviewComplaint = of({
      type: NotificationType.ReviewComplaint,
      productThumbnail: 'b212b69728ee4f3b9473831bb4f7ace9.png',
      productName: 'Bigger Better Butt',
      isChecked: [true, false, true],
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'This product really fucking sucks. I was so fucking pissed off when I used this product, only to find out that it didn’t work. I would advise no one to buy this fucking product from this site or any other product for that matter. Fuck you Niche Shack, fuck you!!!'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Everytime I go to order a product, I never get it in time. Then when I finally do get it, the product is no good',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Why does this fucking site suck? Fuck you Niche Shack!!! I fucking hate this fucking site!'
        }
      ]
    } as ReviewComplaintNotification)


    // ================================= PRODUCT NAME DOES NOT MATCH WITH PRODUCT DESCRIPTION ================================ \\
    let productNameDoesNotMatchWithProductDescription = of({
      type: NotificationType.ProductNameDoesNotMatchWithProductDescription,
      productThumbnail: 'b4fa43f207d7420cbb2c72d0fe9c64ba.jpg',
      productName: 'How to seduce out of your league',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product name does not match with the product description 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product name does not match with the product description 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product name does not match with the product description 3'
        }
      ],

      productDescription: 'Nobody makes ice cream better than the Gumpy\'s. If you want to learn how to make ice cream like them, then simply buy their book, \"How to make ice cream like the Gumpy\'s\."',

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product name does not match with the product description 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product name does not match with the product description 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product name does not match with the product description 3'
        }
      ]
    } as ProductNotificationDescription)




    // ================================= PRODUCT NAME DOES NOT MATCH WITH PRODUCT IMAGE ================================ \\
    let productNameDoesNotMatchWithProductImage = of({
      type: NotificationType.ProductNameDoesNotMatchWithProductImage,
      productThumbnail: 'b212b69728ee4f3b9473831bb4f7ace9.png',
      productName: 'How to make ice cream like a Gumpy',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product name does not match with the product image 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product name does not match with the product image 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product name does not match with the product image 3'
        }
      ],

      productImage: 'b212b69728ee4f3b9473831bb4f7ace9.png',

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product name does not match with the product image 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product name does not match with the product image 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product name does not match with the product image 3'
        }
      ]
    } as ProductNotificationImage)


    // ================================= PRODUCT NAME (OTHER) ================================ \\
    let productNameOther = of({
      type: NotificationType.ProductNameOther,
      productThumbnail: '6e1659b63e5643e0a9039064b4a52e12.png',
      productName: '14 Day Perfect Body',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product name other 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product name other 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product name other 3'
        }
      ],

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product name other 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product name other 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product name other 3'
        }
      ]
    } as ProductNotification)


    // ================================= PRODUCT PRICE TOO HIGH ================================ \\
    let ProductPriceTooHigh = of({
      type: NotificationType.ProductPriceTooHigh,
      productThumbnail: '2f119b657c194b32a88b0f0051d525be.png',
      productName: 'Erase Your Stretch Mark',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product price too high 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product price too high 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product price too high 3'
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
          textBefore: "Single Payment of",
          wholeNumber: "5",
          decimal: "16",
          textAfter: ""
        },
        {
          textBefore: "",
          wholeNumber: "7",
          decimal: "12",
          textAfter: "per Week"
        },
        {
          textBefore: "3 Easy Payments of",
          wholeNumber: "15",
          decimal: "59",
          textAfter: "per Month"
        },
        {
          textBefore: "",
          wholeNumber: "16",
          decimal: "80",
          textAfter: "a Year"
        }
      ],

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product price too high 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product price too high 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product price too high 3'
        }
      ]
    } as ProductNotificationContent)


    // ================================= PRODUCT PRICE NOT CORRECT ================================ \\
    let productPriceNotCorrect = of({
      type: NotificationType.ProductPriceNotCorrect,
      productThumbnail: '0018ffd4eca34b6eb4fdc9bcdb0d329e.png',
      productName: 'Attract Hotter Women',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product price not correct 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product price not correct 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product price not correct 3'
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
          textBefore: "Single Payment of",
          wholeNumber: "5",
          decimal: "16",
          textAfter: ""
        },
        {
          textBefore: "",
          wholeNumber: "7",
          decimal: "12",
          textAfter: "per Week"
        },
        {
          textBefore: "3 Easy Payments of",
          wholeNumber: "15",
          decimal: "59",
          textAfter: "per Month"
        },
        {
          textBefore: "",
          wholeNumber: "16",
          decimal: "80",
          textAfter: "a Year"
        }
      ],

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product price not correct 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product price not correct 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product price not correct 3'
        }
      ]
    } as ProductNotificationContent)


    // ================================= PRODUCT PRICE (OTHER) ================================ \\
    let productPriceOther = of({
      type: NotificationType.ProductPriceOther,
      productThumbnail: '9e4ffc59141f44349a0c9d60502e84d1.png',
      productName: 'The Collection Of Confidence',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product price other 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product price other 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product price other 3'
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
          textBefore: "Single Payment of",
          wholeNumber: "5",
          decimal: "16",
          textAfter: ""
        },
        {
          textBefore: "",
          wholeNumber: "7",
          decimal: "12",
          textAfter: "per Week"
        },
        {
          textBefore: "3 Easy Payments of",
          wholeNumber: "15",
          decimal: "59",
          textAfter: "per Month"
        },
        {
          textBefore: "",
          wholeNumber: "16",
          decimal: "80",
          textAfter: "a Year"
        }
      ],

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product price other 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product price other 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product price other 3'
        }
      ]
    } as ProductNotificationContent)


    // ================================= VIDEOS AND IMAGES ARE DIFFERENT FROM PRODUCT ================================ \\
    let videosAndImagesAreDifferentFromProduct = of({
      type: NotificationType.VideosAndImagesAreDifferentFromProduct,
      productThumbnail: '2a08e8f8bc7940b087f7e29d2e80a106.png',
      productName: 'The Lean Belly Secret',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning videos and images are different from product 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning videos and images are different from product 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning videos and images are different from product 3'
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

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning videos and images are different from product 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning videos and images are different from product 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning videos and images are different from product 3'
        }
      ]
    } as ProductNotificationMedia)


    // ================================= NOT ENOUGH VIDEOS AND IMAGES ================================ \\
    let notEnoughVideosAndImages = of({
      type: NotificationType.NotEnoughVideosAndImages,
      productThumbnail: 'bcddc0a43cdc41b0a0b86c6a2a56bacd.png',
      productName: 'Acne No More',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning not enough videos and images 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning not enough videos and images 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning not enough videos and images 3'
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

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning not enough videos and images 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning not enough videos and images 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning not enough videos and images 3'
        }
      ]
    } as ProductNotificationMedia)


    // ================================= VIDEOS AND IMAGES NOT CLEAR ================================ \\
    let videosAndImagesNotClear = of({
      type: NotificationType.VideosAndImagesNotClear,
      productThumbnail: '42066b13a02c4a019c9a4b3fedd40b66.png',
      productName: 'My Bikini Belly',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning videos and images not clear 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning videos and images not clear 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning videos and images not clear 3'
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

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning videos and images not clear 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning videos and images not clear 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning videos and images not clear 3'
        }
      ]
    } as ProductNotificationMedia)


    // ================================= VIDEOS AND IMAGES MISLEADING ================================ \\
    let videosAndImagesMisleading = of({
      type: NotificationType.VideosAndImagesMisleading,
      productThumbnail: '69b301fc34a1431e97851991a73a441c.png',
      productName: 'How To Date An Asian Women',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning videos and images misleading 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning videos and images misleading 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning videos and images misleading 3'
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

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning videos and images misleading 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning videos and images misleading 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning videos and images misleading 3'
        }
      ]
    } as ProductNotificationMedia)


    // ================================= VIDEOS AND IMAGES (OTHER) ================================ \\
    let videosAndImagesOther = of({
      type: NotificationType.VideosAndImagesOther,
      productThumbnail: '724db7642d584175aa3630ab9a6cc5d9.jpg',
      productName: 'Sex Lust and Lies',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning videos and images other 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning videos and images other 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning videos and images other 3'
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

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning videos and images other 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning videos and images other 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning videos and images other 3'
        }
      ]
    } as ProductNotificationMedia)


    // ================================= PRODUCT DESCRIPTION INCORRECT ================================ \\
    let productDescriptionIncorrect = of({
      type: NotificationType.ProductDescriptionIncorrect,
      productThumbnail: 'd7f8ac43d31e49edaefb55eda385b468.png',
      productName: 'How To Grow Hair Long',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product description incorrect 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product description incorrect 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product description incorrect 3'
        }
      ],

      productDescription: 'This is a description that is incorrect, so here you have to redo the description so that it is no longer incorrect.',

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product description incorrect 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product description incorrect 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product description incorrect 3'
        }
      ]
    } as ProductNotificationDescription)


    // ================================= PRODUCT DESCRIPTION TOO VAGUE ================================ \\
    let productDescriptionTooVague = of({
      type: NotificationType.ProductDescriptionTooVague,
      productThumbnail: 'ce662a813987430a9b2b0b17cb4bda72.png',
      productName: 'Fat Shrinking Signal',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product description incorrect 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product description incorrect 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product description incorrect 3'
        }
      ],

      productDescription: 'This is a description that is too vague, so here you have to redo the description so that it is no longer too vague.',

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product description incorrect 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product description incorrect 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product description incorrect 3'
        }
      ]
    } as ProductNotificationDescription)


    // ================================= PRODUCT DESCRIPTION MISLEADING ================================ \\
    let productDescriptionMisleading = of({
      type: NotificationType.ProductDescriptionMisleading,
      productThumbnail: 'c28764b0fd6f4cad80be85f047422fe1.png',
      productName: 'Gluteus To The Maximus',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product description misleading 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product description misleading 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product description misleading 3'
        }
      ],

      productDescription: 'This is a description that is misleading, so here you have to redo the description so that it is no longer misleading.',

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product description misleading 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product description misleading 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product description misleading 3'
        }
      ]
    } as ProductNotificationDescription)


    // ================================= PRODUCT DESCRIPTION (OTHER) ================================ \\
    let productDescriptionOther = of({
      type: NotificationType.ProductDescriptionOther,
      productThumbnail: '6c048ea442b646b59970f907a4d3ce61.jpg',
      productName: 'ABS',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product description other 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product description other 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product description other 3'
        }
      ],

      productDescription: 'This is a description that is other, so here you have to redo the description so that it is no longer other.',

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product description other 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product description other 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product description other 3'
        }
      ]
    } as ProductNotificationDescription)


    // ================================= PRODUCT REPORTED AS ILLEGAL ================================ \\
    let productReportedAsIllegal = of({
      type: NotificationType.ProductReportedAsIllegal,
      productThumbnail: '899c7b6deb544dd28a7ec3055c5196a1.jpg',
      productName: 'The 21 Day Flat Belly Fix System',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product reported as illegal 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product reported as illegal 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product reported as illegal 3'
        }
      ],

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product reported as illegal 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product reported as illegal 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product reported as illegal 3'
        }
      ]
    } as ProductNotification)


    // ================================= PRODUCT REPORTED AS HAVING ADULT CONTENT ================================ \\
    let ProductReportedAsHavingAdultContent = of({
      type: NotificationType.ProductReportedAsHavingAdultContent,
      productThumbnail: '17a40d16e5d8454da45ed3d5683e0ab6.png',
      productName: '7 Day Super Slim',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product reported as having adult content 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product reported as having adult content 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product reported as having adult content 3'
        }
      ],

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product reported as having adult content 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product reported as having adult content 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product reported as having adult content 3'
        }
      ]
    } as ProductNotification)


    // ================================= OFFENSIVE PRODUCT OTHER ================================ \\
    let offensiveProductOther = of({
      type: NotificationType.OffensiveProductOther,
      productThumbnail: 'f5ca6bd2ac0549d3b7f0609c534eb182.png',
      productName: 'Yoga Burn Booty Challenge',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning offensive product other content 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning offensive product other content 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning offensive product other content 3'
        }
      ],

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning offensive product other content 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning offensive product other content 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning offensive product other content 3'
        }
      ]
    } as ProductNotification)


    // ================================= PRODUCT INACTIVE ================================ \\
    let productInactive = of({
      type: NotificationType.ProductInactive,
      productThumbnail: '429928f0e88045318dbae00b5a90df12.png',
      productName: 'The 8 Week Booty',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product inactive 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product inactive 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product inactive 3'
        }
      ],

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product inactive 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product inactive 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product inactive 3'
        }
      ]
    } as ProductNotification)


    // ================================= PRODUCT SITE NO LONGER IN SERVICE ================================ \\
    let productSiteNoLongerInService = of({
      type: NotificationType.ProductSiteNoLongerInService,
      productThumbnail: '1d21c8846a464c989eb6914c224a3324.png',
      productName: 'The Thyroid Factor',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product site no longer in service 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product site no longer in service 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning product site no longer in service 3'
        }
      ],

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product site no longer in service 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product site no longer in service 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning product site no longer in service 3'
        }
      ]
    } as ProductNotification)


    // ================================= MISSING PRODUCT OTHER ================================ \\
    let missingProductOther = of({
      type: NotificationType.MissingProductOther,
      productThumbnail: '1b4f02a0b8ad491e950a94eade1df05f.png',
      productName: 'What Husbands Can\'t Resist',
      customerText: [
        {
          timeStamp: new Date(2018, 11, 24, 10, 33, 30),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning missing product other 1'
        },

        {
          timeStamp: new Date(2019, 7, 5, 4, 19, 6),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning missing product other 2',
        },

        {
          timeStamp: new Date(2020, 5, 22, 5, 22, 32),
          thumbnail: 'no-account-pic.png',
          text: 'Here are some user comments concerning missing product other 3'
        }
      ],

      notesText: [
        {
          timeStamp: new Date(2018, 10, 24, 7, 14, 46),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning missing product other 1'
        },

        {
          timeStamp: new Date(2019, 6, 15, 1, 36, 28),
          thumbnail: 'gabe-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning missing product other 2',
        },

        {
          timeStamp: new Date(2020, 3, 10, 3, 4, 17),
          thumbnail: 'bron-account-pic.png',
          text: 'Here are some notes that describe how I took action concerning missing product other 3'
        }
      ]
    } as ProductNotification)




    return merge(message,
      reviewComplaint,
      productNameDoesNotMatchWithProductDescription,
      productNameDoesNotMatchWithProductImage,
      productNameOther,
      ProductPriceTooHigh,
      productPriceNotCorrect,
      productPriceOther,
      videosAndImagesAreDifferentFromProduct,
      notEnoughVideosAndImages,
      videosAndImagesNotClear,
      videosAndImagesMisleading,
      videosAndImagesOther,
      productDescriptionIncorrect,
      productDescriptionTooVague,
      productDescriptionMisleading,
      productDescriptionOther,
      productReportedAsIllegal,
      ProductReportedAsHavingAdultContent,
      offensiveProductOther,
      productInactive,
      productSiteNoLongerInService,
      missingProductOther
      
      )
  }









}