import { Component, OnInit } from '@angular/core';
import {MoviePageableParams} from '../movie/shared/movie-pageable-params.model';
import {Rating} from '../movie/shared/rating.model';
import {MovieService} from '../movie/shared/movie.service';
import {ContextParameter} from '../movie/movie-catalog/rating-form/model/context-parameter.model';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {

  pageableParams: MoviePageableParams;
  contextParams: ContextParameter[];
  ratings: Rating[];
  currentPage = 0;
  totalPages = 1;

  constructor(private movieService: MovieService, private userService: UserService) {
    this.pageableParams = new MoviePageableParams();
  }

  ngOnInit() {
    this.pageableParams.page = this.currentPage;
    this.pageableParams.numberOfElementsOnPage = 10;
    this.pageableParams.columnToSort = 'dateTime';
    this.pageableParams.sortDirection = 'DESC';

    this.movieService.getContextParameters()
      .then(response => this.contextParams = response);
    this.getRatedMovies();
  }

  getRatedMovies() {
    this.userService.getRatings(this.pageableParams)
      .subscribe(
        (data) => {
          this.handleResponse(data.data);
          // this.ratings = data.data;
          console.log(data.data);
        }, // Reach here if res.status >= 200 && <= 299
        (err) => {
          this.ratings = null;
        });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.pageableParams.page = page;
    this.getRatedMovies();
  }

  handleResponse(response) {
    this.ratings = response.content;
    this.totalPages = response.totalPages;
    this.currentPage = response.number;

    console.log(this.ratings);
  }

  createRange(number) {
    const items: number[] = [];
    for (let i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  parseDateTime(dateTime: string) {
    let result: string[];
    const re = /-/gi;
    result = dateTime.split('T');
    result[0] = result[0].replace(re, '.');
    result[1] = result[1].slice(0, 5);
    return result[0] + ' ' + result[1];
  }

  getReadableValues(contextParams) {
    const result: string[] = [];
    let tmp: string;
    Object.keys(contextParams).forEach(key => {
      tmp = '';
      this.contextParams.forEach(x => {
        if (x.fieldName === key) {
          tmp = x.readableFieldName;
          x.allowedValues.forEach(y => {
            if (y.value === contextParams[key] && y.value !== 'EMPTY') {
              tmp += ': ' + y.readableValue;
              result.push(tmp);
            }
          });
        }
      });
    });
    return result;
  }

}
