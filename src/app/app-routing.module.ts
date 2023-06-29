import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { SigninComponent } from './features/signin/signin.component';
import { UsersManagerComponent } from './features/users-manager/users-manager.component';
import { MyProfileComponent } from './features/my-profile/my-profile.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signin', component:SigninComponent},
  {path: 'users-manager', component:UsersManagerComponent},
  {path: 'my-profile', component:MyProfileComponent},
  {path: 'appointments', loadChildren: () => import('./features/lazy-load/lazy-load.module').then(m => m.LazyLoadModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
