import {Genre} from './genre.model';

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
  customRating: number;
  filmwebRating: number;
}
