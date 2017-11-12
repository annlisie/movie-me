import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContextParameter} from './model/context-parameter.model';
import {MovieService} from '../../shared/movie.service';
import {UserService} from '../../../user/user.service';
import {NgForm, FormGroup} from '@angular/forms';
import {RatingHistoryComponent} from '../rating-history/rating-history.component';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.scss']
})
export class RatingFormComponent implements OnInit {

  @Input() value: number;
  @Input() movieId: number;
  @Input() contextParams: ContextParameter[];
  @Output() public valueChange: EventEmitter<string> = new EventEmitter<String>();
  @Output() public movieRated = new EventEmitter();

  model: any;
  success: boolean;
  error: string;

  constructor(private movieService: MovieService, private userService: UserService) {
  }

  ngOnInit() {
    this.error = '';
  }

  updateRating(value) {
    this.valueChange.emit(value);
  }

  rateMovie(f: NgForm) {
    const keyNames = Object.keys(f.value);
    for (const i of keyNames) {
      if (i !== 'ratingValue' && (f.value[i] === '' || f.value[i].isUndefined)) {
        f.value[i] = 'EMPTY';
      }
    }

    for (const i of keyNames) {
      console.log(i + ' ' + f.value[i]);
    }

    this.success = false;
    this.error = '';
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser == null) {
      this.error = 'Aby móc oceniać musisz być zalogowany!';
    } else {
      this.userService.rateMovie(f.value, this.movieId)
        .subscribe(
          (data) => {
            this.success = true;
            this.movieRated.emit(null);
          }, // Reach here if res.status >= 200 && <= 299
          (err) => {
            const errorArray = JSON.parse(err._body).errors;
            for (let e of errorArray) {
              this.error += e + '. ';
            }
          });
    }
  }
}
