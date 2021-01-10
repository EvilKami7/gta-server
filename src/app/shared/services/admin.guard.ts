import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {ProfileService} from './profile.service';

@Injectable()

export class AdminGuard implements CanActivate{

  constructor(
    private auth: AuthService,
    private profile: ProfileService,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.profile.isAdmin()){
      return true;
    } else {
      this.auth.logoutAsync();
      this.router.navigate(['/', 'login'], {
        queryParams: {
          loginAgain: true
        }
      });
    }
  }

}
