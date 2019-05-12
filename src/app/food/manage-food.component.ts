import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managefood',
  templateUrl: './manage-food.component.html'
})
export class ManageFoodComponent implements OnInit  {

  constructor( private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {

    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/home');
    }


}
}
