import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Project } from '../../../types';


@Component({
  selector: 'app-edit-popup-project',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule
  ],
  templateUrl: './edit-popup-project.component.html',
  styleUrl: './edit-popup-project.component.scss'
})
export class EditPopupProjectComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditPopupProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public project: Project
  ) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      name: [this.project.name, Validators.required],
      start: [this.project.start, Validators.required],
      end: [this.project.end, Validators.required],
      status: [this.project.status, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.projectForm.valid) {
      const updatedProject = {
        ...this.project,
        name: this.projectForm.value.name,
        start: this.projectForm.value.start,
        end: this.projectForm.value.end,
        status: this.projectForm.value.status,
      };
  
      this.dialogRef.close(updatedProject);
    }
  }
}