import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {EventManager} from './event.manager';
import {User} from './user.model';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http, private eventManager: EventManager, private router: Router) {
  }

  register(email: string, password: string, confirmPassword: string): Observable<Response> {
    const headers = new Headers ({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers});
    return this.http.post(environment.apiEndpoint + '/users', JSON.stringify({ email: email, password: password, confirmPassword: confirmPassword }), options)
      .map((response: Response) => {
        return response.json();
      });
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(environment.apiEndpoint + '/login', JSON.stringify({ email: email, password: password }))
      .map((response: Response) => {
        if (response.json().status === 'OK') {
          const token = response.headers.get('authorization');
          const userId = response.json().data.id;
          const userEmail = response.json().data.email;
          localStorage.setItem('currentUser', JSON.stringify({ id: userId, email: userEmail, token: token }));
          this.eventManager.showNavBar(true);
          return true;
        } else {
          return false;
        }
      });
  }

  changePassword(oldPassword: string, newPassword: string, confirmNewPassword: string) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);
    const headers = new Headers({
      'Authorization': currentUser.token,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    const options = new RequestOptions({headers: headers});
    return this.http.put(environment.apiEndpoint + '/users/' + currentUser.id.toString(), JSON.stringify({
      oldPassword: oldPassword.toString(),
      newPassword: newPassword.toString(),
      confirmNewPassword: confirmNewPassword.toString()
    }), options)
      .map((response: Response) => {
        response.json();
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.clear();
    this.eventManager.showNavBar(false);
  }
}
