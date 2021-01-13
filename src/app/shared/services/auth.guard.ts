import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {ProfileService} from './profile.service';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private auth: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private afAuth: AngularFireAuth
  ){}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.auth.currentUser = user;
          if (Object.keys(this.profileService.profile).length === 0) {
            this.profileService.loadProfileAsync(user.uid).subscribe(() => resolve(true))
          }
          else resolve(true);
        }
        else resolve(false);
      })
    });
  }

}
