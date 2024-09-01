import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminauthorGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (sessionStorage.getItem('access')) {
      return true;
    } else {
       
      return this.router.parseUrl('/navbar/admin');
    }
  }
}
