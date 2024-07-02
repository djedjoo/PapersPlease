import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { LessonText } from './lessonText';

@Injectable({
  providedIn: 'root'
})
export class LessontextService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getLessonsText(): Observable<LessonText[]>{
    return this.http.get<LessonText[]>(`${this.apiServerUrl}/lessontext/all`);
  }

  public getLessontextById(lessontextId: number): Observable<LessonText>{
    return this.http.get<LessonText>(`${this.apiServerUrl}/lessontext/findId/${lessontextId}`);
  }

  public getLessontextByArgument(lessontextArgument: string): Observable<LessonText>{
    return this.http.get<LessonText>(`${this.apiServerUrl}/lessontext/findArgument/${lessontextArgument}`);
  }

  public addLessontext(lessontext: LessonText): Observable<LessonText>{
    return this.http.post<LessonText>(`${this.apiServerUrl}/lessontext/add`, lessontext);
  }

  public updateLessontext(lessontext: LessonText): Observable<LessonText>{
    return this.http.put<LessonText>(`${this.apiServerUrl}/lessontext/update`, lessontext)
  }

  public deleteLessontextById(lessontextId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/lessontext/deleteId/${lessontextId}`)
  }

  public deleteLessontextByArgument(lessontextArgument: string): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/lessontext/deleteArgument/${lessontextArgument}`)
  }
}
