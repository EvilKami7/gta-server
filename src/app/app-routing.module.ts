import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {PostPageComponent} from "./post-page/post-page.component";
import {NewsPageComponent} from "./news-page/news-page.component";

const routes: Routes = [
  {
    path:'', component: MainLayoutComponent, children: [
      {path:'', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path:'news', component: NewsPageComponent},
      {path:'post/:id', component: PostPageComponent}
    ]
  },
  {
    path: 'admin', loadChildren:() => import('./admin/admin.module').then(m => m.AdminModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
