import {Genre} from './genre.model';
import {Rating} from './rating.model';

export class Movie {
  id: number;
  polishTitle: string;
  originalTitle: string;
  year: number;
  description: string;
  length: string;
  lengthInMinutes: number;
  poster: string;
  genres: Array<Genre>;
  customRating: number;
  filmwebRating: number;
  rated: boolean;
  ratings: Array<Rating>;
}
