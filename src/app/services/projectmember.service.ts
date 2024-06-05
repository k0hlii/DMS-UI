import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectMember } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ProjectMemberService {

  constructor(private http: HttpClient) { }

  getProjectMembers(url: string): Observable<ProjectMember[]> {
    return this.http.get<ProjectMember[]>(url);
  }

  addProjectMember(url: string, projectMember: ProjectMember): Observable<ProjectMember> {
    return this.http.post<ProjectMember>(url, projectMember);
  }

  deleteProjectMember(url: string): Observable<any> {
    return this.http.delete<any>(url);
  }

  updateProjectMember(url: string, projectMember: ProjectMember): Observable<ProjectMember> {
    return this.http.put<ProjectMember>(url, projectMember);
  }
}