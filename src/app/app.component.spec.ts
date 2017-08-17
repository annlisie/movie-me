/* tslint:disable:no-unused-variable */
import { TestBed, async } from '@angular/core/testing';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { LoginComponent } from "./authentication/login/login.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {HomeComponent} from "./home/home.component";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      declarations: [
        AppComponent,
        RegistrationComponent,
        LoginComponent,
        NavbarComponent,
        HomeComponent

      ],
      providers: [Http]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
