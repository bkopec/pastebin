import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Page, PasteDto, PasteService } from '../../services/paste';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-recent-pastes',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './recent-pastes.html',
  styleUrl: './recent-pastes.css' // Using .css
})
export class RecentPastesComponent implements OnInit {
  recentPastesPage = signal<Page<PasteDto> | null>(null);
  currentPage = signal(0);
  pageSize = signal(10);
  errorMessage = signal<string | null>(null);

  // TrackBy function for *ngFor optimization
  trackById(index: number, item: PasteDto): number {
    return item.id;
  }

  constructor(private pasteService: PasteService) { }

  ngOnInit(): void {
    this.loadRecentPastes();
  }

  loadRecentPastes(): void {
    this.errorMessage.set(null); // Clear previous errors
    this.recentPastesPage.set(null); // Clear previous data

    this.pasteService.getRecentPastes(this.currentPage(), this.pageSize()).pipe(
      catchError(error => {
        this.errorMessage.set('Failed to load recent pastes. Please check the backend or network.');
        console.error('Error loading recent pastes:', error);
        return of(null); // Return observable of null to stop the chain
      })
    ).subscribe(
      (pageData) => {
        if (pageData) {
          this.recentPastesPage.set(pageData);
        }
      }
    );
  }

  goToPage(page: number): void {
    if (page >= 0 && page < (this.recentPastesPage()?.totalPages || 0)) {
      this.currentPage.set(page);
      this.loadRecentPastes();
    }
  }

  nextPage(): void {
    const totalPages = this.recentPastesPage()?.totalPages || 0;
    if (this.currentPage() < totalPages - 1) {
      this.currentPage.update(p => p + 1);
      this.loadRecentPastes();
    }
  }

  prevPage(): void {
    if (this.currentPage() > 0) {
      this.currentPage.update(p => p - 1);
      this.loadRecentPastes();
    }
  }

  // Helper to generate an array of page numbers for pagination controls
  getPageNumbers(): number[] {
    const totalPages = this.recentPastesPage()?.totalPages || 0;
    if (totalPages === 0) return [];

    const pages: number[] = [];
    const maxPagesToShow = 5; // Adjust as needed
    let startPage = Math.max(0, this.currentPage() - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
}