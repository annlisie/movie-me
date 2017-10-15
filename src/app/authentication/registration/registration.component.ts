/**
 * Created by Ania on 06.06.2017.
 */
import { Component, OnInit } from '@angular/core';
import {Headers, RequestOptions, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from 'environments/environment';

@Component ({
    selector: 'app-authentication-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['../authentication.component.scss']
})

export class RegistrationComponent implements OnInit {
    model: any = {};

    constructor(public http: Http) {
    }

    ngOnInit() {

    }

    register(email: string, password: string) {

        const headers = new Headers ({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers});

        const data = {
            confirmPassword: password,
            email: email,
            password: password
        };

        return this.http.post( environment.apiEndpoint + '/users', data, options )
            .map((res: Response) => res.json())
            .subscribe();
    }
}
