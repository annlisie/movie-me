import {URLSearchParams} from '@angular/http';
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
