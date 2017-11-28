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
  rating: number;
  genres: Array<Genre>;
  countries: Array<string>;
  customRating: number;
  filmwebRating: number;
  rated: boolean;
  ratings: Array<Rating>;
  premierePoland: string;
  premiereWorld: string;
  filmwebUrl: string;
}
