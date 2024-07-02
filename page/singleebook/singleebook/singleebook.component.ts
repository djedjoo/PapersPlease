import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EBook } from 'src/app/model/eBook/eBook';
import { EbookService } from 'src/app/model/eBook/ebook.service';
import { ReviewService } from 'src/app/model/review/review.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Favourite } from 'src/app/model/favourite/favourite';
import { Review } from 'src/app/model/review/review';
import { ReviewCredentials } from 'src/app/model/review/reviewCredentials';
import { FavouriteService } from 'src/app/model/favourite/favourite.service';
import { UserService } from 'src/app/model/user/user.service';
import { User } from 'src/app/model/user/user';
import { EBooksCredentials } from 'src/app/model/eBook/eBooksCredentials';

@Component({
  selector: 'app-singleebook',
  templateUrl: './singleebook.component.html',
  styleUrls: ['./singleebook.component.css']
})
export class SingleebookComponent implements OnInit{

  public eBookId: string
  public activeEBook: EBooksCredentials

  public activeUser: User

  public favouriteId: number = 0
  public reviewId: number = 0

  public loggedUser: boolean = false

  public reviewsCredentials: ReviewCredentials[]

  constructor(private route: ActivatedRoute, private eBookService: EbookService, private reviewService: ReviewService, private favouriteService: FavouriteService,
    private userService: UserService){}

  ngOnInit(): void {
      this.eBookId = this.route.snapshot.paramMap.get('id')
      this.getEbook()
      this.setFavouritesId()
      this.setReviewId()
      if(localStorage.getItem('user'))
        this.loggedUser = true
      else
        this.loggedUser = false
  }

  public getUser(){
    this.userService.getUserByEmail(localStorage.getItem('user')).subscribe(
      (response: User) =>{
        this.activeUser = response
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public getEbook(){
    let id: number = parseInt(this.eBookId)
    this.userService.getUsers().subscribe(
      (response: User[]) =>{
        for(let user of response)
          for(let ebook of user.ebooks)
            if(ebook.id == id){
              let ebookCredentials: EBooksCredentials = {
                eBook: ebook,
                name: user.name,
                surname: user.surname
              }
              this.activeEBook = ebookCredentials
              for(let review of ebook.reviews){
                let reviewCredentials: ReviewCredentials = {
                  review: review,
                  name: user.name,
                  surname: user.surname
                }
                this.reviewsCredentials.push(reviewCredentials)
              }
            }
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
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

  public youtube(){
    window.location.href = "https://www.youtube.com/results?search_query="+ this.activeEBook.eBook.title
  }

  public checkFavourite(){ //to not enable the repetition of a favourite
    let check: boolean = false
    for(let favourite of this.activeUser.favourites)
      if(favourite.lessonId == this.activeEBook.eBook.id && favourite.type == "eBook")
        check = false
    if(check)
      this.addFavourite()
  }

  public addFavourite(){
    let newFavourite: Favourite = {
      id: this.favouriteId,
      lessonId: this.activeEBook.eBook.id,
      type: "eBook",
      done: "false"
    }
    this.activeUser.favourites.push(newFavourite)
    this.userService.updateUsers(this.activeUser).subscribe(
      (response: User) =>{
        this.getEbook()
        this.setFavouritesId()
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
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

    let newReview: Review = {
      id: this.reviewId,
      title: title,
      text: review,
      score: score,
      type: "eBook",
      name: this.activeUser.name,
      surname: this.activeUser.surname
    }
    newReview.score = this.updateScore(newReview)
    this.activeEBook.eBook.reviews.push(newReview)
    this.eBookService.updateEbook(this.activeEBook.eBook).subscribe(
      (response: EBook) =>{
        this.getEbook()
        this.setReviewId()
        titleInput.value = ""
        reviewInput.value = ""
        scoreInput.value = "Eccellente"
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public updateScore(newReview: Review) : string{
    let actualScore: number = parseInt(this.activeEBook.eBook.score)
    let reviewScore: number = parseInt(newReview.score)
    let sum: number = actualScore + reviewScore
    let i: number = 2
    for(let review of this.activeEBook.eBook.reviews){
      sum += this.convertToScore(review.score)
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
}
