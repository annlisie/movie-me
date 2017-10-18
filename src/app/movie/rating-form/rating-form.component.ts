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
    { value: 'Dzien pracujacy', display: 'Dzień pracujący' },
    { value: 'Weekend', display: 'Weekend' },
    { value: '', display: 'Brak' }
  ];

  public companyTypes = [
    { value: 'Samemu', display: 'Samemu' },
    { value: 'Rodzina', display: 'Z rodziną' },
    { value: 'Z partnerem', display: 'Z partnerem' },
    { value: '', display: 'Brak' }
  ];

  public ratings: number[]= [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  constructor() { }

  updateRating(value) {
    this.valueChange.emit(value);
  }
  ngOnInit() {
  }

  rateMovie(day, company) {
    console.log(day + ' ' + company + ' ' + this.value);
  }
}
