import { Injectable } from '@angular/core';
import { DataService } from 'services/data.service';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  constructor(private dataService: DataService) { }
  public subgroups: Array<QueryList> = [];


  public categories: Array<QueryList> = [
    {
      id: 1, name: "Health & Fitness", niches: [{ id: 1, name: "Diets & Weight Loss" },
      { id: 2, name: "Exercise & Fitness" },
      { id: 3, name: "Remedies" },
      { id: 4, name: "Miscellaneous" },
      { id: 5, name: "Nutrition" },
      { id: 6, name: "Beauty" },
      { id: 7, name: "Dietary Supplements" },
      { id: 8, name: "Meditation & Yoga" },
      { id: 9, name: "Sleep & Dreams" },
      { id: 10, name: "Mental Health" },
      { id: 11, name: "Addiction" }]
    },

    {
      id: 2, name: "Self-Help", niches: [{ id: 12, name: "Dating & Relationships" },
      { id: 13, name: "Motivational" },
      { id: 14, name: "Survival" },
      { id: 15, name: "Success" },
      { id: 16, name: "Self-Esteem" },
      { id: 17, name: "Stress Management" },
      { id: 18, name: "Self Defense" }]
    },

    {
      id: 3, name: "E-business & E-marketing", niches: [{ id: 19, name: "Ecommerce" },
      { id: 20, name: "Marketing" }]
    },

    { id: 10, name: "Alita", niches: [{ id: 27, name: "Battle" }] }
  ];


  getSubgroups() {
    this.dataService.get('api/Subgroups')
      .subscribe((subgroups) => {
        this.subgroups = subgroups;
      });
  }
}


export interface QueryList {
  id: number;
  name: string;
  niches?: Array<QueryList>;
}