import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Movie} from '../../shared/movie.model';
import {MovieService} from '../../shared/movie.service';
import {ContextParameter} from '../rating-form/model/context-parameter.model';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss'],
  providers: [MovieService]
})
export class SingleMovieComponent implements OnInit {

  movie: Movie;
  contextParams: ContextParameter[];

  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.movieService.getSingleMovie(id).then(res => {
        this.movie = res;
        console.log(this.movie);
      });
    });

    this.movieService.getContextParameters()
      .then(response => this.contextParams = response);
  }

  isUserLoggedIn() {
    return localStorage.getItem('currentUser');
  }
}
