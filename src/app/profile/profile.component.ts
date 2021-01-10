import { Component, OnInit } from '@angular/core';
import {Profile} from '../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../shared/services/profile.service';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    public profileService: ProfileService,
    public auth: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    //this.profileService.loadProfileAsync(this.auth.currentUser.uid).subscribe((res)=> console.log(res));
    this.form = new FormGroup({
      name: new FormControl(this.profileService.profile.name, [
        Validators.required]),
      email: new FormControl(this.profileService.profile.email, [
        Validators.email,
        Validators.required]),
      bio: new FormControl(this.profileService.profile.bio, [
        Validators.minLength(6)]),
      image: new FormControl(this.profileService.profile.image)
     });
  }

  update() {
    this.profileService.profile = {
      email: this.form.value.email,
      name: this.form.value.name,
      bio: this.form.value.bio,
      image: this.form.value.image,
    };
    this.auth.updateEmail(this.form.value.email).subscribe(() => {console.log('update email')});
    this.profileService.updateProfile(this.auth.currentUser.uid, this.profileService.profile).subscribe(() => {console.log('update profile')});
  }

}
