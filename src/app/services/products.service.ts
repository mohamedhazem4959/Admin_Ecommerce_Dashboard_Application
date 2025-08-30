import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable } from 'rxjs';
import { IProduct, IProductRes, IProductsRes } from '../models/products.model';
import { IUpdateProduct } from '../models/product-report.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _http: HttpClient, private _auth: AuthService, private _router: Router) { }
  private productsUrl = environment.apiUrl + '/product/dashboard/products';
  private BaseUrl = environment.apiUrl;

  getAllProducts(): Observable<IProductsRes> {
    const token = this._auth.getAuthToken();
    if (!token) {
      this._router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this._http.get<IProductsRes>(`${this.productsUrl}`,{headers}).pipe(
      catchError(error => {
        console.error('HTTP Error:', error);
        throw error
      })
    )
  }

  getProductByRoute(route: string) {
    return this._http.get<IProductRes>(`${this.BaseUrl}/product/dashboard/${route}`);
  }

  updateProduct(route: string, updateProductData: any): Observable<IProductsRes> {
    const token = this._auth.getAuthToken();
    if (!token) {
      this._router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this._http.put<IProductsRes>(`${this.BaseUrl}/product/${route}`, updateProductData, { headers }).pipe(
      catchError(error => {
        console.error('Error ocured wil updating product: ', error);
        throw error
      })
    )
  }
  isDeleted: boolean = false;
  payload = { isDeleted: this.isDeleted };

  deleteProduct(route: string, isDeleted: boolean) {
    const token = this._auth.getAuthToken();
    if (!token) {
      this._router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const payload = { isDeleted }
    return this._http.patch<IProductRes>(`${this.BaseUrl}/product/${route}` ,payload, { headers } ).pipe(
      catchError(error => {
        console.log('Error Ocured when deleting product' , error)
        throw error;
      })
    )
  }
  restoreProduct(route: string) {
    const token = this._auth.getAuthToken();
    if (!token) {
      this._router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    // const payload = { isDeleted }
    return this._http.patch<IProductRes>(`${this.BaseUrl}/product/restore/${route}`,{}, { headers } ).pipe(
      catchError(error => {
        console.log('Error Ocured when restoring product' , error)
        throw error;
      })
    )
  }

  addProduct(newProduct:any){
        const token = this._auth.getAuthToken();
    if (!token) {
      this._router.navigate(['/login']);
      return throwError(() => new Error('User is not authenticated'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this._http.post<IProductRes>(`${this.BaseUrl}/product`,newProduct , {headers}).pipe(
      catchError(error => {
        console.log('Error Ocured when added product' , error)
        throw error;
      })
    )
  }
}
