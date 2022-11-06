import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { NoAuthGuard } from './auth/no-auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { BrowseMoviesComponent } from './browse-movies/browse-movies.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { UpdateMovieComponent } from './update-movie/update-movie.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: "login", component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: "addMovie", component: AddMovieComponent, canActivate: [AuthGuard] },
  { path: "updateMovie/:id", component: UpdateMovieComponent, canActivate: [AuthGuard] },
  { path: "browseMovies", component: BrowseMoviesComponent, canActivate: [AuthGuard] },

  { path: "**", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
