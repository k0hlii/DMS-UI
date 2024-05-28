import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
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
import { Developer } from '../../../types';

@Component({
  selector: 'app-edit-popup',
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
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent implements OnInit {
  developerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public developer: Developer

  ) {}

  ngOnInit(): void {
    this.developerForm = this.formBuilder.group({
      firstname: [this.developer.firstname],
      lastname: [this.developer.lastname],
      field: [this.developer.field],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.developerForm.valid) {
      const updatedDeveloper = {
        ...this.developer,
        firstname: this.developerForm.value.firstname,
        lastname: this.developerForm.value.lastname,
        field: this.developerForm.value.field,
      };
  
      this.dialogRef.close(updatedDeveloper);
    }
  }
}
