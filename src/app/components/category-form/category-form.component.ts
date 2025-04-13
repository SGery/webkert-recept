import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  standalone: false
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  categories$: Observable<Category[]>;
  editMode = false;
  currentCategoryId: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {
    this.categories$ = this.categoryService.getCategories();
    
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categoryData: Category = this.categoryForm.value;
      
      if (this.editMode && this.currentCategoryId) {
        this.categoryService.updateCategory(this.currentCategoryId, categoryData)
          .then(() => {
            this.snackBar.open('Category updated successfully', 'Close', { duration: 3000 });
            this.resetForm();
          })
          .catch(error => {
            this.snackBar.open('Error updating category', 'Close', { duration: 3000 });
            console.error('Error updating category', error);
          });
      } else {
        this.categoryService.createCategory(categoryData)
          .then(() => {
            this.snackBar.open('Category created successfully', 'Close', { duration: 3000 });
            this.resetForm();
          })
          .catch(error => {
            this.snackBar.open('Error creating category', 'Close', { duration: 3000 });
            console.error('Error creating category', error);
          });
      }
    }
  }

  editCategory(category: Category): void {
    this.editMode = true;
    this.currentCategoryId = category.id || null;
    
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description || '',
      imageUrl: category.imageUrl || ''
    });
  }

  deleteCategory(id: string): void {
    if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      this.categoryService.deleteCategory(id)
        .then(() => {
          this.snackBar.open('Category deleted successfully', 'Close', { duration: 3000 });
          if (this.currentCategoryId === id) {
            this.resetForm();
          }
        })
        .catch(error => {
          this.snackBar.open('Error deleting category', 'Close', { duration: 3000 });
          console.error('Error deleting category', error);
        });
    }
  }

  resetForm(): void {
    this.editMode = false;
    this.currentCategoryId = null;
    this.categoryForm.reset();
  }
}