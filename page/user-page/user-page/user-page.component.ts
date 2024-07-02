import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/model/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { faBook, faBookAtlas, faBookMedical, faHouse, faPersonChalkboard, faRightFromBracket, faStar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ApisService } from 'src/app/model/apis/apis.service';
import { FavouriteService } from 'src/app/model/favourite/favourite.service';
import { Favourite } from 'src/app/model/favourite/favourite';
import { LessontextService } from 'src/app/model/lessonText/lessontext.service';
import { PhotoService } from 'src/app/model/photo/photo.service';
import { LessonText } from 'src/app/model/lessonText/lessonText';
import { Photo } from 'src/app/model/photo/photo';
import { FavouriteDistinction } from 'src/app/model/favourite/favouriteDistinction';
import { EbookService } from 'src/app/model/eBook/ebook.service';
import { EBook } from 'src/app/model/eBook/eBook';
import { LessonDistinction } from 'src/app/model/user/lessonDistinction';

@Component({
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{

  public user: User
  public userEmail: string

  public typeText: string = "text"
  public typePhoto: string = "photo"

  public activeLesson: any

  houseIcon = faHouse
  preferredIcon = faStar
  lessonIcon = faPersonChalkboard
  eBooksIcon = faBook
  logoutIcon = faRightFromBracket
  createEBook = faBookMedical
  createRandomEBook = faBookAtlas

  public houseOpen: boolean = true
  public preferredOpen: boolean = false
  public lessonOpen: boolean = false
  public eBooksOpen: boolean = false

  public empty: boolean = true
  public emptyEBook: boolean = true
  public emptyLesson: boolean = true

  public favourites: Favourite[]
  public favouritesList: any[]
  public userLessons: LessonDistinction[]
  public eBooks: EBook[]
  public activeEbook: EBook

  public activeEBookId: number
  public activeLessonId: number
  public activeType: string
  public nextEBookId: number = 0
  public activeFavouriteId: number

  constructor(private userService: UserService, private router: Router, private apisService: ApisService, private favouriteService: FavouriteService,
    private lessonTextService: LessontextService, private photoService: PhotoService, private ebookService: EbookService){}

  ngOnInit(): void {
      this.userEmail = localStorage.getItem('user')
      this.setEBookId()
      this.getUser()
      this.getLessonSection()
      this.getEBooksSection()
  }

  public setEBookId(){
    this.ebookService.getEbooks().subscribe(
      (response: EBook[]) =>{
        for(let ebook of response)
          if(ebook.id > this.nextEBookId)
            this.nextEBookId = ebook.id
        this.nextEBookId++
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public getUser(){
    this.userService.getUserByEmail(this.userEmail).subscribe(
      (response: User) =>{
        this.user = response
        this.favouritesList = []
        this.getFavourites(this.user)
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public getFavourites(user: User){
    this.lessonTextService.getLessonsText().subscribe(
      (response: LessonText[]) =>{
        for(let favourite of user.favourites)
          if(favourite.type == "text")
            for(let lesson of response)
              if(lesson.id == favourite.lessonId){
                let favouriteDistinction: FavouriteDistinction = {
                  id: favourite.id,
                  favourite: lesson,
                  type: "text",
                  done: favourite.done
                }
                this.favouritesList.push(favouriteDistinction)
              }
        if(this.favouritesList.length > 0)
          this.empty = false
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
    this.photoService.getPhotos().subscribe(
      (response: Photo[]) =>{
        for(let favourite of user.favourites)
          if(favourite.type == "photo")
            for(let photo of response)
              if(photo.id == favourite.lessonId){
                let favouriteDistinction: FavouriteDistinction = {
                  id: favourite.id,
                  favourite: photo,
                  type: "photo",
                  done: favourite.done
                }
                this.favouritesList.push(favouriteDistinction)
              }
        if(this.favouritesList.length > 0)
          this.empty = false
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
    this.ebookService.getEbooks().subscribe(
      (response: EBook[]) =>{
        for(let favourite of user.favourites)
          if(favourite.type == "eBook")
            for(let ebook of response)
              if(ebook.id == favourite.lessonId){
                let favouriteDistinction: FavouriteDistinction = {
                  id: favourite.id,
                  favourite: ebook,
                  type: "eBook",
                  done: favourite.done
                }
                this.favouritesList.push(favouriteDistinction)
              }
        if(this.favouritesList.length > 0)
          this.empty = false
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public getLessonSection(){
    this.userLessons = []
    this.userService.getUserByEmail(localStorage.getItem('user')).subscribe(
      (response: User) =>{
        for(let lesson of response.lessons){
          let newLessonDistinction: LessonDistinction = {
            lesson: lesson,
            type: "text"
          }
          this.userLessons.push(newLessonDistinction)
        }
        for(let photo of response.photos){
          let newLessonDistinction: LessonDistinction = {
            lesson: photo,
            type: "photo"
          }
          this.userLessons.push(newLessonDistinction)
        }
        if(this.userLessons.length > 0)
          this.emptyLesson = false
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public getEBooksSection(){
    this.eBooks = []
    this.userService.getUserByEmail(localStorage.getItem('user')).subscribe(
      (response: User) =>{
        this.eBooks = response.ebooks
        if(this.eBooks.length > 0)
          this.emptyEBook = false
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public clear(){
    localStorage.clear()
    this.apisService.signOut()
    this.router.navigateByUrl('').then(() =>{
      window.location.reload()
    });
  }

  public houseMenu(){
    this.houseOpen = true
    this.preferredOpen = false
    this.lessonOpen = false
    this.eBooksOpen = false
  }

  public preferredMenu(){
    this.houseOpen = false
    this.preferredOpen = true
    this.lessonOpen = false
    this.eBooksOpen = false
  }

  public lessonMenu(){
    this.houseOpen = false
    this.preferredOpen = false
    this.lessonOpen = true
    this.eBooksOpen = false
  }

  public eBooksMenu(){
    this.houseOpen = false
    this.preferredOpen = false
    this.lessonOpen = false
    this.eBooksOpen = true
  }

  public setUpId(id: number){
    this.activeEBookId = id
    this.ebookService.getEbookById(this.activeEBookId).subscribe(
      (response: EBook) =>{
        this.activeEbook = response
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public setUpLessonId(id: number, type: string){
    this.activeLessonId = id
    this.activeType = type
  }

  public setUpFavouriteId(id: number){
    this.activeFavouriteId = id
    console.log(this.activeFavouriteId)
  }

  public createEBookOperation(){
    let eBookInput = <HTMLInputElement>document.getElementById("eBookPlaceHolder")
    let eBookTitle:string = eBookInput.value
    let visibilityInput = <HTMLSelectElement>document.getElementById("visibilityInsert")
    let visibility: string = visibilityInput.value
    this.userService.getUserByEmail(localStorage.getItem('user')).subscribe(
      (response: User) =>{
        let newEbook: EBook = {
          id: this.nextEBookId,
          title: eBookTitle,
          visibility: visibility,
          score: "3",
          reviews: [],
          photos: [],
          lessons: []
        }
        response.ebooks.push(newEbook)
        this.userService.updateUsers(response).subscribe(
          (response: User) =>{
            this.setEBookId()
            this.getUser()
            this.getLessonSection()
            this.getEBooksSection()
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

  public updateEBookOperation(){
    let eBookInput = <HTMLInputElement>document.getElementById("updateEBookPlaceHolder")
    let eBookTitle: string = eBookInput.value
    let visibilityInput = <HTMLSelectElement>document.getElementById("visibilityUpdate")
    let visibility: string = visibilityInput.value
    let newEBook: EBook = {
      id: this.activeEBookId,
      title: eBookTitle,
      visibility: visibility,
      score: this.activeEbook.score,
      reviews: this.activeEbook.reviews,
      photos: this.activeEbook.photos,
      lessons: this.activeEbook.lessons
    }
    this.ebookService.updateEbook(newEBook).subscribe(
      (response: EBook) =>{
        this.getEBooksSection()
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public deleteEBookOperation(){
    this.ebookService.deleteEbookById(this.activeEBookId).subscribe(
      (response: any) =>{
        this.getEBooksSection()
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public updateLessonEBook(){
    let eBookInput = <HTMLSelectElement>document.getElementById("lessonEBook")
    let eBookTitle: string = eBookInput.value
    if(this.activeType == "text"){
      this.lessonTextService.getLessontextById(this.activeLessonId).subscribe(
        (response: LessonText) =>{
          this.ebookService.getEbookByTitle(eBookTitle).subscribe(
            (otherResponse: EBook) =>{
              let updateEBook: EBook = otherResponse
              updateEBook.lessons.push(response)
              this.ebookService.updateEbook(updateEBook).subscribe(
                (response: EBook) =>{
                  this.getLessonSection()
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
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
    else{
      this.photoService.getPhotoById(this.activeLessonId).subscribe(
        (response: Photo) =>{
          this.ebookService.getEbookByTitle(eBookTitle).subscribe(
            (otherResponse: EBook) =>{
              let updateEBook: EBook = otherResponse
              updateEBook.photos.push(response)
              this.ebookService.updateEbook(updateEBook).subscribe(
                (response: EBook) =>{
                  this.getLessonSection()
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
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
  }

  public deleteFavourite(){
    let id: number = this.activeFavouriteId
    this.favouriteService.deleteFavouriteById(id).subscribe(
      (response: any) =>{
        this.getUser()
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public trueRead(id: number){
    this.favouriteService.getFavouriteById(id).subscribe(
      (response: Favourite) =>{
        response.done = "true"
        this.favouriteService.updateFavourite(response).subscribe(
          (otherResponse: Favourite) =>{
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

  public createRandom(){
    this.userService.getUserByEmail(localStorage.getItem('user')).subscribe(
      (response: User) =>{
        let newEBook: EBook = {
          id: this.nextEBookId,
          title: "EBook Generato",
          visibility: "Pubblico",
          score: "3",
          reviews: [],
          photos: [],
          lessons: []
        }
        let textSeed: number = response.lessons.length
        let photoSeed: number = response.photos.length
        for(let i = 0; i < 3; i++){
          let check: boolean = true
          let random = Math.floor(Math.random() * textSeed)
          for(let lesson of newEBook.lessons)
            if(lesson.id == response.lessons[random].id)
              check = false
          if(check)
            newEBook.lessons.push(response.lessons[random])
        }
        for(let i = 0; i < 3; i++){
          let check: boolean = true
          let random = Math.floor(Math.random() * photoSeed)
          for(let lesson of newEBook.photos)
            if(lesson.id == response.photos[random].id)
              check = false
          if(check)
            newEBook.photos.push(response.photos[random])
        }
        response.ebooks.push(newEBook)
        this.userService.updateUsers(response).subscribe(
          (response: User) =>{
            this.setEBookId()
            this.getUser()
            this.getLessonSection()
            this.getEBooksSection()
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
