import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule, Routes} from "@angular/router";

import {AppComponent} from "./app.component";
import {RegistrationComponent} from "./authentication/registration/registration.component";
import {LoginComponent} from "./authentication/login/login.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {HomeComponent} from "./home/home.component";
import {RecommendationsComponent} from "./recommendations/recommendations.component";
import {MovieCatalogComponent} from "./movie/movie-catalog/movie-catalog.component";
import {MovieCatalogElementComponent} from "./movie/movie-catalog/movie-catalog-element/movie-catalog-element.component";
import {PaginationComponent} from "./pagination/pagination.component";
import {MovieCatalogFilterComponent} from "./movie/movie-catalog/movie-catalog-filter/movie-catalog-filter.component";
import {AuthenticationService} from "./authentication/authentication.service";
import {EventManager} from "./authentication/event.manager";
import {SingleMovieComponent} from "./movie/movie-catalog/single-movie/single-movie.component";
import {RatingFormComponent} from "./movie/movie-catalog/rating-form/rating-form.component";
import {ChangePasswordComponent} from "./authentication/change-password/change-password.component";
import {UserService} from "./user/user.service";
import {RatingHistoryComponent} from "./movie/movie-catalog/rating-history/rating-history.component";
import {MovieService} from "./movie/shared/movie.service";
import { RatingsComponent } from './ratings/ratings.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'home', component: HomeComponent},
  { path: 'recommendations', component: RecommendationsComponent},
  { path: 'recommendations/:id', component: SingleMovieComponent},
  { path: 'movies', component: MovieCatalogComponent},
  { path: 'movies/:id', component: SingleMovieComponent},
  { path: 'myRatings', component: RatingsComponent},
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
    RecommendationsComponent,
    MovieCatalogComponent,
    MovieCatalogElementComponent,
    PaginationComponent,
    MovieCatalogFilterComponent,
    SingleMovieComponent,
    RatingFormComponent,
    ChangePasswordComponent,
    RatingHistoryComponent,
    RatingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthenticationService, EventManager, UserService, MovieService],
  bootstrap: [AppComponent]
})

export class AppModule { }
