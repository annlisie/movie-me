import {URLSearchParams} from "@angular/http";
export class MovieFilteringParams {
  genresIds: number[];
  searchedTerm: string;
  productionYearStart: number;
  productionYearEnd: number;
  lengthInMinutesStart: number;
  lengthInMinutesEnd: number;
  ratingStart: number;
  ratingEnd: number;
  numberOfRatingsStart: number;
  numberOfRatingsEnd: number;
  hideRated = false;

  public fill(object) {
    const keys = Object.keys(object);
    keys.forEach((k) => {
      this[k] = object[k];
    });
  }
  public getLabel(fieldName: string): string {
    switch (fieldName) {
      case 'genresIds':
        return 'Wybrane gatunki';
      case 'productionYearStart':
        return 'Rok produkcji od';
      case 'productionYearEnd':
        return 'Rok produkcji do';
      case 'lengthInMinutesStart':
        return 'Długość w minutach od';
      case 'lengthInMinutesEnd':
        return 'Długość w minutach do';
      case 'ratingStart':
        return 'Ocena od';
      case 'ratingEnd':
        return 'Ocena do';
      case 'numberOfRatingsStart':
        return 'Liczba ocen od';
      case 'numberOfRatingsEnd':
        return 'Liczba ocen do';
      case 'hideRated':
        return 'Ukryj ocenione';
    }
  }

  public toParamsObject(): URLSearchParams {
    const params = new URLSearchParams();
    for (const property in this) {
      if (this.hasOwnProperty(property) && this[property] != null) {
        params.set(property, this[property].toString());
      }
    }
    return params;
  }
}
