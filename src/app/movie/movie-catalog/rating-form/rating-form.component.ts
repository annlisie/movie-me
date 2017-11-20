import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContextParameter} from './model/context-parameter.model';
import {MovieService} from '../../shared/movie.service';
import {UserService} from '../../../user/user.service';
import {NgForm} from '@angular/forms';

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
