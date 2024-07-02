import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Department } from './department';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getDepartments(): Observable<Department[]>{
    return this.http.get<Department[]>(`${this.apiServerUrl}/department/all`);
  }

  public getDepartmentById(departmentId: number): Observable<Department>{
    return this.http.get<Department>(`${this.apiServerUrl}/department/findId/${departmentId}`);
  }

  public getDepartmentByName(departmentName: string): Observable<Department>{
    return this.http.get<Department>(`${this.apiServerUrl}/department/findName/${departmentName}`);
  }

  public addDepartment(department: Department): Observable<Department>{
    return this.http.post<Department>(`${this.apiServerUrl}/department/add`, department);
  }

  public updateDepartment(department: Department): Observable<Department>{
    return this.http.put<Department>(`${this.apiServerUrl}/department/update`, department);
  }

  public deleteDepartmentById(departmentId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/department/deleteId/${departmentId}`);
  }

  public deleteDepartmentByName(departmentName: string): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/department/deleteName/${departmentName}`);
  }
}
