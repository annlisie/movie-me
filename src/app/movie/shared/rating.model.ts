export class Rating {
  id: number;
  dateTime: string;
  movieId: number;
  movieTitle: string;
  ratingValue: number;
  userId: number;
  contextParams: Map<string, string>;
}
