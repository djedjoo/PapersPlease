import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { lessonTextCredentials } from 'src/app/model/lessonText/lessonTextCredentials';
import { PhotoCredentials } from 'src/app/model/photo/photoCredentials';
import { UserService } from 'src/app/model/user/user.service';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{

  @Input() lessonsType: string;
  @Input() department: string


  public textsCredentials: lessonTextCredentials[]
  public photosCredentials: PhotoCredentials[]

  public firstFourTextsCredentials: lessonTextCredentials[]
  public firstFourPhotosCredentials: PhotoCredentials[]

  public textBool: boolean = false
  public photoBool: boolean = false

  public showMoreTexts: boolean = false;
  public showMorePhotos: boolean = false;

  public admin: boolean = false

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService){}

  ngOnInit(): void {
      if(this.lessonsType == "text"){
        this.getTexts()
      }
      else if(this.lessonsType == "photo"){
        this.getPhotos()
      }
      if(localStorage.getItem('role') == "1")
        this.admin = true
      this.router.events.subscribe((event) =>this.checkDepartment());
  }

  public checkDepartment(){
    this.department = this.route.snapshot.paramMap.get('department')
    if(this.lessonsType == "text"){
      this.getTexts()
    }
    else if(this.lessonsType == "photo"){
      this.getPhotos()
    }
  }

  public getTexts(): void{
   this.textBool = true
    this.userService.getUsers().subscribe(
      (response: User[]) =>{
        this.textsCredentials = []
        this.firstFourTextsCredentials = []
        for(let user of response)
          if(user.course == this.department)
            for(let lesson of user.lessons)
              if(lesson.visibility == "Pubblico"){
                let textsCredentials: lessonTextCredentials = {
                  lesson: lesson,
                  name: user.name,
                  surname: user.surname,
                  department: user.course
                }
                this.textsCredentials.push(textsCredentials)
              }
        for(let i = 0; i < 4; i++)
          if(this.textsCredentials[i])
              this.firstFourTextsCredentials.push(this.textsCredentials[i])
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public getPhotos(): void{
    this.photoBool = true
    this.userService.getUsers().subscribe(
      (response: User[]) =>{
        this.photosCredentials = []
        this.firstFourPhotosCredentials = []
        for(let user of response)
          if(user.course == this.department)
            for(let lesson of user.photos)
              if(lesson.visibility == "Pubblico"){
                let photoCredentials: PhotoCredentials = {
                  photo: lesson,
                  name: user.name,
                  surname: user.surname,
                  department: user.course
                }
                this.photosCredentials.push(photoCredentials)
              }
        for(let i = 0; i < 4; i++)
          if(this.photosCredentials[i])
            this.firstFourPhotosCredentials.push(this.photosCredentials[i])
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public showMoreText(){
    this.showMoreTexts = true;

    for(let i = 4; i < 8; i++){
      if(this.textsCredentials[i])
        this.firstFourTextsCredentials.push(this.textsCredentials[i])
    }
  }

  public showMorePhoto(){
    this.showMorePhotos = true;
    for(let i = 4; i < 8; i++)
      if(this.photosCredentials[i])
        this.firstFourPhotosCredentials.push(this.photosCredentials[i])
  }

  public setUpTextId(id: number){
    localStorage.setItem('textId', id.toString())
    localStorage.setItem('type', "text")
  }

  public setUpPhotoId(id: number){
    localStorage.setItem('photoId', id.toString())
    localStorage.setItem('type', "photo")
  }
}
