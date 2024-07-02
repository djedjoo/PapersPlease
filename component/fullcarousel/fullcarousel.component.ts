import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { lessonTextCredentials } from 'src/app/model/lessonText/lessonTextCredentials';
import { PhotoCredentials } from 'src/app/model/photo/photoCredentials';
import { UserService } from 'src/app/model/user/user.service';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-fullcarousel',
  templateUrl: './fullcarousel.component.html',
  styleUrls: ['./fullcarousel.component.css']
})
export class FullcarouselComponent implements OnInit{

  @Input() lessonType: string
  @Input() department: string

  public lessonTextCredentials: lessonTextCredentials[]
  public photoCredentials: PhotoCredentials[]

  public alphabetic: string = "alfabetico"
  public reverseAlphabetich: string = "alfabetico(inverso)"
  public type: string = "tipo"
  public score: string = "valutazione"
  public departmentString: string = "dipartimento"

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService){}

  ngOnInit(): void {
      if(this.lessonType == "text")
        this.getTexts()
      else
        this.getPhotos()
      this.router.events.subscribe((event) => this.checkType())
  }

  public checkType(){
    this.lessonType = this.route.snapshot.paramMap.get('type')
    if(this.lessonType == "text")
      this.getTexts()
    else
      this.getPhotos()
  }

  public getTexts(){
    if(this.department != "")
      this.getTextsDepartment()
    else{
      this.userService.getUsers().subscribe(
        (response: User[]) =>{
          this.lessonTextCredentials = []
          for(let user of response)
            for(let lesson of user.lessons){
              let lessonCredentials: lessonTextCredentials = {
                lesson: lesson,
                name: user.name,
                surname: user.surname,
                department: user.course
              }
              this.lessonTextCredentials.push(lessonCredentials)
            }
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
  }

  public getPhotos(){
    if(this.department != "")
      this.getPhotosDepartment()
    else{
      this.userService.getUsers().subscribe(
        (response: User[]) =>{
          this.photoCredentials = []
          for(let user of response)
            for(let photo of user.photos){
              let lessonCredentials: PhotoCredentials = {
                photo: photo,
                name: user.name,
                surname: user.surname,
                department: user.course
              }
              this.photoCredentials.push(lessonCredentials)
            }
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
  }

  public getTextsDepartment(){
    this.userService.getUsers().subscribe(
      (response: User[]) =>{
        this.lessonTextCredentials = []
        for(let user of response)
          if(user.course == this.department)
            for(let lesson of user.lessons){
              let lessonCredentials: lessonTextCredentials = {
                lesson: lesson,
                name: user.name,
                surname: user.surname,
                department: user.course
              }
              this.lessonTextCredentials.push(lessonCredentials)
            }
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public getPhotosDepartment(){
    this.userService.getUsers().subscribe(
      (response: User[]) =>{
        for(let user of response)
          if(user.course == this.department)
            for(let photo of user.photos){
              let lessonCredentials: PhotoCredentials = {
                photo: photo,
                name: user.name,
                surname: user.surname,
                department: user.course
              }
              this.photoCredentials.push(lessonCredentials)
            }
      }
    )
  }

  public filter(typeFilter: string){
    if(this.lessonType == "text")
      this.filterTextOperation(typeFilter)
    else
    this.filterPhotoOperation(typeFilter)
  }

  public filterTextOperation(typeFilter: string){
    switch(typeFilter){
      case "alfabetico":{
        this.alphabeticFilter()
        break
      }
      case "alfabetico(inverso)":{
        this.alphabeticReverseFilter()
        break
      }
      case "valutazione":{
        this.scoreFilter()
        break
      }
      case "dipartimento":{
        this.departmentFilter()
        break
      }
    }
  }

  public filterPhotoOperation(typeFilter: string){
    switch(typeFilter){
      case "tipo":{
        this.typeFilter()
        break
      }
      case "alfabetico":{
        this.alphabeticFilter()
        break
      }
      case "alfabetico(inverso)":{
        this.alphabeticReverseFilter()
        break
      }
      case "valutazione":{
        this.scoreFilter()
        break
      }
      case "dipartimento":{
        this.departmentFilter()
        break
      }
    }
  }


  public alphabeticFilter(){
    if(this.lessonType == "text"){
      this.lessonTextCredentials.sort((l1, l2) => {
        let arg1 = l1.lesson.argument.toLowerCase()
        let arg2 = l2.lesson.argument.toLowerCase()
        if(arg1 < arg2)
          return -1
        if(arg1 > arg2)
          return 1
        return 0
      })
    }
    else{
      this.photoCredentials.sort((l1, l2) => {
        let arg1 = l1.photo.argument.toLowerCase()
        let arg2 = l2.photo.argument.toLowerCase()
        if(arg1 < arg2)
          return -1
        if(arg1 > arg2)
          return 1
        return 0
      })
    }
  }

  public alphabeticReverseFilter(){
    if(this.lessonType == "text"){
      this.lessonTextCredentials.sort((l1, l2) => {
        let arg1 = l1.lesson.argument.toLowerCase()
        let arg2 = l2.lesson.argument.toLowerCase()
        if(arg1 > arg2)
          return -1
        if(arg1 < arg2)
          return 1
        return 0
      })
    }
    else{
      this.photoCredentials.sort((l1, l2) => {
        let arg1 = l1.photo.argument.toLowerCase()
        let arg2 = l2.photo.argument.toLowerCase()
        if(arg1 > arg2)
          return -1
        if(arg1 < arg2)
          return 1
        return 0
      })
    }
  }

  public scoreFilter(){
    if(this.lessonType == "text"){
      this.lessonTextCredentials.sort((l1, l2) => {
        let arg1 = l1.lesson.score.toLowerCase()
        let arg2 = l2.lesson.score.toLowerCase()
        if(arg1 < arg2)
          return -1
        if(arg1 > arg2)
          return 1
        return 0
      })
    }
    else{
      this.photoCredentials.sort((l1, l2) => {
        let arg1 = l1.photo.score.toLowerCase()
        let arg2 = l2.photo.score.toLowerCase()
        if(arg1 < arg2)
          return -1
        if(arg1 > arg2)
          return 1
        return 0
      })
    }
  }

  public departmentFilter(){
    if(this.lessonType == "text"){
      this.lessonTextCredentials.sort((l1, l2) => {
        let arg1 = l1.department
        let arg2 = l2.department.toLowerCase()
        if(arg1 < arg2)
          return -1
        if(arg1 > arg2)
          return 1
        return 0
      })
    }
    else{
      this.photoCredentials.sort((l1, l2) => {
        let arg1 = l1.department.toLowerCase()
        let arg2 = l2.department.toLowerCase()
        if(arg1 < arg2)
          return -1
        if(arg1 > arg2)
          return 1
        return 0
      })
    }
  }

  public typeFilter(){
    this.photoCredentials.sort((l1, l2) => {
      let arg1 = l1.photo.type.toLowerCase()
        let arg2 = l2.photo.type.toLowerCase()
        if(arg1 < arg2)
          return -1
        if(arg1 > arg2)
          return 1
        return 0
    })
  }


}


