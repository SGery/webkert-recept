import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  standalone: false
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;
  categories$: Observable<Category[]>;
  selectedCategory: string | null = null;
  searchText: string = '';

  constructor(
    private recipeService: RecipeService,
    private categoryService: CategoryService
  ) {
    this.recipes$ = this.recipeService.getRecipes();
    this.categories$ = this.categoryService.getCategories();
  }

  ngOnInit(): void {}

  filterByCategory(categoryId: string | null): void {
    this.selectedCategory = categoryId;
  }
}