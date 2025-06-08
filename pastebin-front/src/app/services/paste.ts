import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PasteDto {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface CreatePasteDto {
  title: string;
  content: string;
}

export interface Page<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: any;
  size: number;
  sort: any;
  totalElements: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class PasteService {
  private apiUrl = 'https://pastebin.s2.bkopec.com/api/pastes';

  constructor(private http: HttpClient) { }

  createPaste(paste: CreatePasteDto): Observable<PasteDto> {
    return this.http.post<PasteDto>(this.apiUrl, paste);
  }

  getPaste(id: number): Observable<PasteDto> {
    return this.http.get<PasteDto>(`${this.apiUrl}/${id}`);
  }

  getRecentPastes(page: number = 0, size: number = 10, sort: string = 'createdAt,desc'): Observable<Page<PasteDto>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<Page<PasteDto>>(this.apiUrl, { params });
  }
}