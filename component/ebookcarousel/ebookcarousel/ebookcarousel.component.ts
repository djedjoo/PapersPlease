import { Component, OnInit } from '@angular/core';
import { EBook } from 'src/app/model/eBook/eBook';
import { EbookService } from 'src/app/model/eBook/ebook.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EBooksCredentials } from 'src/app/model/eBook/eBooksCredentials';
import { UserService } from 'src/app/model/user/user.service';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-ebookcarousel',
  templateUrl: './ebookcarousel.component.html',
  styleUrls: ['./ebookcarousel.component.css']
})
export class EbookcarouselComponent implements OnInit{

  public alphabetic: string = "alfabetico"
  public reverseAlphabetic: string = "alfabetico(inverso)"
  public score: string = "valutazione"

  public admin: boolean = false
  public activeEBook: number

  public eBooksCredentials: EBooksCredentials[]

  constructor(private userService: UserService, private eBookService: EbookService){}

  ngOnInit(): void {
    if(localStorage.getItem('role') == "1")
      this.admin = true
    this.getEBooks()
  }

  public getEBooks(){
    this.userService.getUsers().subscribe(
      (response: User[]) =>{
        this.eBooksCredentials = []
        for(let user of response)
          for(let ebook of user.ebooks){
            let ebookCredentials: EBooksCredentials = {
              eBook: ebook,
              name: user.name,
              surname: user.surname
            }
            this.eBooksCredentials.push(ebookCredentials)
          }
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public filter(typeFilter: string){
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
    }
  }

  public alphabeticFilter(){
    this.eBooksCredentials.sort((l1, l2) =>{
      let arg1 = l1.eBook.title.toLowerCase()
      let arg2 = l2.eBook.title.toLowerCase()
      if(arg1 < arg2)
        return -1
      if(arg1 > arg2)
        return 1
      return 0
    })
  }

  public alphabeticReverseFilter(){
    this.eBooksCredentials.sort((l1, l2) =>{
      let arg1 = l1.eBook.title.toLowerCase()
      let arg2 = l2.eBook.title.toLowerCase()
      if(arg1 > arg2)
        return -1
      if(arg1 < arg2)
        return 1
      return 0
    })
  }

  public scoreFilter(){
    this.eBooksCredentials.sort((l1, l2) =>{
      let arg1 = l1.eBook.score.toLowerCase()
      let arg2 = l2.eBook.score.toLowerCase()
      if(arg1 > arg2)
        return -1
      if(arg1 < arg2)
        return 1
      return 0
    })
  }

  public setUpEBookId(id: number){
    this.activeEBook = id
  }

  public deleteAdmin(){
    this.eBookService.deleteEbookById(this.activeEBook).subscribe(
      (response: any) =>{
        this.getEBooks()
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }
}
