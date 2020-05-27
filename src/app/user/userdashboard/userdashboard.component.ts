import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

 
  constructor(private ls:LoginService,private ar:ActivatedRoute,private hc:HttpClient) { }
  username:string;
  userLoginStatus:Boolean;
  userObj:object;
  ngOnInit() {
    
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
  });
  this.ar.paramMap.subscribe(param=>{
    this.username=param.get("username");
     this.hc.get(`/user/userdashboard/${this.username}`).subscribe((objOfres:object)=>{
         this.userObj=objOfres["data"];
         this.userLoginStatus=this.ls.userLoginStatus;
         console.log("in userdashboard",this.userObj);
     })
  });
  }
getuserobjfromDb()
{ 
  console.log("this.userObj username",this.userObj["userid"]);
this.hc.get(`/user/userdashboardfinduser/${this.userObj["userid"]}`).subscribe((objOfres:object)=>{
  this.userObj=objOfres["data"];
});
console.log("in usergetuserfromsb",this.userObj);
return this.userObj;
}
  changestatus()
  {
    this.ls.userLoginStatus=false;
    this.ls.doLogout();
  }
  

}
