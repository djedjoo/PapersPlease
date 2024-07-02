import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApisService, UserInfo } from 'src/app/model/apis/apis.service';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/model/user/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  public userId : number = 0;

  constructor(private userService: UserService, private router: Router, private readonly apisService: ApisService) {}

  ngOnInit(): void {
    this.setUserId();
    this.googleCheck();
  }

  public setUserId(){
    this.userService.getUsers().subscribe(
      (response: User[]) =>{
        for(let user of response)
          if(user.id > this.userId)
            this.userId = user.id
        this.userId++
      }
    )
  }

  public loginUser(emailString: string, passwordString: string){
    this.userService.getUsers().subscribe(
      (response: User[]) =>{
        let existUser: boolean = false;
        let correctPassword: boolean = false;
        let email: string;
        let role: string
        for(let user of response)
          if(user.email == emailString){
            existUser = true;
            if(user.password == passwordString){
              correctPassword = true;
              email = user.email
              role = user.role
            }
          }
        if(!existUser){
          let wrongEmail: any = document.getElementById("wrongEmail");
          wrongEmail.style.visibility = "visible";
        }
        if(existUser && !correctPassword){
          let wrongEmail: any = document.getElementById("wrongEmail");
          wrongEmail.style.visibility = "hidden";
          let wrongPassword: any = document.getElementById("wrongPassword") ;
          wrongPassword.style.visibility = "visible";
        }
        if(existUser && correctPassword){
          let wrongEmail: any = document.getElementById("wrongEmail");
          wrongEmail.style.visibility = "hidden";
          let wrongPassword: any = document.getElementById("wrongPassword") ;
          wrongPassword.style.visibility = "visible";

          localStorage.setItem('user', email);
          localStorage.setItem('role', role)
          this.router.navigateByUrl('').then(() =>{
            window.location.reload()
          });
        }

      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }


  public googleLogin(){
    localStorage.setItem('googleSignUp', "yes")
    this.apisService.googleLogin()
  }

  public googleCheck(){
    if(localStorage.getItem('googleSignUp')){
      let userInfo: UserInfo;
      this.apisService.userProfileSubject.subscribe(info =>{
        userInfo = info;
        let check: boolean = true;
        this.userService.getUsers().subscribe(
          (response: User[]) =>{
            for(let user of response)
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
