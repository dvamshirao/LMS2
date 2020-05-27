import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserobjService {

  constructor(private hc:HttpClient) { }
  addsecques(secquesObj):Observable<any>{
    return this.hc.post('user/addsecques',secquesObj);
  }
  sendreq(reqobj):Observable<any>{
    return this.hc.post('user/submitbookrequest',reqobj);
  }
  changepasswrd(secquesObj):Observable<any>{
    return this.hc.put('user/changepassword',secquesObj);
  }
  edituserdetails(userObj):Observable<any>{
    return this.hc.put('user/edituser',userObj);
  }
}
