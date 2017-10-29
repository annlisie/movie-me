import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {EventManager} from './event.manager';
import {User} from './user.model';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  public token: string;
  public currentUser;


  constructor(private http: Http, private eventManager: EventManager) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.currentUser && this.currentUser.token;
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
        console.log(response.headers);
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

  changePassword(oldPassword: string, newPassword: string, confirmNewPassword: string): Observable<any> {
    console.log(oldPassword);
    if (this.token != null) {
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.currentUser.token
      });
      const options = new RequestOptions({headers: headers});
      return this.http.put(environment.apiEndpoint + '/users/' + this.currentUser.id.toString(), JSON.stringify({
        oldPassword: oldPassword.toString(),
        newPassword: newPassword.toString(),
        confirmNewPassword: confirmNewPassword.toString()
      }), options)
        .map((response: Response) => {
          response.json();
        });
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.eventManager.showNavBar(false);
  }
}
