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
  @Output() public valueChange: EventEmitter<string> = new EventEmitter<String>();
  contextParams: ContextParameter[];
  model: any;

  constructor(private movieService: MovieService, private userService: UserService) {
  }

  ngOnInit() {
    this.movieService.getContextParameters()
      .then(response => this.contextParams = response);
  }

  updateRating(value) {
    this.valueChange.emit(value);
  }

  rateMovie(f: NgForm) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser == null) {
      alert('Aby oceniać musisz być zalogowany!');
    } else {
      this.userService.rateMovie(f.value, this.movieId)
        .subscribe(
          (data) => {
            console.log(data);
          }, // Reach here if res.status >= 200 && <= 299
          (err) => {
            console.log(err);
          });
    }
  }
}
