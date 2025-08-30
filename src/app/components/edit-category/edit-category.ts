import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICategory } from '../../models/categories.model';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrls: ['./edit-category.css']
})
export class EditCategory implements OnInit {
  constructor(
    private _categoryS: CategoriesService,
    private _route: ActivatedRoute,
    private router: Router
  ) {}

  categoryRoute: string | null = null;

  reactiveForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    isActive: new FormControl(false)
  });

  ngOnInit() {
    console.log('Form controls initialized:', this.reactiveForm.controls);
    this._route.paramMap.subscribe(params => {
      this.categoryRoute = params.get('route');
      console.log('Route parameter received:', this.categoryRoute);
      if (this.categoryRoute) {
        this.loadCategoryData();
      }
    });
  }

  populateForm(category: ICategory) {
    console.log('Populating form with category data:', category);
    this.reactiveForm.patchValue({
      name: category.name,
      description: category.description,
      isActive: category.isActive ?? false
    });
    console.log('Form values after patching:', this.reactiveForm.value);
  }

  onSubmit() {
    if (this.categoryRoute && this.reactiveForm.valid) {
      const categoryData: ICategory = {
        name: this.reactiveForm.value.name,
        description: this.reactiveForm.value.description,
        parentCategory: this.reactiveForm.value.parentCategory
          ? { _id: this.reactiveForm.value.parentCategory, name: '' }
          : undefined,
        isActive: this.reactiveForm.value.isActive
      };

      this._categoryS.updateCategory(this.categoryRoute, categoryData).subscribe({
        next: (res: any) => {
          console.log('Category updated successfully:', res);
          this.router.navigate(['/categories']);
        },
        error: (err: any) => {
          console.error('Error updating category:', err);
        }
      });
    } else {
      console.error('Category route is not set or form is invalid');
    }
  }

  loadCategoryData() {
    console.log('Loading category data for route:', this.categoryRoute);
    this._categoryS.getCategoryByRoute(this.categoryRoute!).subscribe({
      next: (res: any) => {
        console.log('Category data received:', res);
        if (res.data) {
          this.populateForm(res.data);
        } else {
          console.error('No category data found in response:', res);
        }
      },
      error: (err: any) => {
        console.error('Error fetching category:', err);
      }
    });
  }
}
