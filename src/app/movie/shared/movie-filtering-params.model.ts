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
    }
  }

  public toParamsObject(): URLSearchParams {
    const params = new URLSearchParams();
    for (const property in this) {
      if (this.hasOwnProperty(property) && this[property] != null) {
        console.log('LOG: prop='  + property + ' val=' + this[property]);
        params.set(property, this[property].toString());
      }
    }
    return params;
  }
}