import {URLSearchParams} from "@angular/http";
export class MovieFilteringParams {
  genresIds: number[] = null;
  searchedTerm: string = null;
  productionYearStart: number = null;
  productionYearEnd: number = null;
  lengthInMinutesStart: number = null;
  lengthInMinutesEnd: number = null;
  ratingStart: number = null;
  ratingEnd: number = null;
  numberOfRatingsStart: number = null;
  numberOfRatingsEnd: number = null;
  hideRated = null;

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
