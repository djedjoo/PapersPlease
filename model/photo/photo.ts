import { EBook } from "../eBook/eBook";
import { Review } from "../review/review";

export interface Photo{
  id: number;
  argument: string;
  type: string;
  visibility: string;
  score: string;
  image: string;
  reviews: Review[]
  ebooks: EBook[]
}
