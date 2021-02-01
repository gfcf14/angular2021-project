import { Component, OnInit } from '@angular/core';

@Component ({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html'
})

export class RecipeListComponent implements OnInit {
  recipes = [];

  ngOnInit(): void {
    
  }

}