import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  username:String;
  adminid:string;
  userid:string;
  userLoginStatus:Boolean=false;
  adminLoginStatus:Boolean=false;


  //inject HttpClient
  constructor(private hc:HttpClient) { }
  
  //a method to make http post request
  doLoginuser(userObj):Observable<any>
  {
    return this.hc.post('/user/login',userObj);
  }
  doLoginadmin(adminObj):Observable<any>
  {
    return this.hc.post('/admin/login',adminObj);
  }
  doLogout()
  {
    localStorage.removeItem("token");
  
  }

}
