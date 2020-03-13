import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public showMenu: boolean = false;
  public menus: any[];
  private menuID: number;
  private subMenuID: number;
  private parentMenuID: number;
  constructor() {}

  buildMenu(left: number, top: number, width: number, ...menuContent: any) {

    this.showMenu = true;

    this.menus = [];
    this.menuID = 0;
    this.subMenuID = 0;

    // console.log("menu " + this.menuID);

    this.menus.push({left: left, top: top, width: width, content: []});

    for(let i in menuContent) {
      if(menuContent[i].type == "divider") this.menus[0].content.push({type: menuContent[i].type});

      if(menuContent[i].type == "sub menu") {
        this.parentMenuID = this.menuID;
        this.subMenuID++;
        this.menus[0].content.push({type: menuContent[i].type, name: menuContent[i].name, subMenuID: this.subMenuID});
      }

      if(menuContent[i].type == "option") this.menus[0].content.push({type: menuContent[i].type, name: menuContent[i].name, shortcutKeys: menuContent[i].shortcutKeys});
      





      // if(menuContent[i].type == "sub menu") {
      //   this.subMenuID++;
      //   console.log(menuContent[i].type + ", " + menuContent[i].name  + ", subMenuID: " + this.subMenuID)
      // }else {
      //   console.log(menuContent[i].type + ", " + menuContent[i].name)
      // }
      
    }

    

    this.loop(menuContent);

    console.log(this.menus)
  }



  loop(content) {
    for(let i in content) {
      
      

      

      if(content[i].type == "sub menu") {
        this.menuID++;


       

        // console.log("menu " + this.menuID);
        this.menus.push({left: this.parentMenuID, top: 100, width: 100, content: []});


        for(let j in content[i].options) {



          if(content[i].options[j].type == "divider") this.menus[this.menus.length-1].content.push({type: content[i].options[j].type});

          if(content[i].options[j].type == "sub menu") {
            this.parentMenuID = this.menuID;
            this.subMenuID++;
            this.menus[this.menus.length-1].content.push({type: content[i].options[j].type, name: content[i].options[j].name, subMenuID: this.subMenuID});
          }

          if(content[i].options[j].type == "option") this.menus[this.menus.length-1].content.push({type: content[i].options[j].type, name: content[i].options[j].name, shortcutKeys: content[i].options[j].shortcutKeys});



          



          // if(content[i].options[j].type == "sub menu") {
          //   this.subMenuID++;
          //   console.log(content[i].options[j].type + ", " + content[i].options[j].name + ", subMenuID: " + this.subMenuID)
          // }else {
          //   console.log(content[i].options[j].type + ", " + content[i].options[j].name)
          // }
          
          
        }

        
        this.loop(content[i].options)
      }
    }
  }
}