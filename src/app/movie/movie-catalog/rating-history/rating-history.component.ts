import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../shared/movie.model';
import {ContextParameter} from '../rating-form/model/context-parameter.model';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-rating-history',
  templateUrl: './rating-history.component.html',
  styleUrls: ['./rating-history.component.scss']
})

export class RatingHistoryComponent implements OnInit {

  @Input() movie: Movie;
  @Input() contextParams: ContextParameter[];

  ngOnInit() {
  }

  getReadableValues(contextParams) {
    const result: string[] = [];
    let tmp: string;
    Object.keys(contextParams).forEach(key => {
      tmp = '';
      this.contextParams.forEach(x => {
        if (x.fieldName === key) {
          tmp = x.readableFieldName;
          x.allowedValues.forEach(y => {
            if (y.value === contextParams[key] && y.value !== 'EMPTY') {
              tmp += ': ' + y.readableValue;
              result.push(tmp);
            }
          });
        }
      });
    });
    return result;
  }

  createRange(number) {
    const items: number[] = [];
    for (let i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  parseDateTime(dateTime: string) {
    let result: string[];
    var re = /-/gi;
    result = dateTime.split('T');
    result[0] = result[0].replace(re, '.');
    result[1] = result[1].slice(0, 5);
    return result[0] + ' ' + result[1];
  }
}
