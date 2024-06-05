import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, flatMap, forkJoin, mergeMap, of, switchMap } from 'rxjs';
import { Developer, Project, ProjectMember } from '../../types';
import { ProjectMemberService } from './projectmember.service';
import { DeveloperService } from './developer.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private apiService: ApiService,
    private projectMemberService: ProjectMemberService,
    private developerService: DeveloperService
  ) {}

  getProjects = (url: string): Observable<Project> =>
    this.apiService.get(url, { responseType: 'json' });

  addProject = (url: string, body: any): Observable<any> =>
    this.apiService.post(url, body, { responseType: 'json' });

  updateProject = (url: string, body: any): Observable<any> =>
    this.apiService.put(url, body, { responseType: 'json' });

  deleteProject = (url: string, ): Observable<any> =>
    this.apiService.delete(url, { responseType: 'json' });

  getDevelopersForProject(projectId: string): Observable<Developer[]> {
    return this.projectMemberService.getProjectMembers(`http://localhost:5285/api/ProjectMember/`).pipe(
        mergeMap((projectMembers: ProjectMember[]) => {
            const developerRequests: Observable<Developer>[] = [];
            projectMembers.forEach(pm => {
                if (pm.projectID === projectId) {
                    developerRequests.push(this.developerService.getDeveloper(`http://localhost:5285/api/developer/${pm.developerID}`));
                }
            });
            return forkJoin(developerRequests);
        })
    );
}

  addDeveloperToProject(projectId: string, developerId: string): Observable<ProjectMember | null> {
    return this.projectMemberService.getProjectMembers(`http://localhost:5285/api/ProjectMember/`).pipe(
      mergeMap((projectMembers: ProjectMember[]) => {
        const isAlreadyMember = projectMembers.some(pm => pm.projectID === projectId && pm.developerID === developerId);

        if (isAlreadyMember) {
          return of(null);
        } else {
          const projectMember: ProjectMember = {
            projectID: projectId, developerID: developerId,
          };
          return this.projectMemberService.addProjectMember(`http://localhost:5285/api/ProjectMember/`, projectMember);
        }
      })
    );
  }
  
  removeDeveloperFromProject(developerID: string | undefined, projectID: string | undefined): Observable<any> {
    return this.projectMemberService.getProjectMembers(`http://localhost:5285/api/ProjectMember/`).pipe(
      mergeMap((projectMembers: ProjectMember[]) => {
        const projectMember = projectMembers.find(pm => pm.developerID === developerID && pm.projectID === projectID);
        if (projectMember) {
          return this.projectMemberService.deleteProjectMember(`http://localhost:5285/api/ProjectMember/${projectMember.idAsString}`);
        } else {
          return of(null);
        }
      })
    );
  }
}
