import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from './models';
import { StorageDataService } from './services/storage-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(private router: Router) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin();
  }

 

  private checkLogin(): boolean {
    // chiamare il service e verificare le credenziali
    let storage = new StorageDataService();
    
    if (storage.session.exists("CurrentUser")) {
      return true;
    } 
    this.router.navigate(['/login']);
    return false;
  }
  
}
