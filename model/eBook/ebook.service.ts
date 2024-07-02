import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EBook } from './eBook';

@Injectable({
  providedIn: 'root'
})
export class EbookService {

  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  public getEbooks(): Observable<EBook[]>{
    return this.http.get<EBook[]>(`${this.apiServerUrl}/ebook/all`)
  }

  public getEbookById(eBookId: number): Observable<EBook>{
    return this.http.get<EBook>(`${this.apiServerUrl}/ebook/findId/${eBookId}`)
  }

  public getEbookByTitle(eBookTitle: string){
    return this.http.get<EBook>(`${this.apiServerUrl}/ebook/findTitle/${eBookTitle}`)
  }

  public addEbook(ebook: EBook): Observable<EBook>{
    return this.http.post<EBook>(`${this.apiServerUrl}/ebook/add`, ebook)
  }

  public updateEbook(ebook: EBook): Observable<EBook>{
    return this.http.put<EBook>(`${this.apiServerUrl}/ebook/update`, ebook)
  }

  public deleteEbookById(eBookId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/ebook/deleteId/${eBookId}`)
  }

  public deleteEbookByTitle(eBookTitle: string): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/ebook/deleteTitle/${eBookTitle}`)
  }
}
