import { Component, OnInit } from '@angular/core';
import {Movie} from './shared/movie.model';
import {MovieService} from './shared/movie.service';
import {DomSanitizer} from '@angular/platform-browser';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-movie-catalog',
  templateUrl: './movie-catalog.component.html',
  styleUrls: ['./movie-catalog.component.css'],
  providers: [MovieService]
})
export class MovieCatalogComponent implements OnInit {

  movies: Movie[];
  totalPages: number;
  currentPage: number;
  pagesNumber: number[] = [];

  searchValue: string;
  searchValueChanged: Subject<string> = new Subject<string>();

  loading: boolean;

  constructor(private movieService: MovieService,
              private sanitizer: DomSanitizer) {
    this.searchValueChanged
      .debounceTime(500) // wait 300ms after the last event before emitting last event
      .distinctUntilChanged() // only emit if value is different from previous value
      .subscribe(searchValue => {
        this.searchValue = searchValue;
        this.search(searchValue, 0);
      });
  }

  ngOnInit() {
    this.loadMovies(0);
  }

  loadMovies(page: number) {
    this.loading = true;
    this.movieService.getAllMovies(page).then(response => this.handleResponse(response));
  }

  search(title: string, page: number): void {
    this.loading = true;
    this.movieService.searchByTitle(title, page).then(response => this.handleResponse(response));
  }

  handleResponse(response) {
    this.loading = false;
    this.movies = response.content;
    this.totalPages = response.totalPages;
    this.currentPage = response.number;
    this.updatePagesNumber(response.totalPages, response.number);
  }

  updatePagesNumber(totalPages: number, currentPage: number) {
    this.pagesNumber = [];
    const pagesButtonsAmount = Math.min(totalPages, 9);
    const firstPageIndex = Math.max(0, currentPage - 4);
    const lastPageIndex = Math.min(totalPages, firstPageIndex + pagesButtonsAmount);
    for (let i = firstPageIndex; i < lastPageIndex ; i++) {
      this.pagesNumber.push(i);
    }
  }

  changePage(page: number) {
    console.log('Search value: ' + this.searchValue);
    if (this.searchValue) {
      this.search(this.searchValue, page);
    } else {
      this.loadMovies(page);
    }
  }

  changed(text: string) {
    this.searchValueChanged.next(text);
  }

}
