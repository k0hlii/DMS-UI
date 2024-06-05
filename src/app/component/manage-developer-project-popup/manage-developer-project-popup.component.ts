import { Component, Inject } from '@angular/core';
import { Developer, Project } from '../../../types';
import { ProjectsService } from '../../services/projects.service';
import { DeveloperService } from '../../services/developer.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-manage-developer-project-popup',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './manage-developer-project-popup.component.html',
  styleUrl: './manage-developer-project-popup.component.scss',
})
export class ManageDeveloperProjectPopupComponent {
  constructor(
    private projectsService: ProjectsService,
    private develolperService: DeveloperService,
    @Inject(MAT_DIALOG_DATA) public project: Project,
    public dialogRef: MatDialogRef<ManageDeveloperProjectPopupComponent>,
  ) {}

  projectMembers: Developer[] = [];
  devs: Developer[] = [];

  dataSource: MatTableDataSource<Developer> = new MatTableDataSource<Developer>(this.devs);

  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'field',
    'actions',
  ];

  ngAfterViewInit() {
    // this.fetchDevelopersForProject();
    this.fetchDeveloper();
  }

  fetchDeveloper() {
    this.devs = [];
    this.develolperService
      .getDeveloper('http://localhost:5285/api/developer')
      .subscribe({
        next: (response: any) => {
          this.fetchDevelopersForProject();
          this.devs = response;
          this.dataSource = new MatTableDataSource<Developer>(this.devs);
        },
        error: (error) => {
          console.error('Error fetching devs');
        },
      });
  }

  fetchDevelopersForProject() {
    this.projectMembers = [];

    if (this.project.idAsString) {
      this.projectsService
        .getDevelopersForProject(this.project.idAsString)
        .subscribe({
          next: (response: any) => {                      
            this.projectMembers = response;
            this.dataSource = new MatTableDataSource<Developer>(this.devs);
          },
          error: (error) => {
            console.error('Error fetching developers for project');
          },
        });
    }
  }

  addDeveloperToProject(developer: string) {
    // console.log(developer.idAsString);
    if (this.project.idAsString && developer) {
      this.projectsService
        .addDeveloperToProject(this.project.idAsString, developer)
        .subscribe({
          next: (response: any) => {
            this.fetchDevelopersForProject();
            this.fetchDeveloper();
          },
          error: (error) => {
            console.error('Error adding developer to project');
          },
        });
    }
  }

  removeDeveloperFromProject(developer: Developer) {
    this.projectsService
      .removeDeveloperFromProject(developer.idAsString, this.project.idAsString)
      .subscribe({
        next: (response: any) => {
          this.fetchDevelopersForProject();
          this.fetchDeveloper();
        },
        error: (error) => {
          console.error( error);
        },
      });
  
  }

  isDeveloperInProject(developer: Developer): boolean {
    return this.projectMembers.some(pm => pm.idAsString === developer.idAsString);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
