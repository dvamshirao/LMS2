import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  //inject httplient obj
  constructor(private hc:HttpClient) { }
  //method to make http post req
  doRegister(userObj):Observable<any>
  {
    return this.hc.post('/user/register',userObj);
  }
  doRegistertest(bookObj):Observable<any>
  {
    return this.hc.post('/admin/bookregister',bookObj);
  }
  userRegister(userObj):Observable<any>
  {
    return this.hc.post('/admin/userRegister',userObj);
  }
}
