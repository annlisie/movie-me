import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { LoginComponent } from './authentication/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ClassicSearchComponent } from './search/classicSearch/classicSearch.component';
import { ContextSearchComponent } from './search/contextSearch/contextSearch.component';
import { MovieCatalogComponent } from './movie-catalog/movie-catalog.component';
import { SingleMovieComponent } from './movie-catalog/single-movie/single-movie.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'home', component: HomeComponent},
  // { path: 'search', component: SearchComponent},
  { path: 'search/classic', component: ClassicSearchComponent},
  { path: 'search/context', component: ContextSearchComponent},
  { path: 'movies', component: MovieCatalogComponent},
  { path: 'movies/:id', component: SingleMovieComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    SearchComponent,
    ClassicSearchComponent,
    ContextSearchComponent,
    MovieCatalogComponent,
    SingleMovieComponent
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
