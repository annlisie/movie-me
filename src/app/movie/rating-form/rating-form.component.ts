import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.scss']
})
export class RatingFormComponent implements OnInit {

  @Input() value: number;
  @Output() public valueChange: EventEmitter<string> = new EventEmitter<String>();
  model: any = {};
  public days = [
    { value: 'workday', display: 'Dzień roboczy' },
    { value: 'weekend', display: 'Dzień wolny' }
  ];

  public locations = [
    { value: 'home', display: 'Dom' },
    { value: 'cinema', display: 'Kino' }
  ];

  public ratings: number[]= [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  constructor() { }

  updateRating(value) {
    this.valueChange.emit(value);
  }
  ngOnInit() {
  }

  rateMovie(day, location) {
    console.log(day + ' ' + location + ' ' + this.value);
  }
}
