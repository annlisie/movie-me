import { Component, OnInit } from '@angular/core';
import {Movie} from './shared/movie.model';
import {MovieService} from './shared/movie.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-movie-catalog',
  templateUrl: './movie-catalog.component.html',
  styleUrls: ['./movie-catalog.component.css'],
  providers: [MovieService]
})
export class MovieCatalogComponent implements OnInit {

  movies: Movie[];

  constructor(private movieService: MovieService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadMovies(0);
  }

  loadMovies(page: number) {
    this.movieService.getMovies(page).then(response => {
      this.movies = response.content;
    });
  }

}
