import { Component, OnInit } from '@angular/core';
import {Swiper, SwiperOptions} from 'swiper';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

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



}
