import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../models/categories.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css'
})
export class AddCategory implements OnInit{
  constructor(private _categoryS:CategoriesService, private _route:ActivatedRoute, private router: Router){ }

  categoryData:ICategory | null = null;
  categories: ICategory[] = [];

  reactiveForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    parentCategory: new FormControl('') 
  });

  ngOnInit(): void {
    this._categoryS.getAllCategories().subscribe({
      next: res =>{
        this.categories = res.data;
      },
      error: err => {
        console.error('Failed to load categories', err);
      }
    })
  }

  populateForm(category: ICategory) {
    this.reactiveForm.patchValue({
      name: category.name,
      description: category.description,
      parentCategory: category.parentCategory // use lowercase
    });
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      const category: ICategory = {
        name: this.reactiveForm.value.name,
        description: this.reactiveForm.value.description,
        parentCategory: this.reactiveForm.value.parentCategory || null 
      };

      this._categoryS.addNewCategory(category).subscribe({
        next: res => {
          console.log('Category added successfully:', res);
          this.router.navigate(['/categories']);
        },
        error: error => {
          console.log('Error while adding category:', error);
        }
      });
    }
  }

  selectCategory(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.reactiveForm.patchValue({ parentCategory: selectedId });
  }
}
