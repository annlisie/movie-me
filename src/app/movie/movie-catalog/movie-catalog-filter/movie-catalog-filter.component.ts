import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MovieFilteringParams} from '../../shared/movie-filtering-params.model';
import {Filter} from './model/filter.model';
import {FilterField} from './model/filter-field.model';
import {Genre} from './model/genre.model';
import {MovieService} from '../../shared/movie.service';

@Component({
  selector: 'app-movie-catalog-filter',
  templateUrl: './movie-catalog-filter.component.html',
  styleUrls: ['./movie-catalog-filter.component.scss']
})
export class MovieCatalogFilterComponent implements OnInit {

  @Input() filteringParams: MovieFilteringParams;
  @Input() includeHideRatedFilter = true;
  @Output() applyFilterEvent = new EventEmitter<MovieFilteringParams>();

  private objectKeys = Object.keys; // used in template

  filters: Filter[];
  private selectedFilter: Filter;

  private showGenreFilter = false;
  private genres: Genre[];
  private selectedGenres: Genre[] = [];

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    this.movieService.getGenres()
      .then(response => {
        this.genres = response;
        if (this.filteringParams.genresIds) {
          for (let i = 0; i < this.filteringParams.genresIds.length; i++) {
            const genreId = this.filteringParams.genresIds[i];
            const genre = this.genres[genreId - 1];
            genre.checkboxActive = true;
            this.selectedGenres.push(genre);
          }
        }
      });
    const ratingValues = this.generateArray(1, 10);
    const productionYearValues = this.generateArray(1930, (new Date()).getFullYear()).reverse();
    this.filters =
      [
        Filter.create(
          'Ocena (Filmweb)', 'glyphicon glyphicon-star', ratingValues,
          x => this.filteringParams.ratingStart = x,
          x => this.filteringParams.ratingEnd = x),

        Filter.create('Czas trwania (min)', 'glyphicon glyphicon-time', null,
          x => this.filteringParams.lengthInMinutesStart = x,
          x => this.filteringParams.lengthInMinutesEnd = x),

        Filter.create('Rok produkcji', 'glyphicon glyphicon-calendar', productionYearValues,
          x => this.filteringParams.productionYearStart = x,
          x => this.filteringParams.productionYearEnd = x)
      ];
  }

  setSelectedFilter(filter: Filter) {
    this.showGenreFilter = false;
    if (this.selectedFilter === filter) {
      this.selectedFilter = null;
    } else {
      this.selectedFilter = filter;
    }
  }

  updateFilters(filter: Filter) {
    const fields: FilterField[] = filter.fields;
    for (const field of fields) {
      if (field.value != null) {
        field.action(field.value);
      }
    }
    this.selectedFilter = null;
    this.callPartent_loadMovies();
  }

  updateGenresFilter() {
    this.collectSelectedGenres();
    const idsOfSelectedGenres = this.getIdsOfSelectedGenres();

    if (idsOfSelectedGenres.length > 0) {
      this.filteringParams.genresIds = idsOfSelectedGenres;
    } else {
      this.filteringParams.genresIds = null;
    }

    this.showGenreFilter = false;
    this.callPartent_loadMovies();
  }

  clearFilter(key) {
    this.filteringParams[key] = null;
    this.callPartent_loadMovies();
  }

  clearGenre(index: number) {
    this.selectedGenres[index].checkboxActive = false;
    this.updateGenresFilter();
  }

  showOrHideGenreFilter() {
    this.selectedFilter = null;
    this.showGenreFilter = !this.showGenreFilter;
  }

  private callPartent_loadMovies() {
    this.applyFilterEvent.next(this.filteringParams);
  }

  private collectSelectedGenres() {
    this.selectedGenres = [];
    for (let i = 0; i < this.genres.length; i++) {
      const genre = this.genres[i];
      if (genre.checkboxActive) {
        this.selectedGenres.push(genre);
      }
    }
  }

  private getIdsOfSelectedGenres(): number[] {
    const selectedGenresIds: number[] = [];
    for (let i = 0; i < this.selectedGenres.length; i++) {
      const selectedGenre = this.selectedGenres[i];
      if (selectedGenre.checkboxActive) {
        selectedGenresIds.push(selectedGenre.id);
      }
    }
    return selectedGenresIds;
  }

  private generateArray(start: number, end: number): number[] {
    const foo = [];
    for (let i = start; i <= end; i++) {
      foo.push(i);
    }
    return foo;
  }

  showOrHideRatedMovies() {
    this.filteringParams.hideRated = !this.filteringParams.hideRated;
    this.callPartent_loadMovies();
  }

  isUserLoggedIn() {
    return localStorage.getItem('currentUser');
  }
}
