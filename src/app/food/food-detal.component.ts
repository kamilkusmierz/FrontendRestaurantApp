import { OnInit, Component, Input } from '@angular/core';
import { Food } from '../model/Food';
import { UserService } from '../services/user.service';
import { FoodListComponent } from './food.component';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fooddetal',
  templateUrl: './food-detal.component.html'
})
export class FoodDetailsComponent implements OnInit {

  @Input() food: Food;

  constructor(private foodService: UserService, private listComponent: FoodListComponent, private tokenStorage: TokenStorageService
    , private router: Router) { }

  ngOnInit() {
    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/home');
    }
  }



  deleteFood() {
    this.foodService.deleteFood(this.food.id)
      .subscribe(
        data => {
          console.log(data);
          this.listComponent.reloadData();
        },
        error => console.log(error));
  }
}
