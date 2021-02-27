import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Swiper, SwiperOptions} from 'swiper';
import {ViewportScroller} from '@angular/common';
import firebase from 'firebase';
import {Post} from '../shared/interfaces';
import {Observable} from 'rxjs';
import {PostService} from '../shared/services/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  content: any = document.getElementsByClassName('content-wrapper');
  main: HTMLCollectionOf<Element> = document.getElementsByClassName('main-content');
  anchorsId: string[] = [];
  viewPageIndex: number;
  posts$: Observable<Post[]>
  //public slides: string[] = [];
  constructor(private postService: PostService) {
    this.viewPageIndex = 0;
  }


  ngOnInit(): void {
    this.posts$ = this.postService.getAll();
    //console.log(this.content);
    for (const item of this.main){
      this.anchorsId.push(item.id);
    }
/*
    const storage = firebase.storage();
    const storageRef = storage.ref();

    storageRef.child('swiper').listAll().then(res =>  {
      res.items.forEach(itemRef =>{
        this.slides.push('gs://gta-roleplay-87e2e.appspot.com/' + itemRef.fullPath);
        console.log(itemRef.fullPath);
      });
    }).catch(function(error) {
      console.log(error)
    });*/

  }


  public slides = [
    './assets/swiper-images/gtafans-ru-gta-5-wallpapers-43-2560x1600.jpg',
    './assets/swiper-images/gtafans-ru-gta-5-wallpapers-42-2560x1600.jpg',
    './assets/swiper-images/gtafans-ru-gta-5-wallpapers-41-2560x1600.jpg',
    './assets/swiper-images/gtafans-ru-gta-5-wallpapers-40-2560x1600.jpg',
    './assets/swiper-images/gtafans-ru-gta-5-wallpapers-39-2560x1600.jpg',
    './assets/swiper-images/gtafans-ru-gta-5-wallpapers-38-2560x1600.jpg',
    './assets/swiper-images/gtafans-ru-gta-5-wallpapers-29-2560x1600.jpg',
    './assets/swiper-images/gtafans-ru-gta-5-wallpapers-26-2560x1600.jpg',

  ];


  public config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
    pagination: false,
    loop: true,
    autoplay: false,
  };

  public newsConfig: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: true,
    loop: true,
    centeredSlides: true,
    cssMode: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  @HostListener('mousewheel', ['$event'])
  onScroll(event: WheelEvent){
    const wheelDelta = Math.max(-1, Math.min(1, (event.deltaY || -event.detail)));
    if (wheelDelta > 0) {
      if (this.viewPageIndex < this.main.length - 1){
        this.viewPageIndex += 1;
      }
    }else {
      if (this.viewPageIndex > 0){
        this.viewPageIndex -= 1;
      }
    }
    event.preventDefault();
    //console.log(event);
    this.main[this.viewPageIndex].scrollIntoView({block: 'center', behavior: 'smooth'});
  }
}
