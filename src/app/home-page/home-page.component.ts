import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Swiper, SwiperOptions} from 'swiper';
import {ViewportScroller} from '@angular/common';

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
  constructor() {
    this.viewPageIndex = 0;
  }

  ngOnInit(): void {
    console.log(this.content);
    for (const item of this.main){
      this.anchorsId.push(item.id);
    }
  }



  public slides = [
    'http://www.gtafans.ru/sites/default/files/imagepicker/1/gtafans-ru-gta-5-wallpapers-43-2560x1600.jpg',
    'http://www.gtafans.ru/sites/default/files/imagepicker/1/gtafans-ru-gta-5-wallpapers-42-2560x1600.jpg',
    'http://www.gtafans.ru/sites/default/files/imagepicker/1/gtafans-ru-gta-5-wallpapers-41-2560x1600.jpg',
    'http://www.gtafans.ru/sites/default/files/imagepicker/1/gtafans-ru-gta-5-wallpapers-40-2560x1600.jpg',
    'http://www.gtafans.ru/sites/default/files/imagepicker/1/gtafans-ru-gta-5-wallpapers-39-2560x1600.jpg',
    'http://www.gtafans.ru/sites/default/files/imagepicker/1/gtafans-ru-gta-5-wallpapers-38-2560x1600.jpg',
    'http://www.gtafans.ru/sites/default/files/imagepicker/1/gtafans-ru-gta-5-wallpapers-29-2560x1600.jpg',
    'http://www.gtafans.ru/sites/default/files/imagepicker/1/gtafans-ru-gta-5-wallpapers-28-2560x1600.jpg',
    'http://www.gtafans.ru/sites/default/files/imagepicker/1/gtafans-ru-gta-5-wallpapers-27-2560x1600.jpg',
    'http://www.gtafans.ru/sites/default/files/imagepicker/1/gtafans-ru-gta-5-wallpapers-26-2560x1600.jpg',
    'http://www.gtafans.ru/sites/default/files/imagepicker/1/gtafans-ru-gta-5-wallpapers-20-2560x1600.jpg'
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
  };

  @HostListener('mousewheel', ['$event'])
  onScroll(event: WheelEvent){
    const wheelDelta = Math.max(-1, Math.min(1, (event.deltaY || -event.detail)));
    if (wheelDelta > 0) {
      if (this.viewPageIndex < this.main.length){
        this.viewPageIndex += 1;
      }
    }else {
      if (this.viewPageIndex > 0){
        this.viewPageIndex -= 1;
      }
    }
    event.preventDefault();
    console.log(event);
    this.main[this.viewPageIndex].scrollIntoView({block: 'center', behavior: 'smooth'});
  }
}
