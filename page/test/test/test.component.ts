import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/model/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LessonText } from 'src/app/model/lessonText/lessonText';
import { Review } from 'src/app/model/review/review';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{

  public user: User
  public lessons: LessonText[]
  public reviews: Review[]

  constructor(private userService: UserService){}

  ngOnInit(): void {
      this.getUser()
  }

  public getUser(){
    this.userService.getUserById(1).subscribe(
      (response: User) =>{
        this.user = response
        this.lessons = response.lessons
        this.reviews = response.lessons[0].reviews
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }
}
