import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { SearchComponent } from './components/search/search.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MyListComponent } from './components/my-list/my-list.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ListCardComponent } from './components/list-card/list-card.component';
import { MovieDataComponent } from './components/movie-data/movie-data.component';
import { GlobalThemeComponent } from './components/global-theme/global-theme.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CarouselBasicComponent } from './components/carousel-basic/carousel-basic.component';
import { GenreComponentComponent } from './components/genre-component/genre-component.component';
import { DialogOverviewExampleDialogComponent } from './components/dialog-overview-example-dialog/dialog-overview-example-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    NavBarComponent,
    GlobalThemeComponent,
    CarouselBasicComponent,
    HomeComponent,
    GenreComponentComponent,
    FooterComponent,
    MovieDataComponent,
    SearchComponent,
    SubscriptionComponent,
    PaymentComponent,
    PageNotFoundComponent,
    MyListComponent,
    ListComponent,
    ListCardComponent,
    DialogOverviewExampleDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgbModule,
    MatDividerModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent, ListComponent]
})
export class AppModule { }
