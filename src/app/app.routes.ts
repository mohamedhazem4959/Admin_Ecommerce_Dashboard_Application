import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Orders } from './components/orders/orders';
import { Products } from './components/products/products';
import { Categories } from './components/categories/categories';
import { Testimoinals } from './components/testimoinals/testimoinals';
import { EditProducts } from './components/edit-products/edit-products';
import { AddProduct } from './components/add-product/add-product';
import { EditCategory } from './components/edit-category/edit-category';
import { AddCategory } from './components/add-category/add-category';
import { authGuardGuard } from './guards/auth.gurd-guard';
import { Faq } from './components/faq/faq';

export const routes: Routes = [
    {path: '' , component:Home , canActivate:[authGuardGuard]},
    {path:'login' , component:Login},
    // {path:'login' ,component:Login},
    {path:'register' , component:Register},
    {path:'orders' , component:Orders , canActivate:[authGuardGuard]},
    {path:'products' , component:Products , canActivate:[authGuardGuard]},
    {path:'categories' , component:Categories , canActivate:[authGuardGuard]},
    {path:'testimoinals' , component:Testimoinals , canActivate:[authGuardGuard]},
    {path: 'editProduct/:route' , component:EditProducts, canActivate:[authGuardGuard]},
    {path:'addProduct' , component:AddProduct, canActivate:[authGuardGuard]},
    {path:'editCategory/:route' , component:EditCategory, canActivate:[authGuardGuard]},
    {path:'addCategory' , component:AddCategory, canActivate:[authGuardGuard]},
    {path: 'faq' , component:Faq, canActivate:[authGuardGuard]}
];
