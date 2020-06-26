import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { KeyValue } from '@angular/common';
import { MediaType } from '../classes/media';

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



      // Keywords
      case 'api/Products/Keywords':

        return of([
          {
            id: 'AFSDFFDSFS',
            name: 'Gumpy'
          },
          {
            id: 'GGFSDFGFSDAF',
            name: 'Ice Cream'
          },
          {
            id: 'WFWFASF',
            name: 'Chocolate'
          },
          {
            id: 'HYTREYREY',
            name: 'Vanilla'
          },
          {
            id: 'UYTUYRUY',
            name: 'Strawberry'
          },
          {
            id: 'YTRYRE',
            name: 'Sundae'
          },
          {
            id: 'AFSDFFDSFS',
            name: 'Ice Cream Cone'
          },
          {
            id: 'AFSDFFDSFS',
            name: 'Mint Chocolate Chip'
          }
        ]).pipe(delay(1000));





      // Lead Pages
      case 'api/Niches/LeadPageIds':
        return of(['FM1R8HAOEB', '5NOQOTV6KS', '026HJNAYPQ']).pipe(delay(1000));


      // Lead Pages
      case 'api/Niches/LeadPages':
        if (parameters[0].value == 'FM1R8HAOEB') {
          return of({
            id: 'FM1R8HAOEB',
            name: 'Campland',
            width: 1600,
            background: {
              enable: false,
              color: '#ffffff',
              image: {
                name: 'Campland',
                url: 'campland-background.jpg',
                position: 'center center',
                repeat: 'no-repeat',
                attachment: 'fixed'
              }
            },
            rows: [
              {
                name: 'My Row',
                top: 100,
                background: null,
                border: null,
                corners: null,
                shadow: null,
                padding: null,
                verticalAlignment: null,
                breakpoints: [],
                columns: [




                  // Button
                  {
                    name: 'My Column',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 2,
                    widgetData: {
                      widgetType: 0,
                      name: 'My Button',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: '0 auto',
                      background: {
                        color: '#ff0000',
                        image: null,
                        enable: null
                      },
                      border: {
                        enable: true,
                        width: 5,
                        style: null,
                        color: '#00ff00'
                      },
                      caption: {
                        text: 'Alita',
                        font: '"Comic Sans MS", cursive, sans-serif',
                        fontSize: '24',
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        textDecoration: 'underline',
                        color: '#0000ff'
                      },
                      corners: {
                        constrain: true,
                        topLeft: 20,
                        topRight: 20,
                        bottomRight: 20,
                        bottomLeft: 20
                      },
                      shadow: {
                        enable: true,
                        x: 10,
                        y: 10,
                        blur: 10,
                        size: 10,
                        color: '#3f573f70'
                      },
                      padding: {
                        constrain: true,
                        top: '24px',
                        right: '24px',
                        bottom: '24px',
                        left: '24px'
                      },
                      link: {
                        selectedOption: 'webAddress',
                        url: 'http://www.alitamovie.com'
                      },
                      backgroundHoverColor: '#6b2456',
                      backgroundActiveColor: '#446e05',
                      borderHoverColor: '#ff05f3',
                      borderActiveColor: '#acdb12',
                      textHoverColor: '#2ad1c6',
                      textActiveColor: '#36cc00'
                    }
                  },




                  // Text
                  {
                    name: 'My Column2',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 2,
                    widgetData: {
                      widgetType: 1,
                      name: 'My Text',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      background: {
                        color: '#b01a65',
                        image: null,
                        enable: null
                      },
                      padding: null,
                      htmlContent: '<div>Hello</div>'
                    }
                  },







                  // Image
                  {
                    name: 'My Column3',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 2,
                    widgetData: {
                      widgetType: 2,
                      name: 'My Image',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      border: {
                        enable: true,
                        width: 3,
                        style: null,
                        color: '#0000ff'
                      },
                      image: {
                        url: '0aada12f8b21471ea96aebe9a503977b.png',
                        name: 'Alita'
                      },
                      corners: null,
                      shadow: null,
                      link: {
                        url: 'http://www.tama.com',
                        selectedOption: 'niche'
                      }

                    }
                  },









                  // Container
                  {
                    name: 'My Column4',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 2,
                    widgetData: {
                      widgetType: 3,
                      name: 'My Container',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      border: null,
                      background: null,
                      corners: null,
                      shadow: null,
                      padding: null,
                      rows: [
                        {
                          name: 'My Row',
                          top: 0,
                          background: null,
                          border: null,
                          corners: null,
                          shadow: null,
                          padding: null,
                          verticalAlignment: null,
                          breakpoints: [],
                          columns: [




                            // Button
                            {
                              name: 'My Column',
                              background: null,
                              border: null,
                              corners: null,
                              shadow: null,
                              padding: null,
                              breakpoints: [],
                              columnSpan: 12,
                              widgetData: {
                                widgetType: 0,
                                name: 'My Button',
                                width: null,
                                height: null,
                                breakpoints: [],
                                horizontalAlignment: null,
                                background: null,
                                border: null,
                                caption: null,
                                corners: null,
                                shadow: null,
                                padding: null,
                                link: null,
                                backgroundHoverColor: null,
                                backgroundActiveColor: null,
                                borderHoverColor: null,
                                borderActiveColor: null,
                                textHoverColor: null,
                                textActiveColor: null
                              }
                            }
                          ]
                        }
                      ]

                    }
                  },







                  // Line
                  {
                    name: 'My Column5',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 2,
                    widgetData: {
                      widgetType: 4,
                      name: 'My Line',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      border: null,
                      shadow: null,
                    }
                  },









                  // Video
                  {
                    name: 'My Column6',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 2,
                    widgetData: {
                      widgetType: 5,
                      name: 'My Video',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      border: null,
                      video: {
                        url: '//player.vimeo.com/video/173192945?muted=false',
                        thumbnail: 'thumbnail1.png'
                      },
                      corners: null,
                      shadow: null

                    }
                  }
                ]
              },



              // Product Group
              {
                name: 'My Row2',
                top: 400,
                background: null,
                border: null,
                corners: null,
                shadow: null,
                padding: null,
                verticalAlignment: null,
                breakpoints: [],
                columns: [
                  {
                    name: 'My Column',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 4,
                    widgetData: {
                      widgetType: 6,
                      name: 'My Product Group',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      caption: {
                        text: 'Check out our featured products',
                        fontWeight: 'bold',
                        fontSize: '44',
                        fontStyle: 'italic',
                        font: 'Impact, Charcoal, sans-serif',
                        textDecoration: 'underline',
                        color: '#ff0000'
                      },
                      productGroupType: 0,
                      featuredProducts: [
                        {
                          id: 'FA24GDSETG',
                          name: 'How To Be a Gumpy'
                        },
                        {
                          id: '8RTIOFGBHE',
                          name: 'Alita: Battle Angel'
                        }
                      ]

                    }
                  },





                  // Categories
                  {
                    name: 'My Column2',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 4,
                    widgetData: {
                      widgetType: 7,
                      name: 'My Categories',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      caption: {
                        text: 'Welcome to Gumpy\'s',
                        fontWeight: 'bold',
                        fontSize: '44',
                        fontStyle: 'italic',
                        font: 'Impact, Charcoal, sans-serif',
                        textDecoration: 'underline',
                        color: '#ff0000'
                      },
                      backgroundColor: '#0000ff',
                      textColor: '#00ff00',
                      shadow: {
                        enable: true,
                        x: 10,
                        y: 10,
                        blur: 10,
                        size: 10,
                        color: '#3f573f70'
                      },
                      categories: [
                        {
                          name: 'Health & Fitness',
                          id: 'fdsfafsdfdsds',
                          icon: {
                            url: '44d71fbf43904ffdbdece40a45bdf9db.png',
                            name: 'Health & Fitness'
                          }
                        },
                        {
                          name: 'Self-Help',
                          id: 1,
                          icon: {
                            url: '143968bba73642898bb4a6715a1efd3d.png',
                            name: 'self-help'
                          }
                        }
                      ]
                    }
                  },










                  // Carousel
                  {
                    name: 'My Column3',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 4,
                    widgetData: {
                      widgetType: 8,
                      name: 'My Carousel',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      banners: [
                        {
                          image: {
                            url: 'banner1.jpg',
                            name: 'Keto'
                          },
                          link: {
                            selectedOption: 'webAddress',
                            url: 'http://www.alitamovie.com',
                          }
                        },
                        {
                          image: {
                            url: 'banner2.jpg',
                            name: 'Hyperbolic Stretching'
                          },
                          link: {
                            selectedOption: 'page',
                            url: 'http://www.tama.com',
                          }
                        },

                        {
                          image: {
                            url: 'banner3.jpg',
                            name: 'Google'
                          },
                          link: {
                            selectedOption: 'page',
                            url: 'http://www.google.com',
                          }
                        },


                        {
                          image: {
                            url: 'banner4.jpg',
                            name: 'YouTube'
                          },
                          link: {
                            selectedOption: 'page',
                            url: 'http://www.youtube.com',
                          }
                        },


                        {
                          image: {
                            url: 'banner5.jpg',
                            name: 'Avatar'
                          },
                          link: {
                            selectedOption: 'page',
                            url: 'http://www.avatarmovie.com',
                          }
                        }


                      ]
                    }
                  }
                ]
              }
            ]
          }).pipe(delay(1000));
        } else if (parameters[0].value == '5NOQOTV6KS') {
          return of({
            id: '5NOQOTV6KS',
            name: 'Alita',
            width: 1200,
            background: {
              enable: false,
              color: '#ff0000',
              image: null
            },
            rows: []
          }).pipe(delay(1000));
        } else if (parameters[0].value == '026HJNAYPQ') {
          return of({
            id: '026HJNAYPQ',
            name: 'Gumpy\'s',
            width: 1600,
            background: {
              enable: false,
              color: '#00ff00',
              image: null
            },
            rows: []
          }).pipe(delay(1000));
        } else if (parameters[0].value == '4LSN6AR0F5') {
          return of({
            id: '4LSN6AR0F5',
            name: 'New Lead Page',
            width: 1600,
            background: {
              color: '#ffffff',
              image: null,
              enable: null
            },
            rows: []
          }).pipe(delay(1000));
        } else if (parameters[0].value == 'L2D8IEG9WL') {
          return of({
            id: 'L2D8IEG9WL',
            name: 'Alita',
            width: 1200,
            background: {
              enable: false,
              color: '#ff0000',
              image: null
            },
            rows: []
          }).pipe(delay(1000));
        }












      // Lead Page Emails
      case 'api/Niches/LeadPageEmails':
        if (parameters[0].value == 'FM1R8HAOEB') {
          return of({
            id: 'FM1R8HAOEB',
            name: 'Campland Email',
            width: 600,
            background: {
              enable: false,
              color: '#0000ff',
              image: null
            },
            rows: [
              {
                name: 'My Row',
                top: 200,
                background: null,
                border: null,
                corners: null,
                shadow: null,
                padding: null,
                verticalAlignment: null,
                breakpoints: [],
                columns: [








                  // Text
                  {
                    name: 'My Column',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 12,
                    widgetData: {
                      widgetType: 1,
                      name: 'My Text',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      background: {
                        color: '#afafaf',
                        image: null,
                        enable: null
                      },
                      padding: null,
                      htmlContent: '<div>Thanks for your interest in Campland!</div>'
                    }
                  },
                ]
              },
            ]
          }).pipe(delay(1000));
        } else if (parameters[0].value == '5NOQOTV6KS') {
          return of({
            id: '5NOQOTV6KS',
            name: 'Alita Email',
            width: 500,
            background: {
              enable: false,
              color: '00ff00',
              image: null
            },
            rows: []
          }).pipe(delay(1000));
        } else if (parameters[0].value == '026HJNAYPQ') {
          return of({
            id: '026HJNAYPQ',
            name: 'Gumpy\'s Email',
            width: 550,
            background: {
              enable: false,
              color: '#0000ff',
              image: null
            },
            rows: []
          }).pipe(delay(1000));
        } else if (parameters[0].value == '4LSN6AR0F5') {
          return of({
            id: '4LSN6AR0F5',
            name: 'New Lead Page Email',
            width: 600,
            background: {
              color: '#ffffff',
              image: null,
              enable: null
            },
            rows: []
          }).pipe(delay(1000));
        } else if (parameters[0].value == 'L2D8IEG9WL') {
          return of({
            id: 'L2D8IEG9WL',
            name: 'Alita Email',
            width: 500,
            background: {
              enable: false,
              color: '00ff00',
              image: null
            },
            rows: []
          }).pipe(delay(1000));
        }

      // Products
      case 'api/Products/Product':
        return of({
          id: 'TGHUQ7OWNK',
          name: 'Booty Type Training',
          vendor:
          {
            id: 'LWDT6IQHNX',
            name: 'Gumpy\'s',
          }
          ,
          rating: 0,
          totalReviews: 0,
          hoplink: 'https://d7c4efozzevfuniljjxksc8r3g.hop.clickbank.net/',
          description:
            '<div>"The Skinny Asian Diet" Program gives you all of the incredible strategies and secret methods Asian women ' +
            'are using to get super-lean, super-healthy, and super-happy without expensive fitness gear and without going hungry. And it ' +
            'works even if your schedule is too busy for a single spare minute! Whether you\'re a career-oriented gal logging 60 hours a week ' +
            'at the office or a stay-at-home mom who would like to finally drop that annoying post-baby fat you\'ve been carrying, the program ' +
            'will get you where you want to be fast. The beauty of the program is that it works for every weight loss scenario. It doesn\'t matter ' +
            'if you\'re 10 pounds overweight or 100 pounds overweight, you will achieve your goal number quickly! "The Skinny Asian Diet" works for ' +
            'men too, so feel free to share the system with your husband or boyfriend if he has his own spare-tire you\'d like to see disappear. The ' +
            'best part of all is that it won\'t feel like you\'re on a diet at all. It will feel like you\'re living life to the fullest, eating large ' +
            'meals filled with great food that is simple to prepare, with no midnight cravings for sweets or other guilty pleasures!</div>'
          ,

          content: [
            {
              id: '0006C245A7',
              title: 'Cooking Tips',
              icon: {
                id: 'FSDFASFFSDFA',
                name: 'Video',
                url: 'video.png',
                load: null,
                save: null
              },
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
              icon: {
                id: 'JHFJSDRFGFFD',
                name: 'Audio',
                url: 'audio.png',
                load: null,
                save: null
              },
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
              icon: {
                id: 'QRDFDDASFASDF',
                name: 'PDF',
                url: 'pdf.png',
                load: null,
                save: null
              },
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
            {
              id: 'UTWERTFASD',
              name: 'Booty Type Training',
              url: '8d5741456a824e8981efdfa348d2cb0d.jpg',
              type: MediaType.ProductImage
            },
            {
              id: 'AFSDFFASDFSD',
              name: 'Gumpy\'s',
              thumbnail: 'thumbnail1.png',
              url: '//player.vimeo.com/video/173192945?title=0&byline=0&portrait=0&color=ffffff',
              type: MediaType.Video
            },
            {
              id: 'RGDFVFGHJTGFSA',
              name: 'Ice Cream',
              thumbnail: 'thumbnail2.png',
              url: 'https://www.youtube.com/embed/1AI6RS1st2E',
              type: MediaType.Video
            },
            {
              id: 'JKYUJSGDFA',
              name: 'Chocolate',
              thumbnail: 'thumbnail3.png',
              url: '//player.vimeo.com/video/179479722?title=0&byline=0&portrait=0&color=ffffff',
              type: MediaType.Video
            },
            {
              id: 'UYTREYRHJGHJSDF',
              name: 'Vanilla',
              thumbnail: 'thumbnail4.png',
              url: 'https://www.youtube.com/embed/3ZEu6ZOMhlw',
              type: MediaType.Video
            },
            {
              id: 'AFSDFHJJKEG',
              name: 'Strawberry',
              thumbnail: 'thumbnail5.png',
              url: 'https://player.vimeo.com/video/218732620',
              type: MediaType.Video
            },
            {
              id: '345HSDDGFDSFSDD',
              name: 'Brownie',
              thumbnail: 'thumbnail6.png',
              url: 'https://player.vimeo.com/video/264188894',
              type: MediaType.Video
            },
            {
              id: '4GFDSFSDFSAA',
              name: 'Cookie',
              url: '0a2b8633118d4719bddfe468521d8a39.png',
              type: MediaType.ProductImage
            },
            {
              id: '4DSASFSDFSDFSD',
              name: 'Milkshake',
              url: '2a08e8f8bc7940b087f7e29d2e80a106.png',
              type: MediaType.ProductImage
            },
            {
              id: 'UUEYTGGSSDFGG',
              name: 'Ice cream cone',
              url: '4ea6699537b04c7db407052d58d3bccb.png',
              type: MediaType.ProductImage
            },
            {
              id: 'UTYDGDFSGJHTG',
              name: 'Sprinkles',
              url: '0037b470cdef401a94195bc5c391c404.png',
              type: MediaType.ProductImage
            }
          ],
          price: '$5.16 - $16.80'
        }).pipe(delay(1000));



      // Product email ids
      case 'api/Products/EmailIds':
        return of(['FM1R8HAOEB', '5NOQOTV6KS', '026HJNAYPQ']).pipe(delay(1000));



      // Product emails
      case 'api/Products/Emails':
        if (parameters[0].value == 'FM1R8HAOEB') {
          return of({
            id: 'FM1R8HAOEB',
            name: 'Campland Email',
            width: 600,
            background: {
              enable: false,
              color: '#0000ff',
              image: null
            },
            rows: [
              {
                name: 'My Row',
                top: 200,
                background: null,
                border: null,
                corners: null,
                shadow: null,
                padding: null,
                verticalAlignment: null,
                breakpoints: [],
                columns: [








                  // Text
                  {
                    name: 'My Column',
                    background: null,
                    border: null,
                    corners: null,
                    shadow: null,
                    padding: null,
                    breakpoints: [],
                    columnSpan: 12,
                    widgetData: {
                      widgetType: 1,
                      name: 'My Text',
                      width: null,
                      height: null,
                      breakpoints: [],
                      horizontalAlignment: null,
                      background: {
                        color: '#afafaf',
                        image: null,
                        enable: null
                      },
                      padding: null,
                      htmlContent: '<div>Thanks for your interest in Campland!</div>'
                    }
                  },
                ]
              },
            ]
          }).pipe(delay(1000));
        } else if (parameters[0].value == '5NOQOTV6KS') {
          return of({
            id: '5NOQOTV6KS',
            name: 'Alita Email',
            width: 500,
            background: {
              enable: false,
              color: '00ff00',
              image: null
            },
            rows: []
          }).pipe(delay(1000));
        } else if (parameters[0].value == '026HJNAYPQ') {
          return of({
            id: '026HJNAYPQ',
            name: 'Gumpy\'s Email',
            width: 550,
            background: {
              enable: false,
              color: '#0000ff',
              image: null
            },
            rows: []
          }).pipe(delay(1000));
        } else if (parameters[0].value == '4LSN6AR0F5') {
          return of({
            id: '4LSN6AR0F5',
            name: 'New Lead Page Email',
            width: 600,
            background: {
              color: '#ffffff',
              image: null,
              enable: null
            },
            rows: []
          }).pipe(delay(1000));
        } else if (parameters[0].value == 'L2D8IEG9WL') {
          return of({
            id: 'L2D8IEG9WL',
            name: 'Alita Email',
            width: 500,
            background: {
              enable: false,
              color: '00ff00',
              image: null
            },
            rows: []
          }).pipe(delay(1000));
        }



        // Category
      case 'api/Categories/Category':

        return of('44d71fbf43904ffdbdece40a45bdf9db.png').pipe(delay(1000));
    }

  }


  post(url: string, body: any): Observable<any> {
    return of('4LSN6AR0F5').pipe(delay(1000));
  }

  put(url: string, body: any): Observable<any> {
    return of({}).pipe(delay(1000));
  }

  delete(url: string, params: any): Observable<any> {
    return of({}).pipe(delay(1000));
  }
}
