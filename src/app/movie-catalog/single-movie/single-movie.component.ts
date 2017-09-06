import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Movie} from '../shared/movie.model';
import {MovieService} from '../shared/movie.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css'],
  providers: [MovieService]
})
export class SingleMovieComponent implements OnInit {

  movie: Movie;

  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.movieService.getSingleMovie(id).then(res => {
        this.movie = res;
      });
    });
  }
}
