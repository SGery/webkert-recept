// components/recipe-form/recipe-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { Observable, of } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { RecipeService } from '../../services/recipe.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  standalone: false
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  categories$: Observable<Category[]>;
  difficultyLevels = ['easy', 'medium', 'hard'];
  editMode = false;
  recipeId: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.categories$ = this.categoryService.getCategories();
    
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      preparationTime: [0, [Validators.required, Validators.min(1)]],
      cookingTime: [0, [Validators.required, Validators.min(0)]],
      servings: [1, [Validators.required, Validators.min(1)]],
      difficulty: ['medium', Validators.required],
      imageUrl: [''],
      categoryId: ['', Validators.required],
      ingredients: this.fb.array([this.fb.control('', Validators.required)]),
      instructions: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    
    if (this.recipeId) {
      this.editMode = true;
      this.recipeService.getRecipeById(this.recipeId).subscribe(recipe => {
        // Clear existing form arrays
        while (this.ingredients.length) {
          this.ingredients.removeAt(0);
        }
        while (this.instructions.length) {
          this.instructions.removeAt(0);
        }
        
        // Add ingredients
        for (const ingredient of recipe.ingredients) {
          this.ingredients.push(this.fb.control(ingredient, Validators.required));
        }
        
        // Add instructions
        for (const instruction of recipe.instructions) {
          this.instructions.push(this.fb.control(instruction, Validators.required));
        }
        
        // Update form values
        this.recipeForm.patchValue({
          name: recipe.name,
          description: recipe.description,
          preparationTime: recipe.preparationTime,
          cookingTime: recipe.cookingTime,
          servings: recipe.servings,
          difficulty: recipe.difficulty,
          imageUrl: recipe.imageUrl,
          categoryId: recipe.categoryId
        });
      });
    }
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get instructions() {
    return this.recipeForm.get('instructions') as FormArray;
  }

  addIngredient(): void {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  addInstruction(): void {
    this.instructions.push(this.fb.control('', Validators.required));
  }

  removeInstruction(index: number): void {
    this.instructions.removeAt(index);
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const recipeData: Recipe = {
        ...this.recipeForm.value,
        userId: 'currentUserId', // This would normally come from authentication
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      if (this.editMode && this.recipeId) {
        this.recipeService.updateRecipe(this.recipeId, recipeData)
          .then(() => {
            this.snackBar.open('Recipe updated successfully', 'Close', { duration: 3000 });
            this.router.navigate(['/recipes', this.recipeId]);
          })
          .catch(error => {
            this.snackBar.open('Error updating recipe', 'Close', { duration: 3000 });
            console.error('Error updating recipe', error);
          });
      } else {
        this.recipeService.createRecipe(recipeData)
          .then(id => {
            this.snackBar.open('Recipe created successfully', 'Close', { duration: 3000 });
            this.router.navigate(['/recipes', id]);
          })
          .catch(error => {
            this.snackBar.open('Error creating recipe', 'Close', { duration: 3000 });
            console.error('Error creating recipe', error);
          });
      }
    } else {
      this.markFormGroupTouched(this.recipeForm);
    }
  }

  onCancel(): void {
    if (this.editMode && this.recipeId) {
      this.router.navigate(['/recipes', this.recipeId]);
    } else {
      this.router.navigate(['/recipes']);
    }
  }

  // Helper method to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}