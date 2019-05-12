import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Food } from '../model/Food';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html'
})
export class FoodListComponent implements OnInit {

  foods: Observable<Food[]>;

  constructor(private foodService: UserService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {

      if (!this.tokenStorage.getToken()) {
        this.router.navigateByUrl('/home');
      }

    this.reloadData();
  }

  deleteFoods() {
    this.foodService.deleteAll()
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log('ERROR: ' + error));
  }

  reloadData() {
    this.foods = this.foodService.getFood();
  }
}
