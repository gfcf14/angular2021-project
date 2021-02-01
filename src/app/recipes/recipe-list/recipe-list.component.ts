import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component ({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html'
})

export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'this is a test', 'https://www.recipetineats.com/wp-content/uploads/2020/02/Honey-Garlic-Chicken-Breast_5-SQ.jpg')
  ];

  ngOnInit(): void {
    
  }

}