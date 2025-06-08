import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PasteDto, PasteService } from '../../services/paste';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-paste-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paste-detail.html',
  styleUrl: './paste-detail.css'
})
export class PasteDetailComponent implements OnInit {
  paste = signal<PasteDto | null>(null);
  pasteLines = signal<string[]>([]);
  errorMessage = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private pasteService: PasteService
  ) {
    effect(() => {
      const content = this.paste()?.content;
      if (content !== undefined && content !== null) {
        this.pasteLines.set(content.split('\n'));
      } else {
        this.pasteLines.set([]);
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadPaste(Number(id));
      } else {
        this.errorMessage.set('Paste ID not provided in the URL.');
      }
    });
  }

  private loadPaste(id: number): void {
    this.errorMessage.set(null);
    this.paste.set(null);

    this.pasteService.getPaste(id).pipe(
      catchError(error => {
        if (error.status === 404) {
          this.errorMessage.set('Paste not found. The ID might be incorrect or the paste was removed.');
        } else {
          this.errorMessage.set('Failed to load paste. Please check your network connection or try again later.');
        }
        console.error('Error loading paste:', error);
        return of(null);
      })
    ).subscribe(
      (pasteData) => {
        this.paste.set(pasteData);
      }
    );
  }
}