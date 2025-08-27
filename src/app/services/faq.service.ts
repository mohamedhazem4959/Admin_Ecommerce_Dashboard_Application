import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFaq, IFaqRes } from '../models/faq.model';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  constructor(private _http:HttpClient, private router:Router, private _route:ActivatedRoute , private _auth:AuthService){ }
  BaseUrl = environment.apiUrl;

  getAllFaq(){
    return this._http.get<IFaqRes>(`${this.BaseUrl}/faq`).pipe(
      catchError(error =>{
        console.log(error);
        throw error;
      })
    )
  }

  addNewFaq(data:IFaq){
    const token = this._auth.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const orderedData = {
      question: data.question,
      answer: data.answer
    };

    console.log('Sending data to backend:', orderedData);
    
    return this._http.post<IFaqRes>(`${this.BaseUrl}/faq` , orderedData , { headers }).pipe(
      catchError(err => {
        console.log('Error from backend:', err);
        throw err;
      })
    )
  }

  editFaq(id: string, data: IFaq){
    const token = this._auth.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const orderedData = {
      question: data.question,
      answer: data.answer
    };

    return this._http.put<IFaqRes>(`${this.BaseUrl}/faq/${id}` , orderedData , { headers }).pipe(
      catchError(err => {
        console.log(err);
        throw err;
      })
    )
  }

  deleteFaq(id: string){
    const token = this._auth.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this._http.delete<IFaqRes>(`${this.BaseUrl}/faq/${id}` , { headers }).pipe(
      catchError(err => {
        console.log(err);
        throw err;
      })
    )
  }
}
