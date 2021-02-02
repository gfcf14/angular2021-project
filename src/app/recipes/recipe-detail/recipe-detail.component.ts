import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component ({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})

export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recService.getRecipe(this.id);
    })
  }

  onAddToShoppingList() {
    this.recService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}