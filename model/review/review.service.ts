import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getReviews(): Observable<Review[]>{
    return this.http.get<Review[]>(`${this.apiServerUrl}/review/all`)
  }

  public getReviewById(reviewId: number): Observable<Review>{
    return this.http.get<Review>(`${this.apiServerUrl}/review/findId/${reviewId}`)
  }

  public getReviewByTitle(reviewTitle: string): Observable<Review>{
    return this.http.get<Review>(`${this.apiServerUrl}/review/findTitle/${reviewTitle}`)
  }

  public addReview(review: Review): Observable<Review>{
    return this.http.post<Review>(`${this.apiServerUrl}/review/add`, review)
  }

  public update(review: Review): Observable<Review>{
    return this.http.put<Review>(`${this.apiServerUrl}/review/update`, review)
  }

  public deleteReviewById(reviewId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/review/deleteId/${reviewId}`)
  }

  public deleteReviewByTitle(reviewTitle: string): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/review/deleteTitle/${reviewTitle}`)
  }
}
