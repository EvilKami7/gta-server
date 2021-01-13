import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostService} from '../shared/services/post.service';
import {Observable} from 'rxjs';
import {Post} from '../shared/interfaces';
import {switchMap} from 'rxjs/operators';
import {AuthService} from '../shared/services/auth.service';
import {ProfileService} from '../shared/services/profile.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post>;
  user: boolean;
  commentControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(6)]);

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private auth: AuthService,
    public profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.user = this.auth.isAuthenticated();
    this.post$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postService.getById(params['id']);
      }));



  }

}
