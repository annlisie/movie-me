import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
