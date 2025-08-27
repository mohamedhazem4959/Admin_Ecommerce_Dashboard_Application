import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICategoriesRes, ICategory } from '../models/categories.model';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private _http: HttpClient, private _auth: AuthService, private router: Router) { }

  private categoriesUrl = environment.apiUrl + '/category';

  getAllCategories(): Observable<ICategoriesRes> {
    return this._http.get<ICategoriesRes>(this.categoriesUrl).pipe(
      catchError(error => {
        console.error('Error fetching categories', error);
        return throwError(() => error);
      })
    );
  }

  getCategoryByRoute(route:string): Observable<ICategory> {
    return this._http.get<ICategory>(`${this.categoriesUrl}/${route}`).pipe(
      catchError(error => {
        console.log('Error fetching category',error);
        return throwError(()=> error)
      })
    )
  }

  addNewCategory(data: ICategory) {
    const token = this._auth.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this._http.post<ICategoriesRes>(`${this.categoriesUrl}`, data, { headers }).pipe(
      catchError(error => {
        console.log('Error while adding category', error)
        throw error
      })
    )
  }

  deleteCategory(route: string, isDeleted: boolean) {
    const token = this._auth.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const payload = { isDeleted }
    return this._http.patch<ICategoriesRes>(`${this.categoriesUrl}/delete/${route}`, payload, { headers }).pipe(
      catchError(error => {
        console.log('Error Ocured when deleting category', error)
        throw error;
      })
    )
  }

  restoreCategory(route: string) {
    const token = this._auth.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    // const payload = { isDeleted }
    return this._http.patch<ICategoriesRes>(`${this.categoriesUrl}/restore/${route}`, {}, { headers }).pipe(
      catchError(error => {
        console.log('Error Ocured when restoring category', error)
        throw error;
      })
    )
  }

  updateCategory(route: string, data: ICategory) {
    const token = this._auth.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this._http.put<ICategory>(`${this.categoriesUrl}/${route}` , data , { headers }).pipe(
      catchError(error => {
        console.log('Error Ocured when updating category' , error)
        throw error
      }) 
    )
  }

}
