///<reference path="../../../../node_modules/@angular/router/router.d.ts"/>
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './auth.service';
import {ProfileService} from './profile.service';
import {catchError, concatMap, map, tap} from 'rxjs/operators';
import {EMPTY, from, Observable, of} from 'rxjs';

@Injectable()

export class UserResolver implements Resolve<any>{

  constructor(
    private auth: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private afAuth: AngularFireAuth
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.pipe(
        tap(user => this.auth.currentUser = user),
        concatMap(user => user ? this.profileService.loadProfileAsync(user.uid) : of({})),
        catchError(error => {
          console.log('Error:', error);
          this.router.navigate(['/']);
          return EMPTY
        })
      ).subscribe((profile) => resolve(profile))
    });
  }

}
