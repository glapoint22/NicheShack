import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Save } from '../classes/save';
import { debounceTime } from 'rxjs/operators';
import { DataService } from 'services/data.service';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  private saveData = new Subject<Save>();

  constructor(private dataService: DataService) {
    this.saveData.pipe(
      debounceTime(1000),
    ).subscribe((save: Save) => {
      this.dataService.put(save.url, save.data).subscribe();
    });
  }

  save(save: Save) {
    this.saveData.next(save);
  }
}
