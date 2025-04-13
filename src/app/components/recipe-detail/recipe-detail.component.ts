import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, of, catchError } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { Category } from '../../models/category.model';
import { RecipeService } from '../../services/recipe.service';
import { CategoryService } from '../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']  
})
export class RecipeDetailComponent implements OnInit {
  recipe$: Observable<Recipe>;
  category$: Observable<Category>;
  
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public recipeService: RecipeService,
    public categoryService: CategoryService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (!recipeId) {
      this.router.navigate(['/recipes']);
      return;
    }
    
    this.recipe$ = this.recipeService.getRecipeById(recipeId).pipe(
      catchError(err => {
        this.snackBar.open('Recipe not found', 'Close', { duration: 3000 });
        this.router.navigate(['/recipes']);
        return of({} as Recipe);
      })
    );
    
    this.category$ = this.recipe$.pipe(
      switchMap(recipe => recipe.categoryId ? 
        this.categoryService.getCategoryById(recipe.categoryId) : 
        of({} as Category)
      )
    );
  }

  deleteRecipe(id: string): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(id)
        .then(() => {
          this.snackBar.open('Recipe deleted successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/recipes']);
        })
        .catch(error => {
          this.snackBar.open('Error deleting recipe', 'Close', { duration: 3000 });
          console.error('Error deleting recipe', error);
        });
    }
  }
}