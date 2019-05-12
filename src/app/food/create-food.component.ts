import { Component, OnInit } from '@angular/core';
import { Food } from '../model/Food';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createfood',
  templateUrl: './create-food.component.html'
})
export class CreateFoodComponent implements OnInit {
  food: Food = new Food(null, null, null);
  submitted = false;

  constructor(private foodService: UserService, private tokenStorage: TokenStorageService, private router: Router ) { }

  ngOnInit() {
    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/home');
    }
  }

  newFood(): void {
    this.submitted = false;
    this.food = new Food(null, null, null);
  }

  save() {
    this.foodService.addFood(this.food)
      .subscribe(data => console.log(data), error => console.log(error));

  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
