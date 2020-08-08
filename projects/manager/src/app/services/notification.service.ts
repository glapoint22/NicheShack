import { Injectable } from '@angular/core';
import { Notification } from '../classes/notification';
import { GeneralNotification } from '../classes/general-notification';
import { ReviewComplaintNotification } from '../classes/review-complaint-notification';
import { ProductDescriptionNotification } from '../classes/product-description-notification';
import { ProductImageNotification } from '../classes/product-image-notification';
import { ProductContentNotification } from '../classes/product-content-notification';
import { ProductMediaNotification } from '../classes/product-media-notification';
import { NotificationTab } from '../classes/notification-tab';
import { NotificationListItem } from '../classes/notification-list-item';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public selectedNotificationsTab: NotificationTab;
  public newNotifications: Array<NotificationListItem> = [];
  public pendingNotifications: Array<NotificationListItem> = [];
  public archiveNotifications: Array<NotificationListItem> = [];
  public messageNotification: Notification;
  public generalNotification: GeneralNotification;
  public reviewComplaintNotification: ReviewComplaintNotification
  public productDescriptionNotification: ProductDescriptionNotification;
  public productImageNotification: ProductImageNotification;
  public productMediaNotification: ProductMediaNotification
  public productContentNotification: ProductContentNotification;
  public notificationIds: Array<number>;


  


  // ---------------------------------------------------------------------------( TEMP DATA )--------------------------------------------------------------------------- \\
  // getNotifications(): Observable<Notification> {

  //   // ================================= MESSAGE ================================ \\
  //   let message = of({
  //     id: 'oiweoiuwer',
  //     name: NotificationType.Message,
  //     selected: null,
  //     selectType: null,
  //     listIcon: 'message.png',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Hi, I was wondering if your company was hiring. I would love to be part of your team. Please get back to me as sson as you possibly can. Thank you and have a wonderful day.\nKaitlin'
  //       },
  //       {
  //         timeStamp: '9/21/2019  11:11 AM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Blah blah blah'
  //       }
  //     ],
  //     notesText: [
  //       {
  //         timeStamp: '3/6/2017  8:45 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Hi Kaitlin,\nSorry, but we are not hiring at this time, but please reach out to us next year and maybe we will be then. Thank you for your interest in Niche Shack.\nBron'
  //       },
  //       {
  //         timeStamp: '4/1/2017  9:13 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'jkdfjklsd ioerioure jhzxjksd opopityiopty uweiuwe jhdsjsdf wyuqwwq'
  //       }
  //     ]
  //   } as Notification).pipe(delay(0));



  //   // ================================= REVIEW COMPLAINT ================================ \\
  //   let reviewComplaint = of({
  //     id: 'iouuioiuouio',
  //     name: NotificationType.ReviewComplaint,
  //     selected: null,
  //     selectType: null,
  //     listIcon: 'review-complaint.png',
  //     productId: 'GSGDFFFASDS',
  //     productThumbnail: 'b212b69728ee4f3b9473831bb4f7ace9.png',
  //     productName: 'Bigger Better Butt',
  //     isChecked: [true, false, true],
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'This product really fucking sucks. I was so fucking pissed off when I used this product, only to find out that it didn’t work. I would advise no one to buy this fucking product from this site or any other product for that matter. Fuck you Niche Shack, fuck you!!!'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Everytime I go to order a product, I never get it in time. Then when I finally do get it, the product is no good',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Why does this fucking site suck? Fuck you Niche Shack!!! I fucking hate this fucking site!'
  //       }
  //     ],

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product name does not match with the product description 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product name does not match with the product description 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product name does not match with the product description 3'
  //       }
  //     ]
  //   } as ReviewComplaintNotification).pipe(delay(0));


  //   // ================================= PRODUCT NAME DOES NOT MATCH WITH PRODUCT DESCRIPTION ================================ \\
  //   let productNameDoesNotMatchWithProductDescription = of({
  //     id: 'qweqweqwe',
  //     name: NotificationType.ProductNameDoesNotMatchWithProductDescription,
  //     selected: null,
  //     selectType: null,
  //     listIcon: 'b4fa43f207d7420cbb2c72d0fe9c64ba.jpg',
  //     productId: 'YTRYERTYW',
  //     productThumbnail: 'b4fa43f207d7420cbb2c72d0fe9c64ba.jpg',
  //     productName: 'How to seduce out of your league',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product name does not match with the product description 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product name does not match with the product description 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product name does not match with the product description 3'
  //       }
  //     ],

  //     productDescription: 'Nobody makes ice cream better than the Gumpy\'s. If you want to learn how to make ice cream like them, then simply buy their book, \"How to make ice cream like the Gumpy\'s\."',

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product name does not match with the product description 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product name does not match with the product description 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product name does not match with the product description 3'
  //       }
  //     ]
  //   } as ProductDescriptionNotification).pipe(delay(0));




  //   // ================================= PRODUCT NAME DOES NOT MATCH WITH PRODUCT IMAGE ================================ \\
  //   let productNameDoesNotMatchWithProductImage = of({
  //     id: 'zzxcvcxbxcvbn',
  //     name: NotificationType.ProductNameDoesNotMatchWithProductImage,
  //     selected: null,
  //     selectType: null,
  //     listIcon: 'b212b69728ee4f3b9473831bb4f7ace9.png',
  //     productId: 'RWERHFHFSDGSFDSF',
  //     productThumbnail: 'b212b69728ee4f3b9473831bb4f7ace9.png',
  //     productName: 'How to make ice cream like a Gumpy',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product name does not match with the product image 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product name does not match with the product image 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product name does not match with the product image 3'
  //       }
  //     ],

  //     image: {
  //       url: 'b212b69728ee4f3b9473831bb4f7ace9.png',
  //       name: 'Bigger Better Butt'
  //     },

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product name does not match with the product image 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product name does not match with the product image 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product name does not match with the product image 3'
  //       }
  //     ]
  //   }).pipe(delay(0));


  //   // ================================= PRODUCT NAME (OTHER) ================================ \\
  //   let productNameOther = of({
  //     id: 'mnbcbvcmnbccv',
  //     name: NotificationType.ProductNameOther,
  //     selected: null,
  //     selectType: null,
  //     listIcon: '6e1659b63e5643e0a9039064b4a52e12.png',
  //     productId: 'UYTUWTRSFD',
  //     productThumbnail: '6e1659b63e5643e0a9039064b4a52e12.png',
  //     productName: '14 Day Perfect Body',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product name other 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product name other 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product name other 3'
  //       }
  //     ],

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product name other 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product name other 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product name other 3'
  //       }
  //     ]
  //   } as GeneralNotification).pipe(delay(0));


  //   // ================================= PRODUCT PRICE TOO HIGH ================================ \\
  //   let ProductPriceTooHigh = of({
  //     id: 'asdffdsagdasdfg',
  //     name: NotificationType.ProductPriceTooHigh,
  //     selected: null,
  //     selectType: null,
  //     listIcon: '2f119b657c194b32a88b0f0051d525be.png',
  //     productId: 'PASDGKIUYT',
  //     productThumbnail: '2f119b657c194b32a88b0f0051d525be.png',
  //     productName: 'Erase Your Stretch Mark',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product price too high 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product price too high 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product price too high 3'
  //       }
  //     ],

  //     content: [
  //       {
  //         id: '0006C245A7',
  //         title: 'Cooking Tips',
  //         icon: {
  //           id: 'FSDFASFFSDFA',
  //           name: 'Video',
  //           url: 'video.png',
  //         },
  //         priceIndices: [
  //           true,
  //           false,
  //           false,
  //           true
  //         ]
  //       },
  //       {
  //         id: '0004B385G7',
  //         title: 'Audio Cooking methods',
  //         icon: {
  //           id: 'JHFJSDRFGFFD',
  //           name: 'Audio',
  //           url: 'audio.png',
  //         },
  //         priceIndices: [
  //           false,
  //           true,
  //           true,
  //           true
  //         ]
  //       },
  //       {
  //         id: '0008R755Y2',
  //         title: 'Recipes',
  //         icon: {
  //           id: 'QRDFDDASFASDF',
  //           name: 'PDF',
  //           url: 'pdf.png',
  //         },
  //         priceIndices: [
  //           true,
  //           true,
  //           false,
  //           false
  //         ]
  //       }
  //     ],

  //     pricePoints: [
  //       {
  //         id: 'HGAFDSDFAF',
  //         textBefore: "Single Payment of",
  //         wholeNumber: 5,
  //         decimal: 16,
  //         textAfter: ""
  //       },
  //       {
  //         id: 'ASFSDAFFSDF',
  //         textBefore: "",
  //         wholeNumber: 7,
  //         decimal: 12,
  //         textAfter: "per Week"
  //       },
  //       {
  //         id: 'AFHHTRETET',
  //         textBefore: "3 Easy Payments of",
  //         wholeNumber: 15,
  //         decimal: 59,
  //         textAfter: "per Month"
  //       },
  //       {
  //         id: 'J34ERGFGG',
  //         textBefore: "",
  //         wholeNumber: 16,
  //         decimal: 80,
  //         textAfter: "a Year"
  //       }
  //     ],

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product price too high 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product price too high 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product price too high 3'
  //       }
  //     ]
  //   }).pipe(delay(0));


  //   // ================================= PRODUCT PRICE NOT CORRECT ================================ \\
  //   let productPriceNotCorrect = of({
  //     id: 'sdfgiuylwerkj',
  //     name: NotificationType.ProductPriceNotCorrect,
  //     selected: null,
  //     selectType: null,
  //     listIcon: '0018ffd4eca34b6eb4fdc9bcdb0d329e.png',
  //     productId: 'YGFDSGFHA',
  //     productThumbnail: '0018ffd4eca34b6eb4fdc9bcdb0d329e.png',
  //     productName: 'Attract Hotter Women',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product price not correct 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product price not correct 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product price not correct 3'
  //       }
  //     ],

  //     content: [
  //       {
  //         id: '0006C245A7',
  //         title: 'Cooking Tips',
  //         icon: {
  //           id: 'FSDFASFFSDFA',
  //           name: 'Video',
  //           url: 'video.png',
  //         },
  //         priceIndices: [
  //           true,
  //           false,
  //           false,
  //           true
  //         ]
  //       },
  //       {
  //         id: '0004B385G7',
  //         title: 'Audio Cooking methods',
  //         icon: {
  //           id: 'JHFJSDRFGFFD',
  //           name: 'Audio',
  //           url: 'audio.png',
  //         },
  //         priceIndices: [
  //           false,
  //           true,
  //           true,
  //           true
  //         ]
  //       },
  //       {
  //         id: '0008R755Y2',
  //         title: 'Recipes',
  //         icon: {
  //           id: 'QRDFDDASFASDF',
  //           name: 'PDF',
  //           url: 'pdf.png',
  //         },
  //         priceIndices: [
  //           true,
  //           true,
  //           false,
  //           false
  //         ]
  //       }
  //     ],

  //     pricePoints: [
  //       {
  //         id: 'HGAFDSDFAF',
  //         textBefore: "Single Payment of",
  //         wholeNumber: 5,
  //         decimal: 16,
  //         textAfter: ""
  //       },
  //       {
  //         id: 'ASFSDAFFSDF',
  //         textBefore: "",
  //         wholeNumber: 7,
  //         decimal: 12,
  //         textAfter: "per Week"
  //       },
  //       {
  //         id: 'AFHHTRETET',
  //         textBefore: "3 Easy Payments of",
  //         wholeNumber: 15,
  //         decimal: 59,
  //         textAfter: "per Month"
  //       },
  //       {
  //         id: 'J34ERGFGG',
  //         textBefore: "",
  //         wholeNumber: 16,
  //         decimal: 80,
  //         textAfter: "a Year"
  //       }
  //     ],

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product price not correct 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product price not correct 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product price not correct 3'
  //       }
  //     ]
  //   }).pipe(delay(0));


  //   // ================================= PRODUCT PRICE (OTHER) ================================ \\
  //   let productPriceOther = of({
  //     id: 'dfgoiuqexz',
  //     name: NotificationType.ProductPriceOther,
  //     selected: null,
  //     selectType: null,
  //     listIcon: '9e4ffc59141f44349a0c9d60502e84d1.png',
  //     productId: 'NHJJGHJGDDH',
  //     productThumbnail: '9e4ffc59141f44349a0c9d60502e84d1.png',
  //     productName: 'The Collection Of Confidence',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product price other 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product price other 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product price other 3'
  //       }
  //     ],

  //     content: [
  //       {
  //         id: '0006C245A7',
  //         name: 'Cooking Tips',
  //         icon: {
  //           id: 'FSDFASFFSDFA',
  //           name: 'Video',
  //           url: 'video.png',
  //         },
  //         priceIndices: [
  //           true,
  //           false,
  //           false,
  //           true
  //         ]
  //       },
  //       {
  //         id: '0004B385G7',
  //         name: 'Audio Cooking methods',
  //         icon: {
  //           id: 'JHFJSDRFGFFD',
  //           name: 'Audio',
  //           url: 'audio.png',
  //         },
  //         priceIndices: [
  //           false,
  //           true,
  //           true,
  //           true
  //         ]
  //       },
  //       {
  //         id: '0008R755Y2',
  //         name: 'Recipes',
  //         icon: {
  //           id: 'QRDFDDASFASDF',
  //           name: 'PDF',
  //           url: 'pdf.png',
  //         },
  //         priceIndices: [
  //           true,
  //           true,
  //           false,
  //           false
  //         ]
  //       }
  //     ],

  //     pricePoints: [
  //       {
  //         id: 'HGAFDSDFAF',
  //         textBefore: "Single Payment of",
  //         wholeNumber: 5,
  //         decimal: 16,
  //         textAfter: ""
  //       },
  //       {
  //         id: 'ASFSDAFFSDF',
  //         textBefore: "",
  //         wholeNumber: 7,
  //         decimal: 12,
  //         textAfter: "per Week"
  //       },
  //       {
  //         id: 'AFHHTRETET',
  //         textBefore: "3 Easy Payments of",
  //         wholeNumber: 15,
  //         decimal: 59,
  //         textAfter: "per Month"
  //       },
  //       {
  //         id: 'J34ERGFGG',
  //         textBefore: "",
  //         wholeNumber: 16,
  //         decimal: 80,
  //         textAfter: "a Year"
  //       }
  //     ],

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product price other 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product price other 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product price other 3'
  //       }
  //     ]
  //   } as ProductContentNotification).pipe(delay(0));


  //   // ================================= VIDEOS AND IMAGES ARE DIFFERENT FROM PRODUCT ================================ \\
  //   let videosAndImagesAreDifferentFromProduct = of({
  //     id: 'uiolkjuiolkj',
  //     name: NotificationType.VideosAndImagesAreDifferentFromProduct,
  //     selected: null,
  //     selectType: null,
  //     listIcon: '2a08e8f8bc7940b087f7e29d2e80a106.png',
  //     productId: 'QEQWRHTHA',
  //     productThumbnail: '2a08e8f8bc7940b087f7e29d2e80a106.png',
  //     productName: 'The Lean Belly Secret',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning videos and images are different from product 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning videos and images are different from product 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning videos and images are different from product 3'
  //       }
  //     ],

  //     media: [
  //       {
  //         id: 'UTWERTFASD',
  //         name: 'Booty Type Training',
  //         url: '8d5741456a824e8981efdfa348d2cb0d.jpg'
  //       },
  //       {
  //         id: 'AFSDFFASDFSD',
  //         name: 'Gumpy\'s',
  //         thumbnail: 'thumbnail1.png',
  //         url: '//player.vimeo.com/video/173192945?title=0&byline=0&portrait=0&color=ffffff'
  //       },
  //       {
  //         id: 'RGDFVFGHJTGFSA',
  //         name: 'Ice Cream',
  //         thumbnail: 'thumbnail2.png',
  //         url: 'https://www.youtube.com/embed/1AI6RS1st2E'
  //       },
  //       {
  //         id: 'JKYUJSGDFA',
  //         name: 'Chocolate',
  //         thumbnail: 'thumbnail3.png',
  //         url: '//player.vimeo.com/video/179479722?title=0&byline=0&portrait=0&color=ffffff'
  //       },
  //       {
  //         id: 'UYTREYRHJGHJSDF',
  //         name: 'Vanilla',
  //         thumbnail: 'thumbnail4.png',
  //         url: 'https://www.youtube.com/embed/3ZEu6ZOMhlw'
  //       },
  //       {
  //         id: 'AFSDFHJJKEG',
  //         name: 'Strawberry',
  //         thumbnail: 'thumbnail5.png',
  //         url: 'https://player.vimeo.com/video/218732620'
  //       },
  //       {
  //         id: '345HSDDGFDSFSDD',
  //         name: 'Brownie',
  //         thumbnail: 'thumbnail6.png',
  //         url: 'https://player.vimeo.com/video/264188894'
  //       },
  //       {
  //         id: '4GFDSFSDFSAA',
  //         name: 'Cookie',
  //         url: '0a2b8633118d4719bddfe468521d8a39.png'
  //       },
  //       {
  //         id: '4DSASFSDFSDFSD',
  //         name: 'Milkshake',
  //         url: '2a08e8f8bc7940b087f7e29d2e80a106.png'
  //       },
  //       {
  //         id: 'UUEYTGGSSDFGG',
  //         name: 'Ice cream cone',
  //         url: '4ea6699537b04c7db407052d58d3bccb.png'
  //       },
  //       {
  //         id: 'UTYDGDFSGJHTG',
  //         name: 'Sprinkles',
  //         url: '0037b470cdef401a94195bc5c391c404.png'
  //       }
  //     ],

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning videos and images are different from product 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning videos and images are different from product 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning videos and images are different from product 3'
  //       }
  //     ]
  //   } as ProductMediaNotification).pipe(delay(0));


  //   // ================================= NOT ENOUGH VIDEOS AND IMAGES ================================ \\
  //   let notEnoughVideosAndImages = of({
  //     id: 'hjrtyhryhj',
  //     name: NotificationType.NotEnoughVideosAndImages,
  //     selected: null,
  //     selectType: null,
  //     listIcon: 'bcddc0a43cdc41b0a0b86c6a2a56bacd.png',
  //     productId: 'CDASCCSFSDF',
  //     productThumbnail: 'bcddc0a43cdc41b0a0b86c6a2a56bacd.png',
  //     productName: 'Acne No More',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning not enough videos and images 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning not enough videos and images 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning not enough videos and images 3'
  //       }
  //     ],

  //     media: [
  //       {
  //         id: 'UTWERTFASD',
  //         name: 'Booty Type Training',
  //         url: '8d5741456a824e8981efdfa348d2cb0d.jpg'
  //       },
  //       {
  //         id: 'AFSDFFASDFSD',
  //         name: 'Gumpy\'s',
  //         thumbnail: 'thumbnail1.png',
  //         url: '//player.vimeo.com/video/173192945?title=0&byline=0&portrait=0&color=ffffff'
  //       },
  //       {
  //         id: 'RGDFVFGHJTGFSA',
  //         name: 'Ice Cream',
  //         thumbnail: 'thumbnail2.png',
  //         url: 'https://www.youtube.com/embed/1AI6RS1st2E'
  //       },
  //       {
  //         id: 'JKYUJSGDFA',
  //         name: 'Chocolate',
  //         thumbnail: 'thumbnail3.png',
  //         url: '//player.vimeo.com/video/179479722?title=0&byline=0&portrait=0&color=ffffff'
  //       },
  //       {
  //         id: 'UYTREYRHJGHJSDF',
  //         name: 'Vanilla',
  //         thumbnail: 'thumbnail4.png',
  //         url: 'https://www.youtube.com/embed/3ZEu6ZOMhlw'
  //       },
  //       {
  //         id: 'AFSDFHJJKEG',
  //         name: 'Strawberry',
  //         thumbnail: 'thumbnail5.png',
  //         url: 'https://player.vimeo.com/video/218732620'
  //       },
  //       {
  //         id: '345HSDDGFDSFSDD',
  //         name: 'Brownie',
  //         thumbnail: 'thumbnail6.png',
  //         url: 'https://player.vimeo.com/video/264188894'
  //       },
  //       {
  //         id: '4GFDSFSDFSAA',
  //         name: 'Cookie',
  //         url: '0a2b8633118d4719bddfe468521d8a39.png'
  //       },
  //       {
  //         id: '4DSASFSDFSDFSD',
  //         name: 'Milkshake',
  //         url: '2a08e8f8bc7940b087f7e29d2e80a106.png'
  //       },
  //       {
  //         id: 'UUEYTGGSSDFGG',
  //         name: 'Ice cream cone',
  //         url: '4ea6699537b04c7db407052d58d3bccb.png'
  //       },
  //       {
  //         id: 'UTYDGDFSGJHTG',
  //         name: 'Sprinkles',
  //         url: '0037b470cdef401a94195bc5c391c404.png'
  //       }
  //     ],

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning not enough videos and images 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning not enough videos and images 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning not enough videos and images 3'
  //       }
  //     ]
  //   } as ProductMediaNotification).pipe(delay(0));


  //   // ================================= VIDEOS AND IMAGES NOT CLEAR ================================ \\
  //   let videosAndImagesNotClear = of({
  //     id: 'cvbrwdsfio',
  //     name: NotificationType.VideosAndImagesNotClear,
  //     selected: null,
  //     selectType: null,
  //     listIcon: '42066b13a02c4a019c9a4b3fedd40b66.png',
  //     productId: 'BSFFDFDBDDDSGDGD',
  //     productThumbnail: '42066b13a02c4a019c9a4b3fedd40b66.png',
  //     productName: 'My Bikini Belly',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning videos and images not clear 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning videos and images not clear 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning videos and images not clear 3'
  //       }
  //     ],

  //     media: [
  //       {
  //         id: 'UTWERTFASD',
  //         name: 'Booty Type Training',
  //         url: '8d5741456a824e8981efdfa348d2cb0d.jpg'
  //       },
  //       {
  //         id: 'AFSDFFASDFSD',
  //         name: 'Gumpy\'s',
  //         thumbnail: 'thumbnail1.png',
  //         url: '//player.vimeo.com/video/173192945?title=0&byline=0&portrait=0&color=ffffff'
  //       },
  //       {
  //         id: 'RGDFVFGHJTGFSA',
  //         name: 'Ice Cream',
  //         thumbnail: 'thumbnail2.png',
  //         url: 'https://www.youtube.com/embed/1AI6RS1st2E'
  //       },
  //       {
  //         id: 'JKYUJSGDFA',
  //         name: 'Chocolate',
  //         thumbnail: 'thumbnail3.png',
  //         url: '//player.vimeo.com/video/179479722?title=0&byline=0&portrait=0&color=ffffff'
  //       },
  //       {
  //         id: 'UYTREYRHJGHJSDF',
  //         name: 'Vanilla',
  //         thumbnail: 'thumbnail4.png',
  //         url: 'https://www.youtube.com/embed/3ZEu6ZOMhlw'
  //       },
  //       {
  //         id: 'AFSDFHJJKEG',
  //         name: 'Strawberry',
  //         thumbnail: 'thumbnail5.png',
  //         url: 'https://player.vimeo.com/video/218732620'
  //       },
  //       {
  //         id: '345HSDDGFDSFSDD',
  //         name: 'Brownie',
  //         thumbnail: 'thumbnail6.png',
  //         url: 'https://player.vimeo.com/video/264188894'
  //       },
  //       {
  //         id: '4GFDSFSDFSAA',
  //         name: 'Cookie',
  //         url: '0a2b8633118d4719bddfe468521d8a39.png'
  //       },
  //       {
  //         id: '4DSASFSDFSDFSD',
  //         name: 'Milkshake',
  //         url: '2a08e8f8bc7940b087f7e29d2e80a106.png'
  //       },
  //       {
  //         id: 'UUEYTGGSSDFGG',
  //         name: 'Ice cream cone',
  //         url: '4ea6699537b04c7db407052d58d3bccb.png'
  //       },
  //       {
  //         id: 'UTYDGDFSGJHTG',
  //         name: 'Sprinkles',
  //         url: '0037b470cdef401a94195bc5c391c404.png'
  //       }
  //     ],

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning videos and images not clear 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning videos and images not clear 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning videos and images not clear 3'
  //       }
  //     ]
  //   } as ProductMediaNotification).pipe(delay(0));


  //   // ================================= VIDEOS AND IMAGES MISLEADING ================================ \\
  //   let videosAndImagesMisleading = of({
  //     id: 'jkasdasiooiasdhjad',
  //     name: NotificationType.VideosAndImagesMisleading,
  //     selected: null,
  //     selectType: null,
  //     listIcon: '69b301fc34a1431e97851991a73a441c.png',
  //     productId: 'VADASSDGTRHRTH',
  //     productThumbnail: '69b301fc34a1431e97851991a73a441c.png',
  //     productName: 'How To Date An Asian Women',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning videos and images misleading 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning videos and images misleading 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning videos and images misleading 3'
  //       }
  //     ],

  //     media: [
  //       {
  //         id: 'UTWERTFASD',
  //         name: 'Booty Type Training',
  //         url: '8d5741456a824e8981efdfa348d2cb0d.jpg'
  //       },
  //       {
  //         id: 'AFSDFFASDFSD',
  //         name: 'Gumpy\'s',
  //         thumbnail: 'thumbnail1.png',
  //         url: '//player.vimeo.com/video/173192945?title=0&byline=0&portrait=0&color=ffffff'
  //       },
  //       {
  //         id: 'RGDFVFGHJTGFSA',
  //         name: 'Ice Cream',
  //         thumbnail: 'thumbnail2.png',
  //         url: 'https://www.youtube.com/embed/1AI6RS1st2E'
  //       },
  //       {
  //         id: 'JKYUJSGDFA',
  //         name: 'Chocolate',
  //         thumbnail: 'thumbnail3.png',
  //         url: '//player.vimeo.com/video/179479722?title=0&byline=0&portrait=0&color=ffffff'
  //       },
  //       {
  //         id: 'UYTREYRHJGHJSDF',
  //         name: 'Vanilla',
  //         thumbnail: 'thumbnail4.png',
  //         url: 'https://www.youtube.com/embed/3ZEu6ZOMhlw'
  //       },
  //       {
  //         id: 'AFSDFHJJKEG',
  //         name: 'Strawberry',
  //         thumbnail: 'thumbnail5.png',
  //         url: 'https://player.vimeo.com/video/218732620'
  //       },
  //       {
  //         id: '345HSDDGFDSFSDD',
  //         name: 'Brownie',
  //         thumbnail: 'thumbnail6.png',
  //         url: 'https://player.vimeo.com/video/264188894'
  //       },
  //       {
  //         id: '4GFDSFSDFSAA',
  //         name: 'Cookie',
  //         url: '0a2b8633118d4719bddfe468521d8a39.png'
  //       },
  //       {
  //         id: '4DSASFSDFSDFSD',
  //         name: 'Milkshake',
  //         url: '2a08e8f8bc7940b087f7e29d2e80a106.png'
  //       },
  //       {
  //         id: 'UUEYTGGSSDFGG',
  //         name: 'Ice cream cone',
  //         url: '4ea6699537b04c7db407052d58d3bccb.png'
  //       },
  //       {
  //         id: 'UTYDGDFSGJHTG',
  //         name: 'Sprinkles',
  //         url: '0037b470cdef401a94195bc5c391c404.png'
  //       }
  //     ],

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning videos and images misleading 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning videos and images misleading 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning videos and images misleading 3'
  //       }
  //     ]
  //   } as ProductMediaNotification).pipe(delay(0));


  //   // ================================= VIDEOS AND IMAGES (OTHER) ================================ \\
  //   let videosAndImagesOther = of({
  //     id: 'cbeiudsjktyiwjduiekd',
  //     name: NotificationType.VideosAndImagesOther,
  //     selected: null,
  //     selectType: null,
  //     productId: 'MEMGJUUYJG',
  //     listIcon: '724db7642d584175aa3630ab9a6cc5d9.jpg',
  //     productThumbnail: '724db7642d584175aa3630ab9a6cc5d9.jpg',
  //     productName: 'Sex Lust and Lies',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning videos and images other 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning videos and images other 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning videos and images other 3'
  //       }
  //     ],

  //     media: [
  //       {
  //         id: 'UTWERTFASD',
  //         name: 'Booty Type Training',
  //         url: '8d5741456a824e8981efdfa348d2cb0d.jpg'
  //       },
  //       {
  //         id: 'AFSDFFASDFSD',
  //         name: 'Gumpy\'s',
  //         thumbnail: 'thumbnail1.png',
  //         url: '//player.vimeo.com/video/173192945?title=0&byline=0&portrait=0&color=ffffff'
  //       },
  //       {
  //         id: 'RGDFVFGHJTGFSA',
  //         name: 'Ice Cream',
  //         thumbnail: 'thumbnail2.png',
  //         url: 'https://www.youtube.com/embed/1AI6RS1st2E'
  //       },
  //       {
  //         id: 'JKYUJSGDFA',
  //         name: 'Chocolate',
  //         thumbnail: 'thumbnail3.png',
  //         url: '//player.vimeo.com/video/179479722?title=0&byline=0&portrait=0&color=ffffff'
  //       },
  //       {
  //         id: 'UYTREYRHJGHJSDF',
  //         name: 'Vanilla',
  //         thumbnail: 'thumbnail4.png',
  //         url: 'https://www.youtube.com/embed/3ZEu6ZOMhlw'
  //       },
  //       {
  //         id: 'AFSDFHJJKEG',
  //         name: 'Strawberry',
  //         thumbnail: 'thumbnail5.png',
  //         url: 'https://player.vimeo.com/video/218732620'
  //       },
  //       {
  //         id: '345HSDDGFDSFSDD',
  //         name: 'Brownie',
  //         thumbnail: 'thumbnail6.png',
  //         url: 'https://player.vimeo.com/video/264188894'
  //       },
  //       {
  //         id: '4GFDSFSDFSAA',
  //         name: 'Cookie',
  //         url: '0a2b8633118d4719bddfe468521d8a39.png'
  //       },
  //       {
  //         id: '4DSASFSDFSDFSD',
  //         name: 'Milkshake',
  //         url: '2a08e8f8bc7940b087f7e29d2e80a106.png'
  //       },
  //       {
  //         id: 'UUEYTGGSSDFGG',
  //         name: 'Ice cream cone',
  //         url: '4ea6699537b04c7db407052d58d3bccb.png'
  //       },
  //       {
  //         id: 'UTYDGDFSGJHTG',
  //         name: 'Sprinkles',
  //         url: '0037b470cdef401a94195bc5c391c404.png'
  //       }
  //     ],

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning videos and images other 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning videos and images other 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning videos and images other 3'
  //       }
  //     ]
  //   } as ProductMediaNotification).pipe(delay(0));


  //   // ================================= PRODUCT DESCRIPTION INCORRECT ================================ \\
  //   let productDescriptionIncorrect = of({
  //     id: 'vbmasdfuiwer',
  //     name: NotificationType.ProductDescriptionIncorrect,
  //     selected: null,
  //     selectType: null,
  //     listIcon: 'd7f8ac43d31e49edaefb55eda385b468.png',
  //     productId: 'ISJFJSDGRG',
  //     productThumbnail: 'd7f8ac43d31e49edaefb55eda385b468.png',
  //     productName: 'How To Grow Hair Long',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product description incorrect 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product description incorrect 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product description incorrect 3'
  //       }
  //     ],

  //     productDescription: 'This is a description that is incorrect, so here you have to redo the description so that it is no longer incorrect.',

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product description incorrect 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product description incorrect 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product description incorrect 3'
  //       }
  //     ]
  //   } as ProductDescriptionNotification).pipe(delay(0));


  //   // ================================= PRODUCT DESCRIPTION TOO VAGUE ================================ \\
  //   let productDescriptionTooVague = of({
  //     id: 'xcvcvbfghtyuser',
  //     name: NotificationType.ProductDescriptionTooVague,
  //     selected: null,
  //     selectType: null,
  //     listIcon: 'ce662a813987430a9b2b0b17cb4bda72.png',
  //     productId: 'ZASDHDFGHFS',
  //     productThumbnail: 'ce662a813987430a9b2b0b17cb4bda72.png',
  //     productName: 'Fat Shrinking Signal',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product description incorrect 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product description incorrect 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product description incorrect 3'
  //       }
  //     ],

  //     productDescription: 'This is a description that is too vague, so here you have to redo the description so that it is no longer too vague.',

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product description incorrect 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product description incorrect 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product description incorrect 3'
  //       }
  //     ]
  //   } as ProductDescriptionNotification).pipe(delay(0));


  //   // ================================= PRODUCT DESCRIPTION MISLEADING ================================ \\
  //   let productDescriptionMisleading = of({
  //     id: 'jhsasaduiweu',
  //     name: NotificationType.ProductDescriptionMisleading,
  //     selected: null,
  //     selectType: null,
  //     listIcon: 'c28764b0fd6f4cad80be85f047422fe1.png',
  //     productId: 'JOJJJFRETG',
  //     productThumbnail: 'c28764b0fd6f4cad80be85f047422fe1.png',
  //     productName: 'Gluteus To The Maximus',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product description misleading 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product description misleading 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product description misleading 3'
  //       }
  //     ],

  //     productDescription: 'This is a description that is misleading, so here you have to redo the description so that it is no longer misleading.',

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product description misleading 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product description misleading 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product description misleading 3'
  //       }
  //     ]
  //   } as ProductDescriptionNotification).pipe(delay(0));


  //   // ================================= PRODUCT DESCRIPTION (OTHER) ================================ \\
  //   let productDescriptionOther = of({
  //     id: 'cvbdsfqweru',
  //     name: NotificationType.ProductDescriptionOther,
  //     selected: null,
  //     selectType: null,
  //     listIcon: '6c048ea442b646b59970f907a4d3ce61.jpg',
  //     productId: 'VKGUEDDEUYUYS',
  //     productThumbnail: '6c048ea442b646b59970f907a4d3ce61.jpg',
  //     productName: 'ABS',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product description other 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product description other 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product description other 3'
  //       }
  //     ],

  //     productDescription: '<div>"The Skinny Asian Diet" Program gives you all of the incredible strategies and secret methods Asian women ' +
  //     'are using to get super-lean, super-healthy, and super-happy without expensive fitness gear and without going hungry. And it ' +
  //     'works even if your schedule is too busy for a single spare minute! Whether you\'re a career-oriented gal logging 60 hours a week ' +
  //     'at the office or a stay-at-home mom who would like to finally drop that annoying post-baby fat you\'ve been carrying, the program ' +
  //     'will get you where you want to be fast. The beauty of the program is that it works for every weight loss scenario. It doesn\'t matter ' +
  //     'if you\'re 10 pounds overweight or 100 pounds overweight, you will achieve your goal number quickly! "The Skinny Asian Diet" works for ' +
  //     'men too, so feel free to share the system with your husband or boyfriend if he has his own spare-tire you\'d like to see disappear. The ' +
  //     'best part of all is that it won\'t feel like you\'re on a diet at all. It will feel like you\'re living life to the fullest, eating large ' +
  //     'meals filled with great food that is simple to prepare, with no midnight cravings for sweets or other guilty pleasures!</div>',

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product description other 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product description other 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product description other 3'
  //       }
  //     ]
  //   } as ProductDescriptionNotification).pipe(delay(0));


  //   // ================================= PRODUCT REPORTED AS ILLEGAL ================================ \\
  //   let productReportedAsIllegal = of({
  //     id: 'tyutytygfgfsdsdf',
  //     name: NotificationType.ProductReportedAsIllegal,
  //     selected: null,
  //     selectType: null,
  //     listIcon: '899c7b6deb544dd28a7ec3055c5196a1.jpg',
  //     productId: 'BWWUYTRTUQF',
  //     productThumbnail: '899c7b6deb544dd28a7ec3055c5196a1.jpg',
  //     productName: 'The 21 Day Flat Belly Fix System',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product reported as illegal 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product reported as illegal 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product reported as illegal 3'
  //       }
  //     ],

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product reported as illegal 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product reported as illegal 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product reported as illegal 3'
  //       }
  //     ]
  //   } as GeneralNotification).pipe(delay(0));


  //   // ================================= PRODUCT REPORTED AS HAVING ADULT CONTENT ================================ \\
  //   let ProductReportedAsHavingAdultContent = of({
  //     id: 'ljkgkhjhf',
  //     name: NotificationType.ProductReportedAsHavingAdultContent,
  //     selected: null,
  //     selectType: null,
  //     listIcon: '17a40d16e5d8454da45ed3d5683e0ab6.png',
  //     productId: 'ESESEYGYUY',
  //     productThumbnail: '17a40d16e5d8454da45ed3d5683e0ab6.png',
  //     productName: '7 Day Super Slim',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product reported as having adult content 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product reported as having adult content 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product reported as having adult content 3'
  //       }
  //     ],

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product reported as having adult content 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product reported as having adult content 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product reported as having adult content 3'
  //       }
  //     ]
  //   } as GeneralNotification).pipe(delay(0));


  //   // ================================= OFFENSIVE PRODUCT OTHER ================================ \\
  //   let offensiveProductOther = of({
  //     id: 'piouylkjhg',
  //     name: NotificationType.OffensiveProductOther,
  //     selected: null,
  //     selectType: null,
  //     listIcon: 'f5ca6bd2ac0549d3b7f0609c534eb182.png',
  //     productId: 'NOSHJSGFREGE',
  //     productThumbnail: 'f5ca6bd2ac0549d3b7f0609c534eb182.png',
  //     productName: 'Yoga Burn Booty Challenge',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning offensive product other content 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning offensive product other content 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning offensive product other content 3'
  //       }
  //     ],

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning offensive product other content 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning offensive product other content 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning offensive product other content 3'
  //       }
  //     ]
  //   } as GeneralNotification).pipe(delay(0));


  //   // ================================= PRODUCT INACTIVE ================================ \\
  //   let productInactive = of({
  //     id: 'hgdgfffaszxcv',
  //     name: NotificationType.ProductInactive,
  //     selected: null,
  //     selectType: null,
  //     listIcon: '429928f0e88045318dbae00b5a90df12.png',
  //     productId: 'ZQYIUJYJSGFRSD',
  //     productThumbnail: '429928f0e88045318dbae00b5a90df12.png',
  //     productName: 'The 8 Week Booty',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product inactive 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product inactive 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product inactive 3'
  //       }
  //     ],

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product inactive 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product inactive 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product inactive 3'
  //       }
  //     ]
  //   } as GeneralNotification).pipe(delay(0));


  //   // ================================= PRODUCT SITE NO LONGER IN SERVICE ================================ \\
  //   let productSiteNoLongerInService = of({
  //     id: 'bnmfhjruuiytr',
  //     name: NotificationType.ProductSiteNoLongerInService,
  //     selected: null,
  //     selectType: null,
  //     listIcon: '1d21c8846a464c989eb6914c224a3324.png',
  //     productId: 'XKXKRFARSFF',
  //     productThumbnail: '1d21c8846a464c989eb6914c224a3324.png',
  //     productName: 'The Thyroid Factor',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product site no longer in service 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product site no longer in service 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning product site no longer in service 3'
  //       }
  //     ],

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product site no longer in service 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product site no longer in service 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning product site no longer in service 3'
  //       }
  //     ]
  //   } as GeneralNotification).pipe(delay(0));


  //   // ================================= MISSING PRODUCT OTHER ================================ \\
  //   let missingProductOther = of({
  //     id: 'hggggfsrt',
  //     name: NotificationType.MissingProductOther,
  //     selected: null,
  //     selectType: null,
  //     listIcon: '1b4f02a0b8ad491e950a94eade1df05f.png',
  //     productId: 'DEDHTHDTFHFH',
  //     productThumbnail: '1b4f02a0b8ad491e950a94eade1df05f.png',
  //     productName: 'What Husbands Can\'t Resist',
  //     vendorId: 'F5TD6KOQHB',
  //     hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
  //     customerText: [
  //       {
  //         timeStamp: '11/24/2018  10:33 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning missing product other 1'
  //       },

  //       {
  //         timeStamp: '7/5/2019  4:19 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning missing product other 2',
  //       },

  //       {
  //         timeStamp: '5/22/2020  5:22 PM',
  //         thumbnail: 'no-account-pic.png',
  //         text: 'Here are some user comments concerning missing product other 3'
  //       }
  //     ],

  //     notesText: [
  //       {
  //         timeStamp: '10/24/2018  7:14 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning missing product other 1'
  //       },

  //       {
  //         timeStamp: '6/15/2019  1:36 PM',
  //         thumbnail: 'gabe-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning missing product other 2',
  //       },

  //       {
  //         timeStamp: '3/10/2020  3:04 PM',
  //         thumbnail: 'bron-account-pic.png',
  //         text: 'Here are some notes that describe how I took action concerning missing product other 3'
  //       }
  //     ]
  //   } as GeneralNotification).pipe(delay(0));




  //   return concat(
  //     message,
  //     reviewComplaint,
  //     productNameDoesNotMatchWithProductDescription,
  //     productNameDoesNotMatchWithProductImage,
  //     productNameOther,
  //     ProductPriceTooHigh,
  //     productPriceNotCorrect,
  //     productPriceOther,
  //     videosAndImagesAreDifferentFromProduct,
  //     notEnoughVideosAndImages,
  //     videosAndImagesNotClear,
  //     videosAndImagesMisleading,
  //     videosAndImagesOther,
  //     productDescriptionIncorrect,
  //     productDescriptionTooVague,
  //     productDescriptionMisleading,
  //     productDescriptionOther,
  //     productReportedAsIllegal,
  //     ProductReportedAsHavingAdultContent,
  //     offensiveProductOther,
  //     productInactive,
  //     productSiteNoLongerInService,
  //     missingProductOther
  //   )
  // }
}