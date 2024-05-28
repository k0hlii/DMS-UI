import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Technologie } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class TechnologieService {

  url = 'http://localhost:5285/api/Technologie/';

  constructor(private apiService: ApiService) {}
  getTechnologies = (): Observable<Technologie> =>
    this.apiService.get(this.url, { responseType: 'json' });

  addTechnologie = (body: any): Observable<any> =>
    this.apiService.post(this.url, body, { responseType: 'json' });

  updateTechnologie = (id: string | undefined, body: any): Observable<any> =>
    this.apiService.put(this.url + id, body, { responseType: 'json' });

  deleteTechnologie = (id: string): Observable<any> =>
    this.apiService.delete(this.url + id, { responseType: 'json' });
}
