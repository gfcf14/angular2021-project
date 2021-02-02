import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})

export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recService: RecipeService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    );
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {
    let recipeName: string = '';
    let recipePath: string = '';
    let recipeDescription: string = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recService.getRecipe(this.id);
      const { name, imagePath, description } = recipe;
      [ recipeName, recipePath, recipeDescription ] = [ name, imagePath, description ];

      if (recipe['ingredients']) {
        for (let ing of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ing.name),
            'amount': new FormControl(ing.amount)
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    });
  }
}