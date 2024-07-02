import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService, UserInfo } from 'src/app/model/apis/apis.service';
import { Department } from 'src/app/model/department/department';
import { DepartmentService } from 'src/app/model/department/department.service';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/model/user/user.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit{

  public users: User[];
  public departments: Department[];
  public userId: number = 0;
  public exist: boolean = false;

  constructor(private userService: UserService, private departmentService: DepartmentService, private router: Router, private readonly apisService: ApisService){}

  ngOnInit(): void {
    this.getDepartments()
    this.setUserId()
    this.googleCheck();
  }

  public setUserId(){
    this.userService.getUsers().subscribe(
      (response: User[]) =>{
        for(let user of response)
          if(user.id > this.userId)
            this.userId = user.id
        this.userId++
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public getDepartments(){
    this.departmentService.getDepartments().subscribe(
      (response: Department[]) =>{
        this.departments = response
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public signUpUser(emailString: string, passwordString:string, nameString:string, surnameString:string, genderString:string){
    let img: string;
    if(genderString == "Maschio")
      img = "../../../assets/images/uomoIcon.jpg";
    else if(genderString == "Femmina")
      img = "../../../assets/images/donnaIcon.jpg";
    else
      img = "../../../assets/images/genericUserIcon.png";
    let user: User;
    let department = <HTMLSelectElement>document.getElementById("departmentSelect")
    let departmentString: string = department.value
    user = {
      id: this.userId,
      email: emailString,
      password: passwordString,
      name: nameString,
      surname: surnameString,
      course: departmentString,
      gender: genderString,
      imageUrl: img,
      role: "0",
      lessons: [],
      photos: [],
      ebooks: [],
      favourites: []
    }
    this.exist = false;
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.verifyExist(response, emailString);
        this.checkBooleans(user);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public verifyExist(users: User[], emailString: string){
    for(let user of users)
      if(user.email == emailString)
        this.exist = true;
  }

  public checkBooleans(user: User){
    if(this.exist){
      let existingEmail : any = document.getElementById("existingEmail");
      existingEmail.style.visibility = "visible";
    }
    else{
      this.userService.addUsers(user).subscribe(
        (response: User) =>{
          let existingEmail : any = document.getElementById("existingEmail");
          existingEmail.style.visibility = "hidden";

          this.setUserId()
          localStorage.setItem('user', response.email)
          this.router.navigateByUrl('').then(() =>{
            window.location.reload()
          })
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
  }

  public googleSignUp(): void{
    localStorage.setItem('googleSignUp', "yes")
    this.apisService.googleLogin();
  }

  public googleCheck(){
    if(localStorage.getItem('googleSignUp')){
      let userInfo: UserInfo;
      this.apisService.userProfileSubject.subscribe(info =>{
        userInfo = info;
        let check: boolean = true;
        this.userService.getUsers().subscribe(
          (response: User[]) =>{
            this.users = response;
            for(let user of this.users)
              if(user.email == userInfo.info.email){
                check = false;
                this.userId = user.id;
              }
            if(check){
              let user: User;
              user = {
                id: this.userId,
                email: userInfo.info.email,
                password: "nopassword",
                name: userInfo.info.given_name,
                surname: userInfo.info.family_name,
                course: "Nessuno",
                gender: "Nessuno",
                imageUrl: "../../../assets/images/genericUserIcon.png",
                role: "0",
                lessons: [],
                photos: [],
                ebooks: [],
                favourites: []
              }
              this.userService.addUsers(user).subscribe(
                (response: User) => {
                  this.setUserId()
                  localStorage.setItem('user', response.email);
                  localStorage.removeItem('googleSignUp')
                  this.router.navigateByUrl('').then(() =>{
                    window.location.reload()
                  });
                },
                (error: HttpErrorResponse) => {
                  alert(error.message);
                }
              )
            }
            else{
              this.setUserId()
              localStorage.setItem('user', userInfo.info.email);
              localStorage.removeItem('googleSignUp')
              this.router.navigateByUrl('').then(() =>{
                window.location.reload()
              });
            }
          },
          (error: HttpErrorResponse) =>{
            alert(error.message)
          }
        )
      })
    }
  }
}
