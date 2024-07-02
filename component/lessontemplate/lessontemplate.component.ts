import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { lessonTextCredentials } from 'src/app/model/lessonText/lessonTextCredentials';
import { LessontextService } from 'src/app/model/lessonText/lessontext.service';
import { PhotoService } from 'src/app/model/photo/photo.service';
import { PhotoCredentials } from 'src/app/model/photo/photoCredentials';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/model/user/user.service';

@Component({
  selector: 'app-lessontemplate',
  templateUrl: './lessontemplate.component.html',
  styleUrls: ['./lessontemplate.component.css']
})
export class LessontemplateComponent implements OnInit{

  @Input() idString: string
  @Input() type: string

  public lessonId: number
  public score: string

  public activeText: lessonTextCredentials
  public activePhoto: PhotoCredentials

  public text: boolean

  public lessonTextCredentials: lessonTextCredentials
  public photoCredentials: PhotoCredentials

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.lessonId = parseInt(this.idString)
      if(this.type == "text")
        this.text = true
      else
        this.text = false

      if(this.text)
        this.getLessonText()
      else
        this.getPhoto()
  }

  public getLessonText(){
    this.userService.getUsers().subscribe(
      (response: User[]) =>{
        for(let user of response)
          for(let lesson of user.lessons)
            if(lesson.id == this.lessonId){
              let lessonCredentials: lessonTextCredentials = {
                lesson: lesson,
                name: user.name,
                surname: user.surname,
                department: user.course
              }
              this.activeText = lessonCredentials
              this.setScore()
            }
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public getPhoto(){
    this.userService.getUsers().subscribe(
      (response: User[]) =>{
        for(let user of response)
          for(let photo of user.photos)
            if(photo.id == this.lessonId){
              let photoCredentials: PhotoCredentials = {
                photo: photo,
                name: user.name,
                surname: user.surname,
                department: user.course
              }
              this.activePhoto = photoCredentials
              this.setScore()
            }
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public setScore(){
    if(this.text){
      switch(this.activeText.lesson.score){
        case "1":{
          this.score = "Non ottimale"
          break
        }
        case "2":{
          this.score = "Mediocre"
          break
        }
        case "3":{
          this.score = "Buona"
          break
        }
        case "4":{
          this.score = "Ottima"
          break
        }
        case "5":{
          this.score = "Eccellente"
          break
        }
      }
    }
    else{
      switch(this.activePhoto.photo.score){
        case "1":{
          this.score = "Non ottimale"
          break
        }
        case "2":{
          this.score = "Mediocre"
          break
        }
        case "3":{
          this.score = "Buona"
          break
        }
        case "4":{
          this.score = "Ottima"
          break
        }
        case "5":{
          this.score = "Eccellente"
          break
        }
      }
    }
  }
}
