import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  board: string;
  errorMessage: string;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService, private router: Router) { }


  ngOnInit() {
    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/home');
    }
    
  }
}
