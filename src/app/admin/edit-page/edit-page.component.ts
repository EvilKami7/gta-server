import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostService} from '../../shared/services/post.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../../shared/interfaces';
import {FormControl, FormGroup, FormGroupName, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  post: Post;
  submitted = false;
  uSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
    ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params.id);
      })
    ).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        descrip: new FormControl(post.descrip, Validators.required),
        text: new FormControl(post.text, Validators.required),
        image: new FormControl(post.image, Validators.required),
      });
    });
  }

  ngOnDestroy(): void{
    if (this.uSub){
      this.uSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid){
      return;
    }
    this.submitted = true;
    this.uSub = this.postService.update({
      ...this.post,
      text: this.form.value.text,
      descrip: this.form.value.descrip,
      title: this.form.value.title,
      image: this.form.value.image
    }).subscribe( () => {
      this.submitted = false;
    });
  }

}
