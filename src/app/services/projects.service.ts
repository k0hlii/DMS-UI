import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Project } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private apiService: ApiService) {}
  getProjects = (url: string): Observable<Project> =>
    this.apiService.get(url, { responseType: 'json' });

  addProject = (url: string, body: any): Observable<any> =>
    this.apiService.post(url, body, { responseType: 'json' });

  updateProject = (url: string, body: any): Observable<any> =>
    this.apiService.put(url, body, { responseType: 'json' });

  deleteProject = (url: string, ): Observable<any> =>
    this.apiService.delete(url, { responseType: 'json' });

}
