import { Component, OnInit } from '@angular/core';

import {Recipe} from '../recipe.model'
import {RecipesService} from '../recipes.service';

import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css'],
    standalone: false
})
export class RecipeDetailComponent implements OnInit {
  recipeToDisplay!:Recipe;
  id!: number;

  constructor(
              private recipesService: RecipesService,
              private route: ActivatedRoute,
              private router:Router,
              ){}

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeToDisplay = this.recipesService.getRecipe(this.id);
      }
    )
  }

  onDeleteRecipe(){
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
