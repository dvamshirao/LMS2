import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  canActivate():boolean {
   
    //read token from local storage
    let token=localStorage.getItem("signedJwtToken");

    if(token!=undefined)
    {
      return true;
    }
    else
    {
      alert("plz login to access this route");
      return false;
    }

  }
  
}
