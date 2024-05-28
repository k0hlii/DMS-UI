import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Developer } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {

  constructor(private apiService: ApiService) {}
  getDeveloper = (url: string): Observable<Developer> =>
    this.apiService.get(url, { responseType: 'json' });

  addDeveloper = (url: string, body: any): Observable<any> =>
    this.apiService.post(url, body, { responseType: 'json' });

  updateDeveloper = (url: string, body: any): Observable<any> =>
    this.apiService.put(url, body, { responseType: 'json' });

  deleteDeveloper = (url: string, ): Observable<any> =>
    this.apiService.delete(url, { responseType: 'json' });

}
