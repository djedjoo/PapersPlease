import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Photo } from './photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPhotos(): Observable<Photo[]>{
    return this.http.get<Photo[]>(`${this.apiServerUrl}/photo/all`);
  }

  public getPhotoById(photoId: number): Observable<Photo>{
    return this.http.get<Photo>(`${this.apiServerUrl}/photo/findId/${photoId}`);
  }

  public getPhotoByArgument(photoArgument: string): Observable<Photo>{
    return this.http.get<Photo>(`${this.apiServerUrl}/photo/findArgument/${photoArgument}`);
  }

  public addPhoto(photo: Photo): Observable<Photo>{
    return this.http.post<Photo>(`${this.apiServerUrl}/photo/add`, photo);
  }

  public update(photo: Photo): Observable<Photo>{
    return this.http.put<Photo>(`${this.apiServerUrl}/photo/update`, photo);
  }

  public deletePhotoBtId(photoId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/photo/deleteId/${photoId}`);
  }

  public deletePhotoBtArgument(photoArgument: string): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/photo/deleteArgument/${photoArgument}`);
  }
}
