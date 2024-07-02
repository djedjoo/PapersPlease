import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessontextService } from 'src/app/model/lessonText/lessontext.service';
import { Photo } from 'src/app/model/photo/photo';
import { PhotoService } from 'src/app/model/photo/photo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LessonText } from 'src/app/model/lessonText/lessonText';
import { DepartmentService } from 'src/app/model/department/department.service';
import { Department } from 'src/app/model/department/department';
import { UserService } from 'src/app/model/user/user.service';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-manipulation-page',
  templateUrl: './manipulation-page.component.html',
  styleUrls: ['./manipulation-page.component.css']
})
export class ManipulationPageComponent implements OnInit{

  public insert: boolean = false;
  public update: boolean = false;
  public remove: boolean = false;

  public text: boolean = true;
  public photo: boolean = false;

  public found: boolean = false;

  public method: string;

  public departments: Department[];

  public textId: number = 0;
  public photoId: number = 0;

  public admin: boolean = false


  public activeText: number
  public activePhoto: number
  public activeTextAdmin: number
  public activePhotoAdmin: number

  constructor(private route: ActivatedRoute, private lessonTextService: LessontextService, private photoService: PhotoService,
     private router: Router, private changeDetector : ChangeDetectorRef, private userService: UserService){}

  ngOnInit(): void {
    this.checkManipulation();

    this.setLessonId()
    this.setPhotoId()

    if(localStorage.getItem('role') == "1")
      this.admin = true

    this.router.events.subscribe((event) =>this.checkManipulation()); //this way the component is able to recognize an URL change and behave in the appropriate way choosing the desired manipulation
  }



  //initialize the component for the required scope
  public checkManipulation(){
    if(this.route.snapshot.paramMap.get('type') == "insert"){
      this.insert = true;
      this.update = false;
      this.remove = false;
      this.method = "inserire"
    }
    else if(this.route.snapshot.paramMap.get('type') == "update"){
      this.insert = false;
      this.update = true;
      this.remove = false;
      this.method = "aggiornare"
    }
    else if(this.route.snapshot.paramMap.get('type') == "remove"){
      this.insert = false;
      this.update = false;
      this.remove = true;
      this.method = "rimuovere"
    }
  }


  //initialize retrieving the needed infos from the DB
  public setLessonId(){
    this.lessonTextService.getLessonsText().subscribe(
      (response: LessonText[]) =>{
        for(let lesson of response)
          if(lesson.id > this.textId)
            this.textId = lesson.id
        this.textId++
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public setPhotoId(){
    this.photoService.getPhotos().subscribe(
      (response: Photo[]) =>{
        for(let photo of response)
          if(photo.id > this.photoId)
            this.photoId > photo.id
        this.photoId++
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  //to set the right form
  public setText(){
    this.text = true;
    this.photo = false;
    this.found = false
  }

  public setPhoto(){
    this.text = false;
    this.photo = true;
    this.found = false
  }

  //to execute the INSERT statemnet, either text or file
  public insertLesson(){
    if(this.text){
      let form = document.querySelector("form")
      let inputs = new FormData(form)
      let visibility = <HTMLSelectElement>document.getElementById("visibilityText")
      let visibilityString: string = visibility.value
      this.userService.getUserByEmail(localStorage.getItem('user')).subscribe(
        (response: User) =>{
          let newLesson: LessonText = {
            id: this.textId,
            argument: inputs.get("argumentText").toString(),
            visibility: visibilityString,
            score: "3",
            text: inputs.get("lessonText").toString(),
            reviews: [],
            ebooks: []
          }
          let userLesson: User = response
          userLesson.lessons.push(newLesson)
          this.userService.updateUsers(userLesson).subscribe(
            (response: User) =>{
              this.setLessonId()
            },
            (error: HttpErrorResponse) =>{
              alert(error.message)
            }
          )
        }
      )
    }
    else{
      let files: Blob
      files = (<HTMLInputElement>document.getElementById("lessonText")).files[0]
      let reader = new FileReader()
      reader.readAsDataURL(files)
      reader.onloadend = () => {
        let form = (<HTMLFormElement>document.getElementById("TextLesson"))
        let inputs = new FormData(form)
        let visibility = <HTMLSelectElement>document.getElementById("visibilityText")
        let visibilityString: string = visibility.value
        let dataType: string = this.checkDataType(reader.result.toString())
        this.userService.getUserByEmail(localStorage.getItem('user')).subscribe(
          (response: User) =>{
            let newPhoto: Photo = {
              id: this.photoId,
              argument: inputs.get("argumentText").toString(),
              type: dataType,
              visibility: visibilityString,
              score: "3",
              image: reader.result.toString(),
              reviews: [],
              ebooks: []
            }
            let userPhoto: User = response
            userPhoto.photos.push(newPhoto)
            this.userService.updateUsers(userPhoto).subscribe(
              (response: User) =>{
                this.setPhotoId()
              },
              (error: HttpErrorResponse) =>{
                alert(error.message)
              }
            )
          },
          (error: HttpErrorResponse) =>{

          }
        )
      }
    }
  }


  public checkDataType(string: string): string{
    let type: string = "";
    if(string.includes("data:text/plain"))
      type = "text"
    else if(string.includes("data:application/rtf"))
      type = "word"
    else if(string.includes("data:application/pdf"))
      type = "pdf"
    else if(string.includes("data:image"))
      type = "img"
    return type;
  }


  public searchLesson(){
    this.found = false
    let input = (<HTMLInputElement>document.getElementById("researchText"))
    let argumentString = input.value
    let loggedUser: string
    loggedUser = localStorage.getItem('user')
    if(this.text){
      this.userService.getUserByEmail(loggedUser).subscribe(
        (response: User) =>{
          for(let lesson of response.lessons)
            if(lesson.argument == argumentString){
              this.found = true
              this.activeText = lesson.id
              this.changeDetector.detectChanges()
              input.readOnly = true
              let argumentText = (<HTMLInputElement>document.getElementById("argumentText"))
              argumentText.value = lesson.argument
              let visibilityText = (<HTMLSelectElement>document.getElementById("visibilityText"))
              visibilityText.value = lesson.visibility
              let lessonText = (<HTMLInputElement>document.getElementById("lessonText"))
              lessonText.value = lesson.text
            }
          if(!this.found){
            let nonExistingCourse: any = document.getElementById("nonExistingCourse")
            nonExistingCourse.style.visibility = "visible"
          }
        }
      )
    }
    else{
      this.userService.getUserByEmail(loggedUser).subscribe(
        (response: User) =>{
          for(let photo of response.photos)
            if(photo.argument == argumentString){
              this.found = true
              this.activePhoto = photo.id
              this.changeDetector.detectChanges()
              input.readOnly = true
              let argumentText = (<HTMLInputElement>document.getElementById("argumentText"))
              argumentText.value = photo.argument
              let visibilityText = (<HTMLSelectElement>document.getElementById("visibilityText"))
              visibilityText.value = photo.visibility
            }
          if(!this.found){
            let nonExistingCourse: any = document.getElementById("nonExistingCourse")
            nonExistingCourse.style.visibility = "visible"
          }
        }
      )
    }
  }


  public renovateLesson(){
    let argumentInput = <HTMLInputElement>document.getElementById("argumentText")
    let argument: string = argumentInput.value
    let lessonTextInput = <HTMLInputElement>document.getElementById("lessonText")
    let text: string = lessonTextInput.value
    let visibilitySelect = <HTMLSelectElement>document.getElementById("visibilityText")
    let visibility: string = visibilitySelect.value
    if(this.text){
      this.lessonTextService.getLessontextById(this.activeText).subscribe(
        (response: LessonText) =>{
          let updateLesson: LessonText = {
            id: this.activeText,
            argument: argument,
            visibility: visibility,
            score: response.score,
            text: text,
            reviews: response.reviews,
            ebooks: response.ebooks
          }
          this.lessonTextService.updateLessontext(updateLesson).subscribe(
            (otherResponse: LessonText) =>{
            }
          )
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
    else{
      let files: Blob
      files = (<HTMLInputElement>document.getElementById("lessonText")).files[0]
      if(files){
        let reader = new FileReader()
        reader.readAsDataURL(files)
        reader.onloadend = () =>{
          let dataType: string = this.checkDataType(reader.result.toString())
          this.photoService.getPhotoById(this.activePhoto).subscribe(
            (response: Photo) =>{
              let updatePhoto: Photo = {
                id: this.activePhoto,
                argument: argument,
                type: dataType,
                visibility: visibility,
                score: response.score,
                image: reader.result.toString(),
                reviews: response.reviews,
                ebooks: response.ebooks
              }
              this.photoService.update(updatePhoto).subscribe(
                (otherResponse: Photo) =>{
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
      else{
        this.photoService.getPhotoById(this.activePhoto).subscribe(
          (response: Photo) =>{
            let updatePhoto: Photo = {
              id: this.activePhoto,
              argument: argument,
              type: response.type,
              visibility: visibility,
              score: response.score,
              image: response.image,
              reviews: response.reviews,
              ebooks: response.ebooks
            }
            this.photoService.update(updatePhoto).subscribe(
              (otherResponse: Photo) =>{
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

  public searchLessonRemove(){
    this.found = false
    let input = (<HTMLInputElement>document.getElementById("researchText"))
    let argumentString = input.value
    let loggedUser = localStorage.getItem('user')
    if(this.text){
      this.userService.getUserByEmail(loggedUser).subscribe(
        (response: User) =>{
          for(let lesson of response.lessons)
            if(lesson.argument == argumentString){
              this.found = true
              this.activeText = lesson.id
              this.changeDetector.detectChanges()
              input.readOnly = true
            }
          if(!this.found){
            let nonExistingCourse: any = document.getElementById("nonExistingCourse")
            nonExistingCourse.style.visibility = "visible"
          }
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
    else{
      this.userService.getUserByEmail(loggedUser).subscribe(
        (response: User) =>{
          for(let photo of response.photos)
            if(photo.argument == argumentString){
              this.found = true
              this.activePhoto = photo.id
              this.changeDetector.detectChanges()
              input.readOnly = true
            }
          if(!this.found){
            let nonExistingCourse: any = document.getElementById("nonExistingCourse")
            nonExistingCourse.style.visibility = "visible"
          }
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
  }

  public removeLesson(){
    if(this.text){
      this.lessonTextService.deleteLessontextById(this.activeText).subscribe(
        (response: any) =>{
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
    else{
      this.photoService.deletePhotoBtId(this.activePhoto).subscribe(
        (response: any) =>{
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
  }

  public retry(){
    this.found = false
    let field = (<HTMLInputElement>document.getElementById("researchText"))
    field.readOnly = false
  }

  public searchLessonAdmin(){
    if(localStorage.getItem('type') == "text"){
      this.lessonTextService.getLessontextById(parseInt(localStorage.getItem('textId'))).subscribe(
        (response: LessonText) =>{
          this.found = true
          let lesson: LessonText = response
          this.activeTextAdmin = lesson.id
          this.changeDetector.detectChanges()
          console.log(localStorage.getItem('textId'))
          console.log(localStorage.getItem('type'))
          let argumentText = (<HTMLInputElement>document.getElementById("argumentText"))
          argumentText.value = lesson.argument
          let visibilityText = (<HTMLSelectElement>document.getElementById("visibilityText"))
          visibilityText.value = lesson.visibility
          let lessonText = (<HTMLInputElement>document.getElementById("lessonText"))
          lessonText.value = lesson.text
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
    else{
      this.photoService.getPhotoById(parseInt(localStorage.getItem('photoId'))).subscribe(
        (response: Photo) =>{
          let photo: Photo = response
          this.activePhotoAdmin = photo.id
          this.activePhoto = photo.id
          this.changeDetector.detectChanges()
          let argumentText = (<HTMLInputElement>document.getElementById("argumentText"))
          argumentText.value = photo.argument
          let visibilityText = (<HTMLSelectElement>document.getElementById("visibilityText"))
          visibilityText.value = photo.visibility
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
  }

  public renovateLessonAdmin(){
    let argumentInput = <HTMLInputElement>document.getElementById("argumentText")
    let argument: string = argumentInput.value
    let lessonTextInput = <HTMLInputElement>document.getElementById("lessonText")
    let text: string = lessonTextInput.value
    let visibilitySelect = <HTMLSelectElement>document.getElementById("visibilityText")
    let visibility: string = visibilitySelect.value
    if(localStorage.getItem('type') == "text"){
      this.lessonTextService.getLessontextById(this.activeTextAdmin).subscribe(
        (response: LessonText) =>{
          let updateLesson: LessonText = {
            id: this.activeTextAdmin,
            argument: argument,
            visibility: visibility,
            score: response.score,
            text: text,
            reviews: response.reviews,
            ebooks: response.ebooks
          }
          this.lessonTextService.updateLessontext(updateLesson).subscribe(
            (otherResponse: LessonText) =>{
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
      let files: Blob
      files = (<HTMLInputElement>document.getElementById("lessonText")).files[0]
      if(files){
        let reader = new FileReader()
        reader.readAsDataURL(files)
        reader.onloadend = () =>{
          let dataType: string = this.checkDataType(reader.result.toString())
          this.photoService.getPhotoById(this.activePhotoAdmin).subscribe(
            (response: Photo) =>{
              let updatePhoto: Photo = {
                id: this.activePhotoAdmin,
                argument: argument,
                type: dataType,
                visibility: visibility,
                score: response.score,
                image: reader.result.toString(),
                reviews: response.reviews,
                ebooks: response.ebooks
              }
              this.photoService.update(updatePhoto).subscribe(
                (otherResponse: Photo) =>{
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
      else{
        this.photoService.getPhotoById(this.activePhotoAdmin).subscribe(
          (response: Photo) =>{
            let updatePhoto: Photo = {
              id: this.activePhotoAdmin,
              argument: argument,
              type: response.type,
              visibility: visibility,
              score: response.score,
              image: response.image,
              reviews: response.reviews,
              ebooks: response.ebooks
            }
            this.photoService.update(updatePhoto).subscribe(
              (otherResponse: Photo) =>{
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

  public searchLessonRemoveAdmin(){
    if(localStorage.getItem('type') == "text"){
      this.lessonTextService.getLessontextById(parseInt(localStorage.getItem("textId"))).subscribe(
        (response: LessonText) =>{
          let input = (<HTMLInputElement>document.getElementById("researchText"))
          input.value = response.argument
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
    else{
      this.photoService.getPhotoById(parseInt(localStorage.getItem("photoId"))).subscribe(
        (response: Photo) =>{
          let input = (<HTMLInputElement>document.getElementById("researchText"))
          input.value = response.argument
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
  }

  public removeLessonAdmin(){
    if(localStorage.getItem('type') == "text"){
      this.lessonTextService.deleteLessontextById(parseInt(localStorage.getItem("textId"))).subscribe(
        (response: any) =>{},
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
    else{
      this.photoService.deletePhotoBtId(parseInt(localStorage.getItem("textId"))).subscribe(
        (response: any) =>{},
        (error: HttpErrorResponse) =>{
          alert(error.message)
        }
      )
    }
  }

}
