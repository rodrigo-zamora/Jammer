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
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'search/:id', component: SearchComponent },
  { path: 'myList', component: MyListComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'movie-data', component: MovieDataComponent },
  { path: 'subscription', component: SubscriptionComponent },
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
