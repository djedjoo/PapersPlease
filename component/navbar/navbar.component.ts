import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from 'src/app/model/user/user';
import { Department } from 'src/app/model/department/department';
import { UserService } from 'src/app/model/user/user.service';
import { DepartmentService } from 'src/app/model/department/department.service';
import { ApisService, UserInfo } from 'src/app/model/apis/apis.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{


  public departments!: Department[];
  public collapsed!: boolean;
  public loggedUser: User;
  public logged: boolean;
  public userInfo: UserInfo;


  constructor(private userService: UserService, private departmentService: DepartmentService, private readonly apisService: ApisService){}

  ngOnInit(): void {
      this.getLoggedUser()
      this.getDepartments();
      this.getGoogle();
      this.collapsed = true;
      if(localStorage.getItem('user'))
        this.logged = true;
      else
        this.logged = false;
      this.getLoggedUser();

  }

  public getDepartments(): void{
    this.departmentService.getDepartments().subscribe(
      (response: Department[]) =>{
        this.departments = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }

  public getLoggedUser() {
    if(localStorage.getItem('user')){
    this.userService.getUserByEmail(localStorage.getItem('user')).subscribe(
      (response: User) =>{
        this.loggedUser = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )}
  }

  public clear(): void{
    localStorage.clear();
  }

  public getGoogle(): void{ //try to remove it?
    this.apisService.setItem()
    this.apisService.userProfileSubject.subscribe(info =>{
      this.userInfo = info;
    })
  }
}
