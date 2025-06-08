import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasteService } from '../../services/paste';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-create-paste',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-paste.html',
  styleUrl: './create-paste.css' 
})
export class CreatePasteComponent {
  pasteForm: FormGroup;
  creationMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private pasteService: PasteService,
    private router: Router
  ) {
    this.pasteForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      content: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.creationMessage = null;
    this.errorMessage = null;

    if (this.pasteForm.valid) {
      this.pasteService.createPaste(this.pasteForm.value).pipe(
        catchError(error => {
          this.errorMessage = 'Failed to create paste. Please ensure the backend is running and try again.';
          console.error('Error creating paste:', error);
          return throwError(() => new Error(this.errorMessage!));
        })
      ).subscribe(
        (newPaste) => {
          this.creationMessage = `Paste created successfully! Redirecting to paste ID: ${newPaste.id}`;
          this.router.navigate(['/paste', newPaste.id]);
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.pasteForm.markAllAsTouched();
    }
  }
}