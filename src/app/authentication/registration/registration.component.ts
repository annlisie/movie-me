/**
 * Created by Ania on 06.06.2017.
 */
import { Component, OnInit } from '@angular/core';
import {Headers, RequestOptions, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Component ({
    selector: 'app-authentication-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
    model: any = {};

    constructor(public http: Http) {
    }

    ngOnInit() {

    }

    register(email: string, password: string) {

        const url = 'http://localhost:8443/users';

        const headers = new Headers ({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers});

        const data = {
            confirmPassword: password,
            email: email,
            password: password
        };

        return this.http.post( url, data, options )
            .map((res: Response) => res.json())
            .subscribe();
    }
}
