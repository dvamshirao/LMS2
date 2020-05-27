import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Data1Service {

  //to make http req
  //inject HttpClient object from root injector
  constructor(private hc:HttpClient) { }

  // make http req on that object
  getData():Observable<object[]>
  {
    return this.hc.get<object[]>('https://jsonplaceholder.typicode.com/posts');
  }

  //make another http request
  getUserData():Observable<object[]>
  {
    console.log();
    return this.hc.get<object[]>('https://reqres.in/api/users');
  }
  
}
