// export interface ICategories {
//     category:ICategory
//     // _id:string;
//     // name:string;
//     // route:string;
//     // subcategories:ICategories[]
// }


export interface ICategory {
  _id?: string;
  name: string;
  description?: string;
  parentCategory?:{
    _id:string;
    name:string;
  }
  isDeleted?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  route?: string;
  subcategories?: ICategory[];
  products?: any[]; // You can define a product interface if needed
}

export interface ICategoriesRes {
  data: ICategory[];
}