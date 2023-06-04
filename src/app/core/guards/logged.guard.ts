import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate, CanActivateChild {

  private canAccessSubject = new BehaviorSubject<boolean>(false);
  canAccess$ = this.canAccessSubject.asObservable();

  constructor(private _authService: AuthService){
    this._authService.currentUser$.subscribe(x => {
      if (x?.email) {
        this.canAccessSubject.next(true);
      }else {
        this.canAccessSubject.next(false);
      }
    })
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>{
      return this.canAccess$
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.canAccess$
  }
  
}
