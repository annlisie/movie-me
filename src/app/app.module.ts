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
import {SearchComponent} from "./search/search.component";
import {ClassicSearchComponent} from "./search/classicSearch/classicSearch.component";
import {ContextSearchComponent} from "./search/contextSearch/contextSearch.component";
import {MovieCatalogComponent} from "./movie/movie-catalog/movie-catalog.component";
import {MovieCatalogElementComponent} from "./movie/movie-catalog/movie-catalog-element/movie-catalog-element.component";
import {PaginationComponent} from "./pagination/pagination.component";
import {MovieCatalogFilterComponent} from "./movie/movie-catalog/movie-catalog-filter/movie-catalog-filter.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'home', component: HomeComponent},
  // { path: 'search', component: SearchComponent},
  { path: 'search/classic', component: ClassicSearchComponent},
  { path: 'search/context', component: ContextSearchComponent},
  { path: 'movies', component: MovieCatalogComponent},
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
    MovieCatalogElementComponent,
    PaginationComponent,
    MovieCatalogFilterComponent
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
