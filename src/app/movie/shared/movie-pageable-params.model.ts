import {URLSearchParams} from '@angular/http';
export class MoviePageableParams {
  page: number;
  numberOfElementsOnPage: number;

  constructor() {
    this.page = 0;
    this.numberOfElementsOnPage = 10;
  }

  public toParamsObject(): URLSearchParams {
    const params = new URLSearchParams();
    params.set('page', this.page.toString());
    params.set('numberOfElementsOnPage', this.numberOfElementsOnPage.toString());
    return params;
  }
}
