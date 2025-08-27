export interface SalesReport {
  status: string;
  monthlySales: any[]; // Adjust type as needed based on actual data structure
  overall: {
    totalRevenue: number;
    totalOrders: number;
  };
}
