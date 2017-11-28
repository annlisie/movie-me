import {URLSearchParams} from '@angular/http';
export class MoviePageableParams {
  page: number;
  numberOfElementsOnPage: number;
  columnToSort: string;
  sortDirection: string;

  constructor() {
    this.page = 0;
    this.numberOfElementsOnPage = 10;
    this.columnToSort = 'id';
    this.sortDirection = 'ASC';
  }

  public toParamsObject(): URLSearchParams {
    const params = new URLSearchParams();
    params.set('page', this.page.toString());
    params.set('numberOfElementsOnPage', this.numberOfElementsOnPage.toString());
    params.set('columnToSort', this.columnToSort.toString());
    params.set('sortDirection', this.sortDirection.toString());
    return params;
  }
}
