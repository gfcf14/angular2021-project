import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recService: RecipeService,
              private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recService.getRecipes();
    return this.http.put(
      'https://ng-course-recipe-book-8feee-default-rtdb.firebaseio.com/recipes.json',
      recipes)
    .subscribe(response => { console.log(response); });
  }

  fetchRecipes() {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.get<Recipe[]>(
        'https://ng-course-recipe-book-8feee-default-rtdb.firebaseio.com/recipes.json',
        { params: new HttpParams().set('auth', user.token) });
    }),
    map(recipes => {
      return recipes.map(rec => {
        return {...rec, ingredients: rec.ingredients ? rec.ingredients : []};
      })
    }), tap(recs => {
      this.recService.setRecipes(recs);
    }));
  }
}