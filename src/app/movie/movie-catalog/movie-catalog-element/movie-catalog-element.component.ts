import {Component, Input} from '@angular/core';
import {Movie} from '../../shared/movie.model';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-catalog-element',
  templateUrl: './movie-catalog-element.component.html',
  styleUrls: ['./movie-catalog-element.component.scss']
})
export class MovieCatalogElementComponent {

  @Input() movie: Movie;

  constructor(private sanitizer: DomSanitizer, private router: Router) {
  }
}
