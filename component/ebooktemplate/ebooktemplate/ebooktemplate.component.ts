import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EBookLesson } from 'src/app/model/eBook/ebookLesson';
import { UserService } from 'src/app/model/user/user.service';
import { User } from 'src/app/model/user/user';
import { EBooksCredentials } from 'src/app/model/eBook/eBooksCredentials';

@Component({
  selector: 'app-ebooktemplate',
  templateUrl: './ebooktemplate.component.html',
  styleUrls: ['./ebooktemplate.component.css']
})
export class EbooktemplateComponent implements OnInit{

  @Input() idString: string
  public activeEBookCredentials: EBooksCredentials
  public eBookLessons: EBookLesson[]
  public score: string

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.getEBook()
  }

  public getEBook(){
    this.userService.getUsers().subscribe(
      (response: User[]) =>{
        this.eBookLessons = []
        for(let user of response)
          for(let ebook of user.ebooks)
            if(ebook.id.toString() == this.idString){
              this.activeEBookCredentials = {
                eBook: ebook,
                name: user.name,
                surname: user.surname
              }
              this.setScore()
              for(let lesson of ebook.lessons){
                let newEBookLesson: EBookLesson = {
                  lesson: lesson,
                  type: "text",
                  name: user.name,
                  surname: user.surname
                }
                this.eBookLessons.push(newEBookLesson)
              }
              for(let photo of ebook.photos){
                let newEBookLesson: EBookLesson = {
                  lesson: photo,
                  type: "photo",
                  name: user.name,
                  surname: user.surname
                }
                this.eBookLessons.push(newEBookLesson)
              }
            }
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public setScore(){
    switch(this.activeEBookCredentials.eBook.score){
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
