import { Component, OnInit } from '@angular/core';
import { MoviesService } from './../movies.service';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  imageUrl = 'https://test-api.storexweb.com/';
  errMsg: string = '';
  movies: any[] = [];


  constructor( private MoviesService: MoviesService) {}

  ngOnInit(): void {
    this.getAllmovies();
  }
  // Get All Movies
  getAllmovies() {
    this.MoviesService.getAllmovies().subscribe({
      next: (res: any) => {
        if (res.status == 'success') {
          this.movies = res?.message;
        } else {
          this.errMsg = 'Not Found';
        }
      },
      error: (error) => {
        this.errMsg = error?.message;
        console.log(error);
      },
    });
  }

  // Delete Single Movie
  deleteMovie(id: any) {
    this.MoviesService.deleteMovie(id).subscribe({
      next: (res: any) => {
        if (res.status == 'success') {
          this.movies = this.movies.filter((movie) => movie.id != id);
          console.log(res);
        }
      },
      error: (error) => {
        this.errMsg = error?.message;
        console.log(error);
      },
    });
  }
}
