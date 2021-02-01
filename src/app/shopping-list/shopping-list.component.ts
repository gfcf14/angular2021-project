import { Component, OnInit } from '@angular/core';

@Component ({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html'
})

export class ShoppingListComponent implements OnInit {
  ingredients = [];

  ngOnInit() {

  }
}