import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {MovieFilteringParams} from "../../shared/movie-filtering-params.model";
import {Filter} from "./model/filter.model";
import {FilterField} from "./model/filter-field.model";

@Component({
  selector: 'app-movie-catalog-filter',
  templateUrl: './movie-catalog-filter.component.html',
  styleUrls: ['./movie-catalog-filter.component.scss']
})
export class MovieCatalogFilterComponent implements OnInit {

  @Input() filteringParams: MovieFilteringParams;
  @Output() applyFilterEvent = new EventEmitter<MovieFilteringParams>();

  private objectKeys = Object.keys;

  filters: Filter[];
  private selectedFilter: Filter;

  constructor() {
  }

  ngOnInit() {
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
    console.log(JSON.stringify(this.filteringParams));
    this.selectedFilter = null;
    this.callParent();
  }

  clearFilter(key) {
    this.filteringParams[key] = null;
    this.callParent();
  }

  private callParent() {
    this.applyFilterEvent.next(this.filteringParams);
  }

  private generateArray(start: number, end: number): number[] {
    const foo = [];
    for (let i = start; i <= end; i++) {
      foo.push(i);
    }
    return foo;
  }
}
