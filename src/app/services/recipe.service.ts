// TODO

import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: '1',
      name: 'Classic Pancakes',
      description: 'Fluffy and delicious pancakes for a perfect breakfast.',
      preparationTime: 10,
      cookingTime: 15,
      servings: 4,
      difficulty: 'easy',
      imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      userId: 'user1',
      categoryId: '1',
      ingredients: [
        '2 cups all-purpose flour',
        '2 tablespoons sugar',
        '2 teaspoons baking powder',
        '1/2 teaspoon salt',
        '2 large eggs',
        '1 1/2 cups milk',
        '2 tablespoons melted butter'
      ],
      instructions: [
        'Whisk together the flour, sugar, baking powder, and salt in a large bowl.',
        'In a separate bowl, beat the eggs, then add milk and melted butter.',
        'Pour the wet ingredients into the dry ingredients and stir until just combined. Don\'t overmix.',
        'Heat a lightly oiled griddle or frying pan over medium-high heat.',
        'Pour batter onto the griddle, using approximately 1/4 cup for each pancake.',
        'Cook until bubbles form on the surface, then flip and cook until golden brown on both sides.'
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish with eggs, cheese, and pancetta.',
      preparationTime: 15,
      cookingTime: 20,
      servings: 2,
      difficulty: 'medium',
      imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      userId: 'user1',
      categoryId: '2',
      ingredients: [
        '200g spaghetti',
        '100g pancetta or guanciale, diced',
        '2 large eggs',
        '50g Pecorino Romano cheese, grated',
        '50g Parmigiano Reggiano, grated',
        'Freshly ground black pepper',
        '1 clove garlic, minced'
      ],
      instructions: [
        'Bring a large pot of salted water to boil and cook spaghetti according to package instructions.',
        'While pasta is cooking, heat a large skillet over medium heat and cook the pancetta until crispy.',
        'In a bowl, whisk together eggs, grated cheeses, and plenty of black pepper.',
        'When pasta is done, reserve 1/2 cup of pasta water, then drain.',
        'Working quickly, add hot pasta to the skillet with pancetta, remove from heat.',
        'Add the egg and cheese mixture, stirring constantly. Add pasta water as needed to create a creamy sauce.',
        'Serve immediately with extra cheese and black pepper.'
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  private recipesSubject = new BehaviorSubject<Recipe[]>(this.recipes);

  constructor() {}

  getRecipes(): Observable<Recipe[]> {
    return this.recipesSubject.asObservable();
  }

  getRecipesByUserId(userId: string): Observable<Recipe[]> {
    return this.getRecipes().pipe(
      map(recipes => recipes.filter(recipe => recipe.userId === userId))
    );
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.getRecipes().pipe(
      map(recipes => {
        const recipe = recipes.find(r => r.id === id);
        if (!recipe) throw new Error(`Recipe with id ${id} not found`);
        return recipe;
      })
    );
  }

  createRecipe(recipe: Recipe): Promise<string> {
    const newId = Date.now().toString();
    const newRecipe = {
      ...recipe,
      id: newId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.recipes.push(newRecipe);
    this.recipesSubject.next([...this.recipes]);
    
    return Promise.resolve(newId);
  }

  updateRecipe(id: string, data: Partial<Recipe>): Promise<void> {
    const index = this.recipes.findIndex(r => r.id === id);
    if (index !== -1) {
      this.recipes[index] = {
        ...this.recipes[index],
        ...data,
        updatedAt: new Date()
      };
      this.recipesSubject.next([...this.recipes]);
    }
    return Promise.resolve();
  }

  deleteRecipe(id: string): Promise<void> {
    this.recipes = this.recipes.filter(r => r.id !== id);
    this.recipesSubject.next([...this.recipes]);
    return Promise.resolve();
  }
}