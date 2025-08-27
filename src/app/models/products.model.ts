export interface IProducts {
    _id: string;
    name: string;
    stock: number;
    description: string;
    price: number;
    category: {
        _id:string;
        name:string;
    }
    image: string;
    isDeleted: boolean;
    isActive: boolean;
    route: string;
}

export interface IProductsRes {
    msg: string;
    data:IProducts[];
}

export interface IProduct {
    _id:string;
    route:string;
    name:string;
    stock:number;
    description:string;
    price:number;
    category:string;
}

export interface IProductRes {
    msg:string;
    data:IProduct;
}