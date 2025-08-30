import { IProduct } from "./products.model";
import { IUserData } from "./user.model";

export interface IOrder {
    _id:string;
    user:IUserData;
    status:string;
    items:IOrderItems[]
    totalPrice:number;
    shippingAdress:string;
    createdAt:string
}

export interface IOrderItems {
    product:IProduct;
    quantity:number;
    price:number;
}

export interface IOrderRes {
    count: number;
    data:IOrder[];
}