import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report.service';
import { UserReport } from '../../models/user-report.model';
import { SalesReport } from '../../models/sales-report.model';
import { ProductReport } from '../../models/product-report.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  userReport: UserReport | null = null;
  salesReport: SalesReport | null = null;
  productReport: ProductReport | null = null;
  loading = true;
  error: string | null = null;

  constructor(private _reportS: ReportService) {}

  ngOnInit(): void {
    this.fetchReports();
  }

  fetchReports(): void {
    this.loading = true;
    this.error = null;

    Promise.all([
      this._reportS.getUserReport().toPromise(),
      this._reportS.getSalesReport().toPromise(),
      this._reportS.getProductReport().toPromise()
    ]).then(([userReport, salesReport, productReport]) => {
      this.userReport = userReport || null;
      this.salesReport = salesReport || null;
      this.productReport = productReport || null;
      this.loading = false;
    }).catch(error => {
      this.error = 'Failed to fetch reports';
      this.loading = false;
      console.error('Error fetching reports:', error);
    });
  }
}
