import { EBook } from "../eBook/eBook";
import { Favourite } from "../favourite/favourite";
import { LessonText } from "../lessonText/lessonText";
import { Photo } from "../photo/photo";
import { Review } from "../review/review";

export interface User{  //this class has the purpose of mirroring what the user looks like in the backend so that we can use it in the angular app//
  id: number;
  email: string;
  name: string;
  surname: string;
  imageUrl: string;
  course: string;
  gender: string;
  role: string;
  password: string;
  lessons: LessonText[]
  photos: Photo[]
  ebooks: EBook[]
  favourites: Favourite[]
}
