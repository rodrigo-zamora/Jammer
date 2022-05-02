import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieDataComponent } from './components/movie-data/movie-data.component';
import { SearchComponent } from './components/search/search.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'movie-data', component: MovieDataComponent },
  { path: 'search', component: SearchComponent },
  { path: 'subscription', component: SubscriptionComponent },
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
