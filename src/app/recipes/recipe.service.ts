import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG/1280px-Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg/800px-Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    ),
    new Recipe(
      'Fried Chicken',
      `A hungry man's best friend`,
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Fried_chicken_-_Arnold_Gatilao.jpg/1280px-Fried_chicken_-_Arnold_Gatilao.jpg',
      [
        new Ingredient('Chicken', 1)
      ]
    )
  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ings: Ingredient[]) {
    this.slService.addIngredients(ings);
  }

  addRecipe(rec: Recipe) {
    this.recipes.push(rec);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRec: Recipe) {
    this.recipes[index] = newRec;
    this.recipesChanged.next(this.recipes.slice());
  }
}