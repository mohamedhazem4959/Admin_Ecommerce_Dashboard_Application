import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { IOrderRes } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private _http:HttpClient, private router:Router, private _authS:AuthService){ }

  private BaseUrl = environment.apiUrl ;

  getAllOrders():Observable<IOrderRes>{
    const token = this._authS.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this._http.get<IOrderRes>(`${this.BaseUrl}/order/admin/orders`,{headers}).pipe(
      catchError(error => {
        console.log('Error while get all orders' , error)
        throw error
      })
    )
  }

  updateOrderStatus(orderStatus:string , id:string):Observable<IOrderRes>{
    const token = this._authS.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const payload = { orderStatus }
    return this._http.put<IOrderRes>(`${this.BaseUrl}/order/${id}`, payload , { headers }).pipe(
      catchError(error => {
        console.log('Error while updating the order status: ' , error)
        throw error
      })
    )
  }

}
