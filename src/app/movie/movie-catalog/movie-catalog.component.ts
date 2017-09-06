import {Component, OnInit} from '@angular/core';
import {Movie} from '../shared/movie.model';
import {MovieService} from '../shared/movie.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Subject} from 'rxjs/Subject';
import {MoviePageableParams} from '../shared/movie-pageable-params.model';
import {MovieFilteringParams} from '../shared/movie-filtering-params.model';

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

  searchValue: string;
  searchValueChanged: Subject<string> = new Subject<string>();

  loading: boolean;

  pageableParams: MoviePageableParams;
  filteringParams: MovieFilteringParams;

  constructor(private movieService: MovieService) {
    this.pageableParams = new MoviePageableParams();
    this.filteringParams = new MovieFilteringParams();
    this.searchValueChanged
      .debounceTime(500) // wait 500ms after the last event before emitting last event
      .distinctUntilChanged() // only emit if value is different from previous value
      .subscribe(searchValue => {
        this.searchValue = searchValue;
        this.filteringParams.searchedTerm = searchValue;
        this.loadMovies();
      });
  }

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.loading = true;
    this.movieService.getMovies(this.pageableParams, this.filteringParams)
      .then(response => this.handleResponse(response));
  }


  handleResponse(response) {
    this.loading = false;
    this.movies = response.content;
    this.totalPages = response.totalPages;
    this.currentPage = response.number;
  }

  changePage(page: number) {
    this.pageableParams.page = page;
    this.loadMovies();
  }

  changed(text: string) {
    this.searchValueChanged.next(text);
  }

}
