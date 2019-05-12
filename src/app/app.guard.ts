import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot,  RouterStateSnapshot } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';

@Injectable()
export class AppGuard {
  private firstNavigation = true;
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.firstNavigation) {
this.firstNavigation = false;
  if (route.component !== AdminComponent) {
    this.router.navigateByUrl('/');
    return false;
  } else {
    return true;
  }

    }

  }
}
