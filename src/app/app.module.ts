import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './features/home/home.component';
import { PrimeNgModule } from './core/prime-ng.module';
import { LoginComponent } from './features/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersDeckComponent } from './components/users-deck/users-deck.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SigninComponent } from './features/signin/signin.component';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserTypePipe } from './pipes/user-type.pipe';
import { UsersManagerComponent } from './features/users-manager/users-manager.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    UsersDeckComponent,
    SigninComponent,
    NewUserFormComponent,
    UserTypePipe,
    UsersManagerComponent,
  ],
  imports: [
    CoreModule,
    PrimeNgModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
		ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
