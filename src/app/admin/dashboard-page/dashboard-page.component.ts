import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../shared/services/post.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {post} from 'selenium-webdriver/http';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchStr = '';

  constructor(private postsService: PostService) { }

  ngOnInit(): void {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  remove(id: string) {
    this.dSub = this.postsService.remove(id).subscribe( () => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
  }

  ngOnDestroy(): void {
    if (this.pSub){
      this.pSub.unsubscribe();
    }
    if (this.dSub){
      this.dSub.unsubscribe();
    }
  }


}
