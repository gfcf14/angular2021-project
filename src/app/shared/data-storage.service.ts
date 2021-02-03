import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recService.getRecipes();
    return this.http.put('https://ng-course-recipe-book-8feee-default-rtdb.firebaseio.com/recipes.json', recipes)
    .subscribe(response => { console.log(response); });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://ng-course-recipe-book-8feee-default-rtdb.firebaseio.com/recipes.json')
    .pipe(map(recipes => {
      return recipes.map(rec => {
        return {...rec, ingredients: rec.ingredients ? rec.ingredients : []};
      })
    }), tap(recs => {
      this.recService.setRecipes(recs);
    }));
  }
}