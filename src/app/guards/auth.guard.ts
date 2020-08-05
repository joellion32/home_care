import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
 
  constructor(private auth: AuthenticationService){}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.validateToken();
  }
}
