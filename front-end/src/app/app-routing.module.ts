import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { SearchComponent } from './components/search/search.component';
import { MyListComponent } from './components/my-list/my-list.component';
import { MovieDataComponent } from './components/movie-data/movie-data.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list/:id', component: ListComponent },
  { path: 'search/:id', component: SearchComponent },
  { path: 'lists', component: MyListComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: 'home', redirectTo: '' },
  { path: 'movie/:id/:name', component: MovieDataComponent },
  { path: 'subscription', component: SubscriptionComponent },
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
