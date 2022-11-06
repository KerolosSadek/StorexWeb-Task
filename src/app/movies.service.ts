import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  // Get All Movies
  getAllmovies(): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/movies`)
  }

  // Get All Categories
  getAllCategories(): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/category`)
  }

  // Add Movie
  addMovie(movieData: object) {
    return this.http.post(`${environment.baseUrl}api/movies`, movieData)
  }

  // Update movie
  updateMovie(data: object, id: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}api/movies/${id}`, data)
  }

  getMovieById(id:any): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/movies/${id}`)
  }

  // Delete Movie
  deleteMovie(id:any) {
    return this.http.delete(`${environment.baseUrl}api/movies/${id}`)
  }
  // Browse Movie By Category
  showMovieByCategory(cateId:any) {
    return this.http.get(`${environment.baseUrl}api/moviesByCategory/${cateId}`)
  }

}
