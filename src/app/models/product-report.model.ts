export interface Product {
  _id: string;
  name: string;
  stock: number;
  description: string;
  price: number;
  category: string;
  image: string;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  route: string;
}

export interface IProductRes {
  msg:string;
  data:Product;
}

export interface TopProduct {
  _id: string;
  totalSold: number;
  product: Product;
}

export interface LowStockProduct {
  _id: string;
  name: string;
  stock: number;
}

export interface ProductReport {
  status: string;
  topProducts: TopProduct[];
  lowStock: LowStockProduct[];
}

export interface IUpdateProduct {
  name:string;
  description:string;
  isActive:boolean;
  price:number;
  category:string;
  image:string;
  stock:number;
}
