import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostComponent } from './shared/components/post/post.component';
import { NewsPageComponent } from './news-page/news-page.component';
import {SWIPER_CONFIG, SwiperModule, SwiperConfigInterface} from 'ngx-swiper-wrapper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {AuthService} from './shared/services/auth.service';
import {AuthGuard} from './shared/services/auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './shared/auth.interceptor';
import { SignPageComponent } from './sign-page/sign-page.component';
import {AdminGuard} from './shared/services/admin.guard';
import { ProfileComponent } from './profile/profile.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {ProfileService} from './shared/services/profile.service';

registerLocaleData(ruLocale, 'ru');

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAr2e7j4Yd-Ltj5tOV236I5qsj_-AkPAns',
  authDomain: 'gta-roleplay-87e2e.firebaseapp.com',
  databaseURL: 'https://gta-roleplay-87e2e-default-rtdb.firebaseio.com',
  projectId: 'gta-roleplay-87e2e',
  storageBucket: 'gta-roleplay-87e2e.appspot.com',
  messagingSenderId: '276477598385',
  appId: '1:276477598385:web:14399129dc6030f6d56090'
};

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
    NewsPageComponent,
    SignPageComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [    {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  },
    AuthService,
    ProfileService,
    AdminGuard,
    AuthGuard,
    INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
