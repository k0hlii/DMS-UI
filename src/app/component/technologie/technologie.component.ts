import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Technologie } from '../../../types';
import { EditPopupProjectComponent } from '../edit-popup-project/edit-popup-project.component';
import { TechnologieService } from '../../services/technologie.service';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { EditPopupTechnologieComponent } from '../edit-popup-technologie/edit-popup-technologie.component';

@Component({
  selector: 'app-technologie',
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
  templateUrl: './technologie.component.html',
  styleUrl: './technologie.component.scss'
})
export class TechnologieComponent {

  constructor(
    private technologieService: TechnologieService,
    public dialog: MatDialog
  ) {}

  technologies: Technologie[] = [];

  displayedColumns: string[] = [
    'name',
    'description',
    'usage',
    'actions'
  ];

  dataSource: MatTableDataSource<Technologie> = new MatTableDataSource<Technologie>(this.technologies);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.fetchTechnologies();
    this.dataSource.paginator = this.paginator;
  }

  fetchTechnologies() {
    this.technologies = [];
    this.technologieService
      .getTechnologies()
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.technologies = response;

          this.dataSource = new MatTableDataSource<Technologie>(this.technologies);
        },
        error: (error) => {
          console.error('Error fetching technologies');
        },
      });
  }

  addTechnologie() {

    const dialogRef = this.dialog.open(EditPopupTechnologieComponent, {
      data: {
        name: '',
        description: '',
        Anwendungsbereich: '',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if (result) {
        this.technologieService
        .addTechnologie(result)
        .subscribe({
          next: (response: any) => {
            console.log(response);
            this.fetchTechnologies();
          },
          error: (error) => {
            console.error('Error adding technologie');
          },
        });
      }
    });
  }

  deleteTechnologie(id: any) {
    this.technologieService
      .deleteTechnologie(
        id
      )
      .subscribe({
        next: (response: any) => {
          this.fetchTechnologies();
        },
        error: (error) => {
          console.error('Error deleting technologie'+ error);
        },
      });
  }

  editTechnologie(tech: Technologie): void {
    const dialogRef = this.dialog.open(EditPopupTechnologieComponent, {
      data: tech,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if (result) {
        tech = result;
        console.log(tech);
        console.log(tech.idAsString);

        this.technologieService.updateTechnologie(tech.idAsString, tech).subscribe({
          next: (response: any) => {
            console.log(response);
            this.fetchTechnologies();
          },
          error: (error) => {
            console.error('Error updating technologie: '+ error.message);
          },
        });
      }
    });
  }
}