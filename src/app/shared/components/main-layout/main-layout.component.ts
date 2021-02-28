import {Component, DoCheck, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {ProfileService} from '../../services/profile.service';
import {Profile} from '../../interfaces';
import {from} from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainLayoutComponent implements OnInit {
  mainPage: boolean;
  public profile: Profile = {} as Profile;
  dropSvg: any = document.getElementById('dropMenu');
  dropMenu: any = document.getElementsByClassName('drop-menu');
  public isButtonVisible = false;

  constructor(
    private router: Router,
    public auth: AuthService,
    public profileService: ProfileService
    ) {
    console.log(this.router.url);
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd))
      .subscribe(event => {
        event.url === '/' ? this.mainPage = true : this.mainPage = false;
      });
  }

  ngOnInit(): void {

  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logoutAsync().subscribe(() => {
      console.log('Logout complete');
      this.router.navigate(['/', 'login']);
    });
  }

}
