import { LessonText } from "../lessonText/lessonText"
import { Photo } from "../photo/photo"
import { Review } from "../review/review"

export interface EBook{
  id: number,
  title: string,
  visibility: string,
  score: string
  reviews: Review[]
  lessons: LessonText[]
  photos: Photo[]
}
