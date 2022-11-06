import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit {
  errMsg: string = '';
  image: File;
  categories = [];

  movieForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    category_id: new UntypedFormControl(null, [Validators.required]),
    description: new UntypedFormControl('', [Validators.required]),
    image: new UntypedFormControl(null, [Validators.required]),
  });
  isSubmit: boolean;

  constructor(private MoviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  handleImage(event: any) {
    let files = event?.target?.files;
    if (files.length) {
      this.image = files.item(0);
    }
  }

  addMovie(movieForm: UntypedFormGroup) {
    this.isSubmit = true;

    let formData = new FormData();
    formData.append('name', movieForm?.value?.name);
    formData.append('description', movieForm?.value?.description);
    formData.append('category_id', movieForm?.value?.category_id);
    if (this.image) {
      formData.append('image', this.image);
    }

    this.MoviesService.addMovie(formData).pipe(finalize( () => (this.isSubmit = false))).subscribe({
        next: (res: any) => {
          this.router.navigate(['home']);
        },
        error: (error) => {
          this.errMsg = error?.message;
        },
      });
  }

  getAllCategories() {
    this.MoviesService.getAllCategories().subscribe({
      next: (res: any) => {
        if (res.status == 'success') {
          this.categories = res?.message;
        }
      },
      error: (error) => {
        this.errMsg = error?.message;
      },
    });
  }
}
