import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { ICategory } from '../../models/categories.model';
import { ProductsService } from '../../services/products.service';
import { IProducts, IProductsRes } from '../../models/products.model';
import { IProductRes } from '../../models/product-report.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-categories',
  imports: [RouterLink,CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit{
  constructor(private _categoryS:CategoriesService, private _route:ActivatedRoute, private router:Router, private activeRoute:ActivatedRoute,
  ){}
  categories: ICategory[] | null = null;
  route:string = '';

  ngOnInit(): void {
    this._categoryS.getAllCategories().subscribe({
      next: res =>{
        this.categories = res.data;
        console.log(this.categories.at(0)?.subcategories);
      },
      error: err => {
        console.log('Failed to load categories: ' , err)
      }
    });
  }

  deleteCategory(route: string, isDeleted: boolean) {
    this._categoryS.deleteCategory(route, isDeleted).subscribe({
      next: res => {
        if (this.categories) {
          // Helper function to update isDeleted recursively
          const updateIsDeleted = (cats: ICategory[]) => {
            for (let cat of cats) {
              if (cat.route === route) {
                cat.isDeleted = isDeleted;
              }
              if (cat.subcategories && cat.subcategories.length > 0) {
                updateIsDeleted(cat.subcategories);
              }
            }
          };
          updateIsDeleted(this.categories);
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  resoteCategory(route: string, isDeleted: boolean) {
    this._categoryS.restoreCategory(route).subscribe({
      next: res => {
        if (this.categories) {
          // Helper function to update isDeleted recursively
          const updateIsDeleted = (cats: ICategory[]) => {
            for (let cat of cats) {
              if (cat.route === route) {
                cat.isDeleted = isDeleted;
              }
              if (cat.subcategories && cat.subcategories.length > 0) {
                updateIsDeleted(cat.subcategories);
              }
            }
          };
          updateIsDeleted(this.categories);
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }


}
