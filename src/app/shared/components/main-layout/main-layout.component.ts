import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, NavigationEnd, ResolveEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainLayoutComponent implements OnInit {
  mainPage: boolean;
  currentRoute: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    console.log(this.router.url);
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd))
      .subscribe(event => {
        if(event.url === '/'){
          this.mainPage = true;
        }else{
          this.mainPage = false;
        }
        this.currentRoute = event.url;
        console.log('url:', event.url);
      });
  }
  ngOnInit(): void {
  }

}
