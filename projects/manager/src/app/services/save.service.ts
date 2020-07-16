import { Injectable } from '@angular/core';
import { TempDataService } from './temp-data.service';
import { Subject } from 'rxjs';
import { Save } from '../classes/save';
import { debounceTime, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  private saveData = new Subject<Save>();

  constructor(private dataService: TempDataService) {
    this.saveData.pipe(
      debounceTime(1000),
      switchMap((save: Save) => {
        return this.dataService.put(save.url, save.data);
      })).subscribe();
  }

  save(save: Save) {
    this.saveData.next(save);
  }
}
