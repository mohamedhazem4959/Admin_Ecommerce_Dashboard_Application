import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserReport } from '../models/user-report.model';
import { SalesReport } from '../models/sales-report.model';
import { ProductReport } from '../models/product-report.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:3000/api/report';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getUserReport(): Observable<UserReport> {
    return this.http.get<UserReport>(`${this.apiUrl}/userReport`, {
      headers: this.getHeaders()
    });
  }

  getSalesReport(): Observable<SalesReport> {
    return this.http.get<SalesReport>(`${this.apiUrl}/salesReport`, {
      headers: this.getHeaders()
    });
  }

  getProductReport(): Observable<ProductReport> {
    return this.http.get<ProductReport>(`${this.apiUrl}/productReport`, {
      headers: this.getHeaders()
    });
  }
}
