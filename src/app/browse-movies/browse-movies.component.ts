import { Component, OnInit } from '@angular/core';
import { MoviesService } from './../movies.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-movies',
  templateUrl: './browse-movies.component.html',
  styleUrls: ['./browse-movies.component.css']
})

export class BrowseMoviesComponent implements OnInit {
  errMsg: string = '';
  categories = [];
  movies: any[] = [];
  imageUrl = "https://test-api.storexweb.com/";

  movieForm = new UntypedFormGroup({
    category_id: new UntypedFormControl(null, [Validators.required])
  });

  constructor(private MoviesService: MoviesService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.MoviesService.getAllCategories().subscribe({
      next: (res: any) => {
        if (res.status == "success") {
          this.categories = res?.message;
        }
      },
      error: (error) => {
        this.errMsg = error?.message;
        console.log(error);
      }
    });
  }
  // Show Movie By Category
  showMovieByCategory(movieForm) {
    this.MoviesService.showMovieByCategory(movieForm.value.category_id).subscribe({
      next: (res: any) => {
        if (res.status == "success") {
          this.errMsg = "";
          this.movies = res.message;
        } if (res.message.length == 0) {
          this.errMsg = "Not Found";
        }
      },
      error: (error) => {
        this.errMsg = error?.message;
      }
    });
  }

  // Delete Movie
  deleteMovie(id: any) {
    this.MoviesService.deleteMovie(id).subscribe({
      next: (response: any) => {
        if (response.status == "success") {
          this.movies = this.movies.filter(movie => movie.id != id);
        }
      },
      error: (error) => {
        this.errMsg = error?.message;
      }
    });
  }

}
