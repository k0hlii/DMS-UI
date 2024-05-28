import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../../../types';
import { ProjectsService } from '../../services/projects.service';
import { EditPopupProjectComponent } from '../edit-popup-project/edit-popup-project.component';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatLabel,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    EditPopupProjectComponent
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  constructor(
    private projectsService: ProjectsService,
    public dialog: MatDialog
  ) {}

  devs: Project[] = [];

  displayedColumns: string[] = [
    'name',
    'start',
    'end',
    'status',
    'actions'
  ];

  dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>(this.devs);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.fetchProjects();
    this.dataSource.paginator = this.paginator;
  }

  fetchProjects() {
    this.devs = [];
    this.projectsService
      .getProjects('http://localhost:5285/api/Project')
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.devs = response;

          this.dataSource = new MatTableDataSource<Project>(this.devs);
        },
        error: (error) => {
          console.error('Error fetching products');
        },
      });
  }

  addProject() {

    const dialogRef = this.dialog.open(EditPopupProjectComponent, {
      data: {
        name: '',
        start: new Date(),
        end: new Date(),
        status: '',
        ProjektmitarbeiterID: '',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if (result) {
        this.projectsService
        .addProject('http://localhost:5285/api/Project', result)
        .subscribe({
          next: (response: any) => {
            console.log(response);
            this.fetchProjects();
          },
          error: (error) => {
            console.error('Error adding developer');
          },
        });
      }
    });
  }

  deleteProject(id: any) {
    this.projectsService
      .deleteProject(
        `http://localhost:5285/api/Project/${id}`
      )
      .subscribe({
        next: (response: any) => {
          this.fetchProjects();
        },
        error: (error) => {
          console.error('Error deleting developer'+ error);
        },
      });
  }

  editProject(dev: Project): void {
    const dialogRef = this.dialog.open(EditPopupProjectComponent, {
      data: dev,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if (result) {
        dev = result;
        console.log(dev);
        console.log(dev.idAsString);

        this.projectsService.updateProject(`http://localhost:5285/api/Project/${dev.idAsString}`, dev).subscribe({
          next: (response: any) => {
            console.log(response);
            this.fetchProjects();
          },
          error: (error) => {
            console.error('Error updating developer: '+ error.message);
          },
        });
      }
    });
  }
}