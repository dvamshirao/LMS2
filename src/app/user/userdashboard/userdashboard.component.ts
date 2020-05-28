import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

 
  constructor(private ls:LoginService,private ar:ActivatedRoute,private hc:HttpClient,private router:Router) { }
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
     })
  });
  }
getuserobjfromDb()
{ 
  console.log("this.userObj username",this.userObj["userid"]);
this.hc.get(`/user/userdashboardfinduser/${this.userObj["userid"]}`).subscribe((objOfres:object)=>{
  this.userObj=objOfres["data"];
});
return this.userObj;
}
  changestatus()
  {
    Swal.fire({
      title: 'Are you sure '+this.userObj["username"]+' ?',
      text: 'Do You Wish to Logout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout!',
      cancelButtonText: 'No, Stay '
    }).then((result) => {
      if (result.value) {
      Swal.fire(
        'Logged Out!',
        'You have been Logged out.',
        'success'
      )
      this.ls.userLoginStatus=false;
      this.ls.doLogout();
      this.router.navigate(['../../']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'You are here :)',
        'error'
      )
      }
    })
   
  }
  

}
