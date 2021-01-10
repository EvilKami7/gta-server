import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Profile, User} from '../shared/interfaces';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {paramsList} from 'swiper/angular/angular/src/utils/params-list';
import {catchError, concatMap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {concat} from 'rxjs';
import {tokenName} from '@angular/compiler';
import {ProfileService} from '../shared/services/profile.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  message: string;
  token: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private profileService: ProfileService
  ) {
    //отлавливаем изменения в базе данных через next
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']){
        this.message = 'Please, Log In';
      } else if (params['authFailed']){
        this.message = 'Сессия истекла. Войдите заново';
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)])
    });
  }

  submit(){
    console.log(this.form);
    if (this.form.invalid){
      return;
    }
    this.submitted = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.auth.loginAsync(user).pipe(
      concatMap(() => this.profileService.loadProfileAsync(this.auth.currentUser.uid))
    ).subscribe(() => {
      const target = this.profileService.isAdmin() ? ['/admin', 'dashboard'] : ['/', 'profile'];
      this.router.navigate(target);
    })
  }



}
