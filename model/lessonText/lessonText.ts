import { EBook } from "../eBook/eBook";
import { Review } from "../review/review";

export interface LessonText{
  id: number,
  argument: string,
  visibility: string,
  score: string,
  text: string,
  reviews: Review[],
  ebooks: EBook[]
}
