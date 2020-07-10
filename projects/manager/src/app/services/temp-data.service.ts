import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { KeyValue } from '@angular/common';
import { MediaType } from '../classes/media';
import { MediaItem } from '../classes/media-item';

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






      // Filters
      case 'api/Filters/Search':

        return of([
          {
            id: 'yrttretwt',
            name: 'Product Type Search'
          },
          {
            id: 'jhgfsdgfa',
            name: 'Billing Type Search'
          },
          {
            id: 'qwerghghjkjg',
            name: 'Promotional Search'
          },
          {
            id: 'rtewghdgfadfdsfs',
            name: 'Media Type Search'
          },
          {
            id: 'oiuiiytreygsgdfg Search',
            name: 'Gender'
          }
        ]).pipe(delay(1000));




      // Filter options
      case 'api/FilterOptions/Search':

        return of([
          {
            id: 'hgfdhfhgfh',
            name: 'Physical Search',
          },
          {
            id: 'kjhgkjkhk',
            name: 'Digital Download Search',
          },
          {
            id: 'qwfeerwer',
            name: 'Email Search',
          },
          {
            id: 'hgfdfgfghfhgf',
            name: 'Online Membership Search',
          }
        ]).pipe(delay(1000));












      // Categories
      case 'api/Categories':
        return of([
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
            id: 'fsdfsdasd',
            icon: {
              url: '143968bba73642898bb4a6715a1efd3d.png',
              name: 'self-help'
            }
          },
          {
            id: 'rewqrewer',
            name: 'E-business & E-marketing',
            icon: {
              url: '9b00bc3910244ce798b8009227c65de7.png',
              name: 'self-help'
            }
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


      case 'api/Niches/LeadPages/Create':
        return of({
          id: '4LSN6AR0F5',
          name: 'New Lead Page',
          width: 1600,
          background: {
            color: '#ffffff',
          }
        }).pipe(delay(1000));


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
                        selectedOption: 'category',
                        url: 'http://www.alitamovie.com',
                        optionValue: 'Alita Category'
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
            id: 'F5TD6KOQHB',
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


      case 'api/Pages/Create':
        return of({
          id: '4LSN6AR0F5',
          name: 'New Page',
          width: 1600,
          background: {
            color: '#ffffff',
          }
        }).pipe(delay(1000));



      case 'api/Emails/Create':
        return of({
          id: '4LSN6AR0F5',
          name: 'New Page',
          width: 600,
          type: 0,
          background: {
            color: '#ffffff',
          }
        }).pipe(delay(1000));



      case 'api/Vendors':
        if (parameters) {
          return of({
            id: 'F5TD6KOQHB',
            name: 'Gumpy\'s',
            webPage: 'http://www.gumpys.com',
            address: {
              street: '110 Feeder Dam Rd',
              city: 'South Glens Falls',
              zip: 12803,
              poBox: 22,
              state: 'NY',
              country: 'USA'
            },
            primaryContact: {
              firstName: 'Gabey',
              lastName: 'Gump',
              officePhone: '518-793-5555',
              mobilePhone: '518-555-5555',
              email: 'ggump@gmail.com'
            },
            secondaryContact: {
              firstName: 'Brony',
              lastName: 'Gump',
              officePhone: '518-793-5555',
              mobilePhone: '518-222-2222',
              email: 'bgump@gmail.com'
            },
            notes: 'It\'s amazing that this dumb company has been around for 20 years. ' +
              'You have to keep after Gabey Gump to do something simple. Don\'t bother emailing him because he won\'t reply. ' +
              'He probably doesn\'t know how to check his email. I\'ve been told they are still using Windows 98 from an HP desktop with a 533 mhz processor.'
          }).pipe(delay(1000));
        }

        return of([
          {
            id: 'F5TD6KOQHB',
            name: 'Gumpy\'s',
          },
          {
            id: 'REEQWRRE',
            name: 'Vendor2'
          },
          {
            id: 'JHGFJGHJHJ',
            name: 'Vendor3'
          },
          {
            id: 'QEQWREWERR',
            name: 'Vendor4'
          },
          {
            id: 'LKJHJKLJLK',
            name: 'Vendor5'
          },
          {
            id: 'BVCXCVBBV',
            name: 'Vendor6'
          },
          {
            id: 'UYTRUUU',
            name: 'Vendor7'
          },
          {
            id: 'OIYIUOIUOO',
            name: 'Vendor8'
          },
          {
            id: 'VVVVVVVVVVFASDDD',
            name: 'Vendor9'
          },
          {
            id: 'JHGFHJJGHGHSDFADF',
            name: 'Vendor10'
          },
          {
            id: 'HGSGDGFFAFSD',
            name: 'Vendor11'
          },
          {
            id: 'REEQWRRE',
            name: 'Vendor12'
          },
          {
            id: 'JHGFJGHJHJ',
            name: 'Vendor13'
          },
          {
            id: 'QEQWREWERR',
            name: 'Vendor14'
          },
          {
            id: 'LKJHJKLJLK',
            name: 'Vendor15'
          },
          {
            id: 'BVCXCVBBV',
            name: 'Vendor16'
          },
          {
            id: 'UYTRUUU',
            name: 'Vendor17'
          },
          {
            id: 'OIYIUOIUOO',
            name: 'Vendor18'
          },
          {
            id: 'VVVVVVVVVVFASDDD',
            name: 'Vendor19'
          },
          {
            id: 'JHGFHJJGHGHSDFADF',
            name: 'Vendor20'
          }
        ]).pipe(delay(1000));





      case 'api/Vendors/Search':
        return of([
          {
            id: 'HGSGDGFFAFSD',
            name: 'VendorSearch1'
          },
          {
            id: 'REEQWRRE',
            name: 'VendorSearch2'
          },
          {
            id: 'JHGFJGHJHJ',
            name: 'VendorSearch3'
          },
          {
            id: 'QEQWREWERR',
            name: 'VendorSearch4'
          },
          {
            id: 'LKJHJKLJLK',
            name: 'VendorSearch5'
          }
        ]).pipe(delay(1000));



      case 'api/Pages':
        if (parameters) {
          return of({
            "background": {
              "color": "#2564a8"
            },
            "rows": [
              {
                "columns": [
                  {
                    "widgetData": {
                      "background": {
                        "color": "#ffffff00"
                      },
                      "htmlContent": "<div style=\"text-align: center;\"><span style=\"font-weight: 700;\"><span style=\"font-family: &quot;Comic Sans MS&quot;, cursive, sans-serif;\"><span style=\"font-size: 36px;\"><span style=\"color: rgb(222, 82, 180);\">Welcome To Gumpy's</span></span></span></span></div>",
                      "widgetType": 1,
                      "height": 64
                    },
                    "columnSpan": 12
                  }
                ],
                "top": 63.078125
              },
              {
                "columns": [
                  {
                    "widgetData": {
                      "image": {
                        "url": "ca7d0d7b27b8475fbb55a4bf63617f2f.jpg"
                      },
                      "link": {

                      },
                      "widgetType": 2,
                      "width": 300,
                      "height": 300,
                      "horizontalAlignment": "0 auto"
                    },
                    "columnSpan": 12
                  }
                ],
                "top": 159.078125
              }
            ],
            "id": "4LSN6AR0F5",
            "name": "Gumpy's",
            "width": 1600
          }).pipe(delay(1000));
        }


        return of([
          {
            id: 'HGSGDGFFAFSD',
            name: 'Page1'
          },
          {
            id: 'REEQWRRE',
            name: 'Page2'
          },
          {
            id: 'JHGFJGHJHJ',
            name: 'Page3'
          },
          {
            id: 'QEQWREWERR',
            name: 'Page4'
          },
          {
            id: 'LKJHJKLJLK',
            name: 'Page5'
          },
          {
            id: 'BVCXCVBBV',
            name: 'Page6'
          },
          {
            id: 'UYTRUUU',
            name: 'Page7'
          },
          {
            id: 'OIYIUOIUOO',
            name: 'Page8'
          },
          {
            id: 'VVVVVVVVVVFASDDD',
            name: 'Page9'
          },
          {
            id: 'JHGFHJJGHGHSDFADF',
            name: 'Page10'
          }
        ]).pipe(delay(1000));











      case 'api/Emails':
        if (parameters) {
          return of({
            "background": {
              "color": "#df136c"
            },
            "rows": [
              {
                "columns": [
                  {
                    "widgetData": {
                      "background": {
                        "color": "#ffffff00"
                      },
                      "htmlContent": "<div style=\"text-align: center;\"><span style=\"font-weight: 700;\"><span style=\"font-family: &quot;Comic Sans MS&quot;, cursive, sans-serif;\"><span style=\"font-size: 36px;\"><span style=\"color: rgb(6, 80, 216);\">Welcome To Gumpy's</span></span></span></span></div>",
                      "widgetType": 1,
                      "height": 64
                    },
                    "columnSpan": 12
                  }
                ],
                "top": 63.078125
              },
              {
                "columns": [
                  {
                    "widgetData": {
                      "image": {
                        "url": "ca7d0d7b27b8475fbb55a4bf63617f2f.jpg"
                      },
                      "link": {

                      },
                      "widgetType": 2,
                      "width": 300,
                      "height": 300,
                      "horizontalAlignment": "0 auto"
                    },
                    "columnSpan": 12
                  }
                ],
                "top": 159.078125
              }
            ],
            "id": "4LSN6AR0F5",
            "name": "Gumpy's",
            "width": 600,
            "type": 3
          }).pipe(delay(1000));
        }


        return of([
          {
            id: 'HGSGDGFFAFSD',
            name: 'Email1'
          },
          {
            id: 'REEQWRRE',
            name: 'Email2'
          },
          {
            id: 'JHGFJGHJHJ',
            name: 'Email3'
          },
          {
            id: 'QEQWREWERR',
            name: 'Email4'
          },
          {
            id: 'LKJHJKLJLK',
            name: 'Email5'
          },
          {
            id: 'BVCXCVBBV',
            name: 'Email6'
          },
          {
            id: 'UYTRUUU',
            name: 'Email7'
          },
          {
            id: 'OIYIUOIUOO',
            name: 'Email8'
          },
          {
            id: 'VVVVVVVVVVFASDDD',
            name: 'Email9'
          },
          {
            id: 'JHGFHJJGHGHSDFADF',
            name: 'Email10'
          }
        ]).pipe(delay(1000));































      case 'api/Pages/Search':
        return of([
          {
            id: 'HGSGDGFFAFSD',
            name: 'PageSearch1'
          },
          {
            id: 'REEQWRRE',
            name: 'PageSearch2'
          },
          {
            id: 'JHGFJGHJHJ',
            name: 'PageSearch3'
          },
          {
            id: 'QEQWREWERR',
            name: 'PageSearch4'
          },
          {
            id: 'LKJHJKLJLK',
            name: 'PageSearch5'
          }
        ]).pipe(delay(1000));






      case 'api/Emails/Search':
        return of([
          {
            id: 'HGSGDGFFAFSD',
            name: 'EmailSearch1'
          },
          {
            id: 'REEQWRRE',
            name: 'EmailSearch2'
          },
          {
            id: 'JHGFJGHJHJ',
            name: 'EmailSearch3'
          },
          {
            id: 'QEQWREWERR',
            name: 'EmailSearch4'
          },
          {
            id: 'LKJHJKLJLK',
            name: 'EmailSearch5'
          }
        ]).pipe(delay(1000));





      // Images
      case 'api/Images':
        let image1: MediaItem = new MediaItem(MediaType.Image); image1.name = 'Image 1'; image1.id = 'oiweoiuwer'; image1.url = '2f119b657c194b32a88b0f0051d525be.png';
        let image2: MediaItem = new MediaItem(MediaType.Image); image2.name = 'Image 2'; image2.id = 'qweuywesdo'; image2.url = '6c048ea442b646b59970f907a4d3ce61.jpg';
        let image3: MediaItem = new MediaItem(MediaType.Image); image3.name = 'Image 3'; image3.id = 'potyuoptuw'; image3.url = '0aada12f8b21471ea96aebe9a503977b.png';
        let image4: MediaItem = new MediaItem(MediaType.Image); image4.name = 'Image 4'; image4.id = 'potyuoptuw'; image4.url = '6e1659b63e5643e0a9039064b4a52e12.png';
        return of([image1, image2, image3, image4]).pipe(delay(1000));


      // Background Images
      case 'api/BackgroundImages':
        let backgroundImage1: MediaItem = new MediaItem(MediaType.BackgroundImage); backgroundImage1.name = 'Campland'; backgroundImage1.id = 'oiweoiuwer'; backgroundImage1.url = 'campland-background.jpg';
        let backgroundImage2: MediaItem = new MediaItem(MediaType.BackgroundImage); backgroundImage2.name = 'Background Image 2'; backgroundImage2.id = 'qweuywesdo'; backgroundImage2.url = 'a29f28773e154adaab48a6355f2f4e5d.png';
        let backgroundImage3: MediaItem = new MediaItem(MediaType.BackgroundImage); backgroundImage3.name = 'Background Image 3'; backgroundImage3.id = 'potyuoptuw'; backgroundImage3.url = 'cfb7358d797d484eab24bd2a57d2b850.png';
        return of([backgroundImage1, backgroundImage2, backgroundImage3]).pipe(delay(1000));

      // Banner Images
      case 'api/Carousel/Images':
        let bannerImage1: MediaItem = new MediaItem(MediaType.BannerImage); bannerImage1.name = 'Frozen'; bannerImage1.id = 'oiweoiuwer'; bannerImage1.url = 'frozen.jpg';
        let bannerImage2: MediaItem = new MediaItem(MediaType.BannerImage); bannerImage2.name = 'Banner Image 1'; bannerImage2.id = 'qweuywesdo'; bannerImage2.url = 'banner1.jpg';
        let bannerImage3: MediaItem = new MediaItem(MediaType.BannerImage); bannerImage3.name = 'Banner Image 2'; bannerImage3.id = 'potyuoptuw'; bannerImage3.url = 'banner2.jpg';
        let bannerImage4: MediaItem = new MediaItem(MediaType.BannerImage); bannerImage4.name = 'Banner Image 3'; bannerImage4.id = 'qweuywesdo'; bannerImage4.url = 'banner3.jpg';
        let bannerImage5: MediaItem = new MediaItem(MediaType.BannerImage); bannerImage5.name = 'Banner Image 4'; bannerImage5.id = 'potyuoptuw'; bannerImage5.url = 'banner4.jpg';
        let bannerImage6: MediaItem = new MediaItem(MediaType.BannerImage); bannerImage6.name = 'Banner Image 5'; bannerImage6.id = 'qweuywesdo'; bannerImage6.url = 'banner5.jpg';
        return of([bannerImage1, bannerImage2, bannerImage3, bannerImage4, bannerImage5, bannerImage6]).pipe(delay(1000));


      // Category Images
      case 'api/Categories/Images':
        let categoryImage1: MediaItem = new MediaItem(MediaType.CategoryImage); categoryImage1.name = 'Health & Fitness'; categoryImage1.id = 'oiweoiuwer'; categoryImage1.url = '44d71fbf43904ffdbdece40a45bdf9db.png';
        let categoryImage2: MediaItem = new MediaItem(MediaType.CategoryImage); categoryImage2.name = 'Brain Power'; categoryImage2.id = 'qweuywesdo'; categoryImage2.url = 'abc61d06435c4a29833a089271fe128a.png';
        let categoryImage3: MediaItem = new MediaItem(MediaType.CategoryImage); categoryImage3.name = 'Camping'; categoryImage3.id = 'potyuoptuw'; categoryImage3.url = 'ab0bda0d51a5408788359471b337662f.png';
        return of([categoryImage1, categoryImage2, categoryImage3]).pipe(delay(1000));

      // Product Images
      case 'api/Products/Images':
        let productImage1: MediaItem = new MediaItem(MediaType.ProductImage); productImage1.name = 'How to Seduce Out of Your League'; productImage1.id = 'oiweoiuwer'; productImage1.url = 'b4fa43f207d7420cbb2c72d0fe9c64ba.jpg';
        let productImage2: MediaItem = new MediaItem(MediaType.ProductImage); productImage2.name = 'The 21 Day Flat Belly Fix System'; productImage2.id = 'qweuywesdo'; productImage2.url = '899c7b6deb544dd28a7ec3055c5196a1.jpg';
        let productImage3: MediaItem = new MediaItem(MediaType.ProductImage); productImage3.name = 'Bigger Better Butt'; productImage3.id = 'potyuoptuw'; productImage3.url = 'b212b69728ee4f3b9473831bb4f7ace9.png';
        return of([productImage1, productImage2, productImage3]).pipe(delay(1000));

      // Icons
      case 'api/ProductContent/Images':
        let icon1: MediaItem = new MediaItem(MediaType.Icon); icon1.name = 'PDF'; icon1.id = 'oiweoiuwer'; icon1.url = 'pdf.png';
        let icon2: MediaItem = new MediaItem(MediaType.Icon); icon2.name = 'Audio'; icon2.id = 'qweuywesdo'; icon2.url = 'audio.png';
        let icon3: MediaItem = new MediaItem(MediaType.Icon); icon3.name = 'Video'; icon3.id = 'potyuoptuw'; icon3.url = 'video.png';
        let icon4: MediaItem = new MediaItem(MediaType.Icon); icon4.name = 'Software'; icon4.id = 'potyuoptuw'; icon4.url = 'software.png';
        return of([icon1, icon2, icon3, icon4]).pipe(delay(1000));

      // Videos
      case 'api/Videos':
        let video1: MediaItem = new MediaItem(MediaType.Video); video1.name = 'Video 1'; video1.id = 'oiweoiuwer'; video1.thumbnail = 'thumbnail1.png'; video1.url = '//player.vimeo.com/video/173192945?title=0&byline=0&portrait=0&color=ffffff';
        let video2: MediaItem = new MediaItem(MediaType.Video); video2.name = 'Video 2'; video2.id = 'qweuywesdo'; video2.thumbnail = 'thumbnail2.png'; video2.url = 'https://www.youtube.com/embed/1AI6RS1st2E';
        let video3: MediaItem = new MediaItem(MediaType.Video); video3.name = 'Video 3'; video3.id = 'potyuoptuw'; video3.thumbnail = 'thumbnail3.png'; video3.url = '//player.vimeo.com/video/179479722?title=0&byline=0&portrait=0&color=ffffff';
        let video4: MediaItem = new MediaItem(MediaType.Video); video4.name = 'Video 4'; video4.id = 'oiweoiuwer'; video4.thumbnail = 'thumbnail4.png'; video4.url = 'https://www.youtube.com/embed/3ZEu6ZOMhlw';
        let video5: MediaItem = new MediaItem(MediaType.Video); video5.name = 'Video 5'; video5.id = 'qweuywesdo'; video5.thumbnail = 'thumbnail5.png'; video5.url = 'https://player.vimeo.com/video/218732620';
        let video6: MediaItem = new MediaItem(MediaType.Video); video6.name = 'Video 6'; video6.id = 'potyuoptuw'; video6.thumbnail = 'thumbnail6.png'; video6.url = 'https://player.vimeo.com/video/264188894';
        return of([video1, video2, video3, video4, video5, video6]).pipe(delay(1000));







      // Images
      case 'api/Images/Search':
        let searchImage1: MediaItem = new MediaItem(MediaType.Image); searchImage1.name = 'Search Image 1'; searchImage1.id = 'oiweoiuwer'; searchImage1.url = '00cfd1973191425080201d9fcff5c305.png';
        let searchImage2: MediaItem = new MediaItem(MediaType.Image); searchImage2.name = 'Search Image 2'; searchImage2.id = 'qweuywesdo'; searchImage2.url = '00da7531db2f4b6dbd10c10a93278946.png';
        let searchImage3: MediaItem = new MediaItem(MediaType.Image); searchImage3.name = 'Search Image 3'; searchImage3.id = 'potyuoptuw'; searchImage3.url = '0a2b8633118d4719bddfe468521d8a39.png';
        let searchImage4: MediaItem = new MediaItem(MediaType.Image); searchImage4.name = 'Search Image 4'; searchImage4.id = 'potyuoptuw'; searchImage4.url = '0a89b15aee2945d3b3bf71a241e3bcaf.png';
        return of([searchImage1, searchImage2, searchImage3, searchImage4]).pipe(delay(1000));


      // Background Images
      case 'api/BackgroundImages/Search':
        let searchBackgroundImage1: MediaItem = new MediaItem(MediaType.BackgroundImage); searchBackgroundImage1.name = 'Search Background Image 1'; searchBackgroundImage1.id = 'oiweoiuwer'; searchBackgroundImage1.url = '0b935a68e3684bf1a9ec01beab0deea8.png';
        let searchBackgroundImage2: MediaItem = new MediaItem(MediaType.BackgroundImage); searchBackgroundImage2.name = 'Search Background Image 2'; searchBackgroundImage2.id = 'qweuywesdo'; searchBackgroundImage2.url = '0bbe439f6e9f4514b0154bc4a3c0ef37.png';
        let searchBackgroundImage3: MediaItem = new MediaItem(MediaType.BackgroundImage); searchBackgroundImage3.name = 'Search Background Image 3'; searchBackgroundImage3.id = 'potyuoptuw'; searchBackgroundImage3.url = '0bdb6669488944b9b8dd04d26d61bd09.png';
        return of([searchBackgroundImage1, searchBackgroundImage2, searchBackgroundImage3]).pipe(delay(1000));

      // Banner Images
      case 'api/Carousel/Images/Search':
        let searchBannerImage1: MediaItem = new MediaItem(MediaType.BannerImage); searchBannerImage1.name = 'Search Banner Image 1'; searchBannerImage1.id = 'oiweoiuwer'; searchBannerImage1.url = '0d9d6132467540bc99cb58a45976e40a.png';
        let searchBannerImage2: MediaItem = new MediaItem(MediaType.BannerImage); searchBannerImage2.name = 'Search Banner Image 2'; searchBannerImage2.id = 'qweuywesdo'; searchBannerImage2.url = '0e5bb073af354e01a03ec6d5254efb8d.png';
        let searchBannerImage3: MediaItem = new MediaItem(MediaType.BannerImage); searchBannerImage3.name = 'Search Banner Image 3'; searchBannerImage3.id = 'potyuoptuw'; searchBannerImage3.url = '0e535fb35dc54e519c1c56e2bf2ccd29.png';
        let searchBannerImage4: MediaItem = new MediaItem(MediaType.BannerImage); searchBannerImage4.name = 'Search Banner Image 4'; searchBannerImage4.id = 'qweuywesdo'; searchBannerImage4.url = '0f807d78672141d083919b1505537391.jpg';
        let searchBannerImage5: MediaItem = new MediaItem(MediaType.BannerImage); searchBannerImage5.name = 'Search Banner Image 5'; searchBannerImage5.id = 'potyuoptuw'; searchBannerImage5.url = '01b9dbfac8184f769fcc27038b2330ae.png';
        let searchBannerImage6: MediaItem = new MediaItem(MediaType.BannerImage); searchBannerImage6.name = 'Search Banner Image 6'; searchBannerImage6.id = 'qweuywesdo'; searchBannerImage6.url = '01d878d82ad6400e98a58d09212ef0cc.jpg';
        return of([searchBannerImage1, searchBannerImage2, searchBannerImage3, searchBannerImage4, searchBannerImage5, searchBannerImage6]).pipe(delay(1000));


      // Category Images
      case 'api/Categories/Images/Search':
        let searchCategoryImage1: MediaItem = new MediaItem(MediaType.CategoryImage); searchCategoryImage1.name = 'Search Category Image 1'; searchCategoryImage1.id = 'oiweoiuwer'; searchCategoryImage1.url = '01f0631f756349399dead6763a99e432.png';
        let searchCategoryImage2: MediaItem = new MediaItem(MediaType.CategoryImage); searchCategoryImage2.name = 'Search Category Image 2'; searchCategoryImage2.id = 'qweuywesdo'; searchCategoryImage2.url = '1a5c40cd25c54650ac4ca95faa3e1e35.png';
        let searchCategoryImage3: MediaItem = new MediaItem(MediaType.CategoryImage); searchCategoryImage3.name = 'Search Category Image 3'; searchCategoryImage3.id = 'potyuoptuw'; searchCategoryImage3.url = '1a56b295fdde4d11999116001431976f.png';
        return of([searchCategoryImage1, searchCategoryImage2, searchCategoryImage3]).pipe(delay(1000));

      // Product Images
      case 'api/Products/Images/Search':
        let searchProductImage1: MediaItem = new MediaItem(MediaType.ProductImage); searchProductImage1.name = 'Search Product Image 1'; searchProductImage1.id = 'oiweoiuwer'; searchProductImage1.url = '1a3567d86c7748a2985777e06817f989.jpg';
        let searchProductImage2: MediaItem = new MediaItem(MediaType.ProductImage); searchProductImage2.name = 'Search Product Image 2'; searchProductImage2.id = 'qweuywesdo'; searchProductImage2.url = '1a4209cfdcb74a5c93547b6b66db9edc.png';
        let searchProductImage3: MediaItem = new MediaItem(MediaType.ProductImage); searchProductImage3.name = 'Search Product Image 3'; searchProductImage3.id = 'potyuoptuw'; searchProductImage3.url = '1b47c07f752648fda4109aa62357cd47.png';
        return of([searchProductImage1, searchProductImage2, searchProductImage3]).pipe(delay(1000));

      // Icons
      case 'api/ProductContent/Images/Search':
        let searchIcon1: MediaItem = new MediaItem(MediaType.Icon); searchIcon1.name = 'Search Icon 1'; searchIcon1.id = 'oiweoiuwer'; searchIcon1.url = '1b3965404449489bbd02f47621550a66.png';
        let searchIcon2: MediaItem = new MediaItem(MediaType.Icon); searchIcon2.name = 'Search Icon 2'; searchIcon2.id = 'qweuywesdo'; searchIcon2.url = '1bb85272877b4b35a30ebec6a930b33b.png';
        let searchIcon3: MediaItem = new MediaItem(MediaType.Icon); searchIcon3.name = 'Search Icon 3'; searchIcon3.id = 'potyuoptuw'; searchIcon3.url = '1bd9299bc05545c1b24da0d8c6569bf2.png';
        let searchIcon4: MediaItem = new MediaItem(MediaType.Icon); searchIcon4.name = 'Search Icon 4'; searchIcon4.id = 'potyuoptuw'; searchIcon4.url = '1d50e7660516440d8673cbcdf486cbd0.png';
        return of([searchIcon1, searchIcon2, searchIcon3, searchIcon4]).pipe(delay(1000));

      // Videos
      case 'api/Videos/Search':
        let searchVideo1: MediaItem = new MediaItem(MediaType.Video); searchVideo1.name = 'Search Video 1'; searchVideo1.id = 'oiweoiuwer'; searchVideo1.thumbnail = '1d83a09d3ff948b5b56c665d820c8e0e.png'; searchVideo1.url = 'https://www.youtube.com/embed/x-3O1Six0lM';
        let searchVideo2: MediaItem = new MediaItem(MediaType.Video); searchVideo2.name = 'Search Video 2'; searchVideo2.id = 'qweuywesdo'; searchVideo2.thumbnail = '1e7f8a81d0754b94aa37b6270c3880d7.png'; searchVideo2.url = 'https://www.youtube.com/embed/1AI6RS1st2E';
        let searchVideo3: MediaItem = new MediaItem(MediaType.Video); searchVideo3.name = 'Search Video 3'; searchVideo3.id = 'potyuoptuw'; searchVideo3.thumbnail = '1e8eaac85778452ea8ea12851e6ec00c.png'; searchVideo3.url = '//player.vimeo.com/video/179479722?title=0&byline=0&portrait=0&color=ffffff';
        let searchVideo4: MediaItem = new MediaItem(MediaType.Video); searchVideo4.name = 'Search Video 4'; searchVideo4.id = 'oiweoiuwer'; searchVideo4.thumbnail = '1e25aa3d5dcf4cb4a9d15d3cf2a1078b.png'; searchVideo4.url = 'https://www.youtube.com/embed/3ZEu6ZOMhlw';
        let searchVideo5: MediaItem = new MediaItem(MediaType.Video); searchVideo5.name = 'Search Video 5'; searchVideo5.id = 'qweuywesdo'; searchVideo5.thumbnail = '1e83e80b1dbb4443a3b2c85023104caf.png'; searchVideo5.url = 'https://player.vimeo.com/video/218732620';
        let searchVideo6: MediaItem = new MediaItem(MediaType.Video); searchVideo6.name = 'Search Video 6'; searchVideo6.id = 'potyuoptuw'; searchVideo6.thumbnail = '1f0236db351b4535bec6a2701db9a8ea.png'; searchVideo6.url = 'https://player.vimeo.com/video/264188894';
        return of([searchVideo1, searchVideo2, searchVideo3, searchVideo4, searchVideo5, searchVideo6]).pipe(delay(1000));



      case 'api/Products/Vendor':
        return of([
          {
            id: 'HGSGDGFFAFSD',
            name: 'Flavor of the week: The Gumpy Way'
          },
          {
            id: 'REEQWRRE',
            name: 'The Autobiography of Gabey Gump'
          },
          {
            id: 'JHGFJGHJHJ',
            name: 'How To Be Successful Like the Gumpy\'s'
          },
          {
            id: 'QEQWREWERR',
            name: 'The Gumpy\'s'
          },
          {
            id: 'LKJHJKLJLK',
            name: 'Once a Gumpy, Always a Gumpy'
          }
        ]).pipe(delay(1000));



        case 'api/Pages/Links':
        return of([
          {
            name: 'Alita Page',
            link: 'http://www.alitamovie.com'
          },
          {
            name: 'Gumpy\'s Page',
            link: 'http://www.gumpys.com'
          },
          {
            name: 'Ice Cream Page',
            link: 'http://www.icecream.com'
          },
          {
            name: 'Chocolate Page',
            link: 'http://www.chocolate.com'
          },
          {
            name: 'Vanilla Page',
            link: 'http://www.vanilla.com'
          },
          {
            name: 'Strawberry Page',
            link: 'http://www.strawberry.com'
          },
          {
            name: 'Avatar Page',
            link: 'http://www.avatar.com'
          },
          {
            name: 'Star Wars Page',
            link: 'http://www.starwars.com'
          },
          {
            name: 'Titanic Page',
            link: 'http://www.titanic.com'
          },
          {
            name: 'Spellbind Page',
            link: 'http://www.spellbind.com'
          }
        ]).pipe(delay(1000));








        case 'api/Categories/Links':
        return of([
          {
            name: 'Alita Category',
            link: 'http://www.alitamovie.com'
          },
          {
            name: 'Gumpy\'s Category',
            link: 'http://www.gumpys.com'
          },
          {
            name: 'Ice Cream Category',
            link: 'http://www.icecream.com'
          },
          {
            name: 'Chocolate Category',
            link: 'http://www.chocolate.com'
          },
          {
            name: 'Vanilla Category',
            link: 'http://www.vanilla.com'
          },
          {
            name: 'Strawberry Category',
            link: 'http://www.strawberry.com'
          },
          {
            name: 'Avatar Category',
            link: 'http://www.avatar.com'
          },
          {
            name: 'Star Wars Category',
            link: 'http://www.starwars.com'
          },
          {
            name: 'Titanic Category',
            link: 'http://www.titanic.com'
          },
          {
            name: 'Spellbind Category',
            link: 'http://www.spellbind.com'
          }
        ]).pipe(delay(1000));







        case 'api/Niches/Links':
        return of([
          {
            name: 'Alita Niche',
            link: 'http://www.alitamovie.com'
          },
          {
            name: 'Gumpy\'s Niche',
            link: 'http://www.gumpys.com'
          },
          {
            name: 'Ice Cream Niche',
            link: 'http://www.icecream.com'
          },
          {
            name: 'Chocolate Niche',
            link: 'http://www.chocolate.com'
          },
          {
            name: 'Vanilla Niche',
            link: 'http://www.vanilla.com'
          },
          {
            name: 'Strawberry Niche',
            link: 'http://www.strawberry.com'
          },
          {
            name: 'Avatar Niche',
            link: 'http://www.avatar.com'
          },
          {
            name: 'Star Wars Niche',
            link: 'http://www.starwars.com'
          },
          {
            name: 'Titanic Niche',
            link: 'http://www.titanic.com'
          },
          {
            name: 'Spellbind Niche',
            link: 'http://www.spellbind.com'
          }
        ]).pipe(delay(1000));









        case 'api/Products/Links':
        return of([
          {
            name: 'Alita Product',
            link: 'http://www.alitamovie.com'
          },
          {
            name: 'Gumpy\'s Product',
            link: 'http://www.gumpys.com'
          },
          {
            name: 'Ice Cream Product',
            link: 'http://www.icecream.com'
          },
          {
            name: 'Chocolate Product',
            link: 'http://www.chocolate.com'
          },
          {
            name: 'Vanilla Product',
            link: 'http://www.vanilla.com'
          },
          {
            name: 'Strawberry Product',
            link: 'http://www.strawberry.com'
          },
          {
            name: 'Avatar Product',
            link: 'http://www.avatar.com'
          },
          {
            name: 'Star Wars Product',
            link: 'http://www.starwars.com'
          },
          {
            name: 'Titanic Product',
            link: 'http://www.titanic.com'
          },
          {
            name: 'Spellbind Product',
            link: 'http://www.spellbind.com'
          }
        ]).pipe(delay(1000));


    }
  }


  post(url: string, body: any): Observable<any> {

    // If the url is for an image
    if (url == 'api/Images' || url == 'api/BackgroundImages' || url == 'api/Carousel/Images' || url == 'api/Categories/Images' || url == 'api/Products/Images' || url == 'api/Products/Images' || url == 'api/ProductContent/Images') {
      return of({
        id: 'isdfioewioweioweri',
        url: body.name
      }).pipe(delay(1000));

      // If the url is for a video
    } else if (url == 'api/Videos') {
      return of({
        id: 'isdfioewioweioweri',
        url: body,
        thumbnail: '9da5043dd53a45efb472269b2d283dac.png'
      }).pipe(delay(1000));

      // For anything else
    } else {
      return of('4LSN6AR0F5').pipe(delay(1000));
    }
  }


  put(url: string, body: any): Observable<any> {

    if (url == 'api/Videos') {

      return of({
        url: body.url,
        thumbnail: 'bc9ce0cc860e422aa7c9cafaaf61fc8a.png'
      }).pipe(delay(1000));

    } else {

      return of({}).pipe(delay(1000));
    }
  }


  delete(url: string, params: any): Observable<any> {
    return of({}).pipe(delay(1000));
  }
}
