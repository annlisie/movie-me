import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MovieFilteringParams} from '../../shared/movie-filtering-params.model';
import {Movie} from '../../shared/movie.model';
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
  @Output() applyFilterEvent = new EventEmitter<MovieFilteringParams>();

  private objectKeys = Object.keys; // used in template

  filters: Filter[];
  private selectedFilter: Filter;

  private showGenreFilter = false;
  private genres: Genre[];
  private selectedGenres: Genre[] = [];
  private selectedValue;

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    this.movieService.getGenres()
      .then(response => this.genres = response);
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


  title = 'Zaznacz wszystkie';
  sign = 'check';
  toggleSelect(){
    if(this.title == 'Zaznacz wszystkie'){
      for (var i = 0; i < this.genres.length; i++){
        this.genres[i].checkboxActive = true;
      }
      this.title = 'Odznacz wszystkie';
      this.sign = 'unchecked';
    }
    else {
      for (var i = 0; i < this.genres.length; i++){
        this.genres[i].checkboxActive = false;
      }
      this.title = 'Zaznacz wszystkie';
      this.sign = 'check';
    }
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

  values = [
    {id: 1, name: 'Rok produkcji rosnąco', englishName: 'year', order: 'ASC'},
    {id: 2, name: 'Rok produkcji malejąco', englishName: 'year', order: 'DESC'},
    {id: 3, name: 'Czas trwania rosnąco', englishName: 'lengthMinutes', order: 'ASC'},
    {id: 4, name: 'Czas trwania malejąco', englishName: 'lengthMinutes', order: 'DESC'},
    {id: 5, name: 'Ocena Filmwebu rosnąco', englishName: 'filmwebRating', order: 'ASC'},
    {id: 6, name: 'Ocena Filmwebu malejąco', englishName: 'filmwebRating', order: 'DESC'},
    {id: 7, name: 'Ocena Movieme rosnąco', englishName: 'customRating', order: 'ASC'},
    {id: 8, name: 'Ocena Movieme malejąco', englishName: 'customRating', order: 'DESC'},
    {id: 9, name: 'Liczba ocen rosnąco', englishName: 'numberOfRatings', order: 'ASC'},
    {id: 10, name: 'Liczba ocen malejąco', englishName: 'numberOfRatings', order: 'DESC'}
  ];


  setSelectedValueToSort(){
    var value = this.values[this.selectedValue];

    this.filteringParams.columnToSort = value.englishName;
    this.filteringParams.sortDirection = value.order;

    this.callPartent_loadMovies();
  }

}
