import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent implements OnInit {

  errMsg: string = '';
  image: File;
  categories = [];
  id;

  movieForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    description: new UntypedFormControl('', [Validators.required]),
    image: new UntypedFormControl(null, [Validators.required]),
    category_id: new UntypedFormControl(null, [Validators.required])
  });

  constructor(private MoviesServices: MoviesService,private ActivatedRoute: ActivatedRoute, private router: Router) {
    this.id = ActivatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getAllCategories();
    if (this.id) {
      this.getSingleMovie();
    }
  }

  getAllCategories() {
    this.MoviesServices.getAllCategories().subscribe({
      next: (res: any) => {
        if (res.status == "success") {
          this.categories = res?.message;
        }
      },
      error: (error) => {
        this.errMsg = error?.message;
      }
    });
  }

  handleImage(event: any) {
    let files = event?.target?.files;
    if (files.length) {
      this.image = files.item(0);
    }
  }

  // Edit Movie
  editMovie(movieForm: UntypedFormGroup) {
    let formData = new FormData();
    if (this.image) {
      formData.append('image', this.image);
    }
    formData.append('name', movieForm?.value?.name);
    formData.append('category_id', movieForm?.value?.category_id);
    formData.append('description', movieForm?.value?.description);

    formData.append('_method', 'put');

    this.MoviesServices.updateMovie(formData, this.id).subscribe({
      next: (res: any) => {
        if (res.status == "success") {
          this.router.navigate(['home']);
          console.log(res)
        }
      },
      error: (error) => {
        this.errMsg = error?.message;
        console.log(error)
      }
    });
  }

  getSingleMovie() {
    this.MoviesServices.getMovieById(this.id).subscribe(
      res => {
        let movie = {
          name: res.message.name,
          description: res?.message?.description,
          category_id: res?.message?.category_id
        }
        this.movieForm.patchValue(movie);
      }
    )
  }


}
