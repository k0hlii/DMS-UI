import { Component, Inject, OnInit } from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Technologie } from '../../../types';

@Component({
  selector: 'app-edit-popup-technologie',
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
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup-technologie.component.html',
  styleUrl: './edit-popup-technologie.component.scss',
})
export class EditPopupTechnologieComponent implements OnInit {
  technologieForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditPopupTechnologieComponent>,
    @Inject(MAT_DIALOG_DATA) public technologie: Technologie
  ) {}

  ngOnInit(): void {
    this.technologieForm = this.formBuilder.group({
      name: [this.technologie.name, Validators.required],
      description: [this.technologie.description, Validators.required],
      usage: [
        this.technologie.usage,
        Validators.required,
      ],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.technologieForm.valid) {
      const updatedTechnologie = {
        ...this.technologie,
        name: this.technologieForm.value.name,
        description: this.technologieForm.value.description,
        usage: this.technologieForm.value.usage,
      };

      this.dialogRef.close(updatedTechnologie);
    }
  }
}
