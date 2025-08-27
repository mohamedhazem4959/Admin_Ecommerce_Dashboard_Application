import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';
import { ITestimoinalsRes } from '../models/testimoinals.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestimoinalsService {
  constructor(private _http:HttpClient, private router:Router, private _authS:AuthService){ }

  private BaseUrl: string = environment.apiUrl
  getAllTestimoinals(){
    const token = this._authS.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this._http.get<ITestimoinalsRes>(`${this.BaseUrl}/testimonial/admin`,{ headers }).pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    )
  }

  deleteTestimoinal(id:string){
    const token = this._authS.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this._http.patch<ITestimoinalsRes>(`${this.BaseUrl}/testimonial/admin/${id}`,{},{ headers }).pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    )
  }
}
