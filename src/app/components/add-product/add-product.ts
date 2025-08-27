import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { ICategory } from '../../models/categories.model';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducts } from '../../models/products.model';
import { IUpdateProduct } from '../../models/product-report.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct implements OnInit{
  constructor(
    private _updateS: ProductsService,
    private _categoriesS: CategoriesService,
    private _route: ActivatedRoute,
    private router: Router
  ) { }

  productData: IProducts | null = null;
  selectedFile: File | null = null;
   categories: ICategory[] = [];
  
  reactiveForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    isActive: new FormControl(true),
    price: new FormControl(0),
    category: new FormControl(''),
    image: new FormControl(''),
    stock: new FormControl(0)
  });

  ngOnInit(): void {
    this._categoriesS.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      }
    });
  }
  populateForm(product: IProducts) {
    this.reactiveForm.patchValue({
      name: product.name,
      description: product.description,
      isActive: product.isActive,
      price: product.price,
      category: product.category._id,
      image: product.image,
      stock: product.stock
    });
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      const formData = new FormData();

      Object.keys(this.reactiveForm.value).forEach(key => {
        if (this.reactiveForm.value[key] !== null && this.reactiveForm.value[key] !== undefined) {
          formData.append(key, this.reactiveForm.value[key]);
        }
      });
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this._updateS.addProduct(formData).subscribe({
        next: (res) => {
          console.log('Product added successfully:', res);
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error adding product:', error);
        }
      });
    }
  }

  selectCategory(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selected = this.categories.find(p => p._id === selectedId);
    if (!selected) return;
    this.reactiveForm.patchValue({ category: selected._id });
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);
    }
  }
}
