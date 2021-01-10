import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {User} from '../shared/interfaces';
import {Router} from '@angular/router';
import {ProfileService} from '../shared/services/profile.service';
import {concatMap} from 'rxjs/operators';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.scss']
})
export class SignPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    public profileService: ProfileService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required]),
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
      returnSecureToken: true,
    };
    this.profileService.profile = {
      email: this.form.value.email,
      name: this.form.value.name,
      admin: 0
    };
    this.auth.registerAsync(user).pipe(
      concatMap((res) => this.profileService.saveProfileAsync(res.user.uid))
    ).subscribe( () => {
        this.form.reset();
        this.router.navigate(['/', 'login'])
    });

    /*this.auth.register(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/', 'news']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });*/
  }

}
