import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProduct, IProducts, IProductsRes } from '../../models/products.model';
import { environment } from '../../../environments/environment';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { ICategory } from '../../models/categories.model';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-products',
  imports: [RouterLink, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  constructor(private _productsS: ProductsService, private _route: ActivatedRoute, private _categoriesS: CategoriesService, private router: Router, private _Activeroute: ActivatedRoute) { }
  productRoute: string | null = '';
  products: IProducts[] | null = null
  staticUrl = environment.uploadsUrl;
  route: string = '';
  categories: ICategory[] = [];
  selectedFile: File | null = null;


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
    this.productRoute = this._Activeroute.snapshot.paramMap.get('route');
    if (this.productRoute) {
      this._productsS.getProductByRoute(this.productRoute).subscribe({
        next: (productRes) => {
          console.log('Product by route:', productRes);
        }
      })
    }
    this._categoriesS.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      }
    });
    this.loadProducts();
  }

  loadProducts() {
    this._productsS.getAllProducts().subscribe({
      next: (res: IProductsRes) => {
        console.log('API Response:', res); //debug 
        this.products = res.data
      },
      error: err => {
        console.log('Error fetching products: ', err);
        this.products = [];
      }
    })
  }

  goToEditProduct(route: string) {
    this.router.navigate(['/editProduct', route]);
  }

  deleteProduct(route: string, isDeleted: boolean) {
    this._productsS.deleteProduct(route, isDeleted).subscribe({
      next: res => {
        console.log('product deleted: ', res)
        if (this.products) {
          const product = this.products.find(p => p.route === route);
          if (product) {
            product.isDeleted = isDeleted;
          }
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }
  resoteProduct(route: string, isDeleted: boolean) {
    this._productsS.restoreProduct(route).subscribe({
      next: res => {
        console.log('product restored: ', res)
        if (this.products) {
          const product = this.products.find(p => p.route === route);
          if (product) {
            product.isDeleted = isDeleted;
          }
        }
      },
      error: err => {
        console.log(err);
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
    if (this.productRoute && this.reactiveForm.valid) {
      const formData = new FormData();

      Object.keys(this.reactiveForm.value).forEach(key => {
        if (this.reactiveForm.value[key] !== null && this.reactiveForm.value[key] !== undefined) {
          formData.append(key, this.reactiveForm.value[key]);
        }
      });
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this._productsS.updateProduct(this.productRoute, formData).subscribe({
        next: (res) => {
          console.log('Product updated successfully:', res);
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error updating product:', error);
        }
      });
    } else {
      console.error('Product route is not set or form is invalid');
    }
  }
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);
    }
  }

}
