import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' //import this
import { Observable } from 'rxjs'; //important one

import { User } from './user';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root' //either do this or export in the "providers" in app.module.ts
})
export class UserService { //the class cooperating with the backend app, in this specific instance to handle the users

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  }

  public getUserById(userId: number): Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/user/findId/${userId}`);
  }

  public getUserByEmail(userEmail: string): Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/user/findEmail/${userEmail}`);
  }

  public addUsers(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiServerUrl}/user/add`, user);
  }

  public updateUsers(user: User): Observable<User>{
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, user);
  }

  public deleteUserById(userId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/user/deleteId/${userId}`);
  }

  public deleteUserByEmail(userEmail: string): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/user/deleteEmail/${userEmail}`);
  }
}
