import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    //check for token in local storage
    let token=localStorage.getItem("token");
    //if token is not existed
    //forward req object
    if(token==undefined)
    {
      return next.handle(req);
    }
    //if token is present clone token and forward
    let clonedReqObj=req.clone({
      headers:req.headers.set('Authorization','Bearer '+token)
    });
    //forward to next interceptor/backend
    return next.handle(clonedReqObj);
   }
}
