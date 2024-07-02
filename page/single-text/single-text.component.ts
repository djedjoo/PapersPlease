import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonText } from 'src/app/model/lessonText/lessonText';
import { LessontextService } from 'src/app/model/lessonText/lessontext.service';
import { HttpErrorResponse } from '@angular/common/http'
import { PhotoService } from 'src/app/model/photo/photo.service';
import { Photo } from 'src/app/model/photo/photo';
import { Review } from 'src/app/model/review/review';
import { ReviewService } from 'src/app/model/review/review.service';
import { UserService } from 'src/app/model/user/user.service';
import { User } from 'src/app/model/user/user';
import { FavouriteService } from 'src/app/model/favourite/favourite.service';
import { Favourite } from 'src/app/model/favourite/favourite';

@Component({
  selector: 'app-single-text',
  templateUrl: './single-text.component.html',
  styleUrls: ['./single-text.component.css']
})
export class SingleTextComponent implements OnInit{

  public lessonId: number
  public type: string

  public favouriteId: number = 0
  public reviewId: number = 0

  public reviews: Review[]

  public activeLesson: any
  public activeUser: User
  public activeScore: string
  public activeUserId: number

  public loggedUser: boolean

  constructor(private route: ActivatedRoute, private lessonTextService: LessontextService, private photoService: PhotoService, private reviewService: ReviewService,
    private userService: UserService, private favouriteService: FavouriteService){}

  ngOnInit(): void {
      this.lessonId = parseInt(this.route.snapshot.paramMap.get('lessonId'))
      this.type = this.route.snapshot.paramMap.get('type')

      this.getLesson()
      this.setFavouritesId()
      this.setReviewId()
      if(localStorage.getItem('user'))
        this.loggedUser = true
      else
        this.loggedUser = false
  }

  public getUser() {
    this.userService.getUserByEmail(localStorage.getItem('user')).subscribe(
      (response: User) => {
        this.activeUser = response
        this.activeUserId = this.activeUser.id
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public getLesson(){
    this.userService.getUsers().subscribe(
      (response: User[]) =>{
        for(let user of response)
          if(this.type == "text"){
            this.getText(user.lessons)
          }
          else{
            this.getPhoto(user.photos)
          }
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public getText(lessons: LessonText[]){
    for(let lesson of lessons)
      if(lesson.id == this.lessonId){
        this.activeLesson = lesson
        this.reviews = lesson.reviews
      }
  }

  public getPhoto(photos: Photo[]){
    for(let photo of photos)
      if(photo.id == this.lessonId){
        this.activeLesson = photo
        this.reviews = photo.reviews
      }
  }


  public youtube(){
    window.location.href = "https://www.youtube.com/results?search_query="+ this.activeLesson.argument
  }

  public setFavouritesId(){
    this.favouriteService.getFavourites().subscribe(
      (response: Favourite[]) =>{
        for(let favourite of response)
          if(favourite.id > this.favouriteId)
            this.favouriteId = favourite.id
        this.favouriteId++
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public setReviewId(){
    this.reviewService.getReviews().subscribe(
      (response: Review[]) =>{
        for(let review of response)
          if(review.id > this.reviewId)
            this.reviewId = review.id
        this.reviewId++
      }
    )
  }

  public insertReview(){
    let titleInput = <HTMLInputElement>document.getElementById("title")
    let reviewInput = <HTMLTextAreaElement>document.getElementById("reviewText")
    let scoreInput = <HTMLSelectElement>document.getElementById("score")

    let title: string = titleInput.value
    let review: string = reviewInput.value
    let score: string = scoreInput.value

    this.userService.getUserByEmail(localStorage.getItem('user')).subscribe(
      (response: User) =>{
        if(this.type == "text"){
          let newReview: Review = {
            id:this.reviewId,
            title: title,
            text: review,
            score: this.convertToScore(score).toString(),
            type: "text",
            name: response.name,
            surname: response.surname
          }
          this.lessonTextService.getLessontextById(this.lessonId).subscribe(
            (otherResponse: LessonText) =>{
              otherResponse.reviews.push(newReview)
              otherResponse.score = this.updateScore(otherResponse.reviews)
              this.lessonTextService.updateLessontext(otherResponse).subscribe(
                (response: LessonText) =>{
                  this.getLesson()
                  this.setReviewId()
                },
                (error: HttpErrorResponse) =>{
                  alert(error.message)
                }
              )
            },
            (error: HttpErrorResponse) =>{
              alert(error.message)
            }
          )
        }
        else{
          let newReview: Review = {
            id: this.reviewId,
            title: title,
            text: review,
            score: this.convertToScore(score).toString(),
            type: "photo",
            name: response.name,
            surname: response.surname
          }
          this.photoService.getPhotoById(this.lessonId).subscribe(
            (otherResponse: Photo) =>{
              otherResponse.reviews.push(newReview)
              otherResponse.score = this.updateScore(otherResponse.reviews)
              this.photoService.update(otherResponse).subscribe(
                (response: Photo) =>{
                  this.getLesson()
                  this.setReviewId()
                },
                (error: HttpErrorResponse) =>{
                  alert(error.message)
                }
              )
            },
            (error: HttpErrorResponse) =>{
              alert(error.message)
            }
          )
        }
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
    titleInput.value = ""
    reviewInput.value = ""
    scoreInput.value = "Eccellente"
  }

  public download(){
    const http = new XMLHttpRequest()
    http.onload = () => {
      let url = window.URL.createObjectURL(http.response)
      let link = document.createElement('a')
      link.href = url
      link.download = this.activeLesson.argument
      link.click()
    }
    http.responseType = 'blob'
    http.open('GET', this.activeLesson.image, true)
    http.send()
  }


  public updateScore(reviews: Review[]): string {
    let sum: number = 0
    let i: number = 1
    for(let review of reviews){
      sum += parseInt(review.score)
      i++
    }
    sum = sum/i
    sum = Math.round(sum)
    return sum.toString()
  }

  public convertToScore(score: string): number{
    let sc: number
    switch(score){
      case "Eccellente":{
        sc = 5
        break
      }
      case "Ottima":{
        sc = 4
        break
      }
      case "Buona":{
        sc = 3
        break
      }
      case "Mediocre":{
        sc = 2
        break
      }
      case "Non ottimale":{
        sc = 1
      }
    }
    return sc
  }

  public checkFavourite(){
    let check: boolean = true
    if(this.type == "text"){
      this.userService.getUserByEmail(localStorage.getItem('user')).subscribe(
        (response: User) =>{
          for(let favourite of response.favourites)
            if(favourite.lessonId == this.activeLesson.id && favourite.type == "text")
            check = false
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
    else{
      this.userService.getUserByEmail(localStorage.getItem('user')).subscribe(
        (response: User) =>{
          for(let favourite of response.favourites)
            if(favourite.lessonId == this.activeLesson.id && favourite.type == "photo")
            check = false
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
    if(check)
      this.addFavourite()
  }

  public addFavourite(){
    if(this.type == "text"){
      let newFavourite: Favourite = {
        id: this.favouriteId,
        lessonId: this.activeLesson.id,
        type: "text",
        done: "false"
      }
      this.userService.getUserByEmail(localStorage.getItem('user')).subscribe(
        (response: User) =>{
          response.favourites.push(newFavourite)
          this.userService.updateUsers(response).subscribe(
            (response: User) =>{
              this.getLesson()
              this.setFavouritesId()
            },
            (error: HttpErrorResponse) =>{
              alert(error.message)
            }
          )
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
    else{
      let newFavourite: Favourite = {
        id: this.favouriteId,
        lessonId: this.activeLesson.id,
        type: "photo",
        done: "false"
      }
      this.userService.getUserByEmail(localStorage.getItem('user')).subscribe(
        (response: User) =>{
          response.favourites.push(newFavourite)
          this.userService.updateUsers(response).subscribe(
            (response: User) =>{
              this.getLesson()
              this.setFavouritesId()
            },
            (error: HttpErrorResponse) =>{
              alert(error.message)
            }
          )
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
  }
}
