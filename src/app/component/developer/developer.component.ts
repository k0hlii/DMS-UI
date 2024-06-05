import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Developer } from '../../../types';
import { DeveloperService } from '../../services/developer.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-developer',
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
    EditPopupComponent
  ],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.scss',
})
export class DeveloperComponent implements AfterViewInit {

  constructor(
    private develolperService: DeveloperService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  devs: Developer[] = [];

  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'field',
    'actions',
  ];

  dataSource: MatTableDataSource<Developer> = new MatTableDataSource<Developer>(this.devs);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.fetchDeveloper();
    this.dataSource.paginator = this.paginator;
  }

  developerForm = this.formBuilder.group({
    firstname: ['', [Validators.required]],
    lastname: [''],
    field: ['', [Validators.required]],
  });



  fetchDeveloper() {
    this.devs = [];
    this.develolperService
      .getDeveloper('http://localhost:5285/api/developer')
      .subscribe({
        next: (response: any) => {
          console.log(response);

          this.devs = response;

          this.dataSource = new MatTableDataSource<Developer>(this.devs);
        },
        error: (error) => {
          console.error('Error fetching products');
        },
      });
  }

  addDeveloper() {
    const dialogRef = this.dialog.open(EditPopupComponent, {
      data: {
        firstname: '',
        lastname: '',
        field: '',
        ContactID: '',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if (result) {

        this.develolperService
        .addDeveloper('http://localhost:5285/api/developer', result)
        .subscribe({
          next: (response: any) => {
            console.log(response);
            this.fetchDeveloper();
          },
          error: (error) => {
            console.error('Error adding developer');
          },
        });
      }
    });
  }

  deleteDeveloper(id: any) {
    this.develolperService
      .deleteDeveloper(
        `http://localhost:5285/api/developer/${id}`
      )
      .subscribe({
        next: (response: any) => {
          this.fetchDeveloper();
        },
        error: (error) => {
          console.error('Error deleting developer'+ error);
        },
      });
  }

  editDeveloper(dev: Developer): void {
    const dialogRef = this.dialog.open(EditPopupComponent, {
      data: dev,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if (result) {
        dev = result;
        console.log(dev);
        console.log(dev.idAsString);

        this.develolperService.updateDeveloper(`http://localhost:5285/api/developer/${dev.idAsString}`, dev).subscribe({
          next: (response: any) => {
            console.log(response);
            this.fetchDeveloper();
          },
          error: (error) => {
            console.error('Error updating developer: '+ error.message);
          },
        });
      }
    });
  }
}
