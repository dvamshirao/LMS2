import { Component, OnInit } from '@angular/core';
import { UserdashboardComponent } from '../userdashboard.component';
import { UserobjService } from 'src/app/userobj.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-userupdatedetails',
  templateUrl: './userupdatedetails.component.html',
  styleUrls: ['./userupdatedetails.component.css']
})
export class UserupdatedetailsComponent implements OnInit {
  editstatus:boolean=true;
  displaystatus:boolean=false;
  userObj:object;
  labelstatus:string="labeltop";
  userstring:string="";
  constructor(private us:UserdashboardComponent,private uos:UserobjService,private router:Router,private ls:LoginService) {}
  ngOnInit() {
this.userObj=this.us.userObj;
this.displaystatus=true;
this.userstring=this.userObj["username"];

  }
  submitform(userobj)
  {if(this.isvalid(userobj)){
    userobj["userid"]=this.us.userObj["userid"];
    console.log("in submot form",userobj);
    this.uos.edituserdetails(userobj).subscribe((res)=>{
      if(res["message"]=="Please relogin to continue...")
      {
        Swal.fire(
          'Session timed Out!',
          'please relogin to continue.',
          'success'
        )
      //  console.log("yes");
        this.ls.userLoginStatus=false;
        this.ls.doLogout();
        this.router.navigate(['../../']);
        
      }
      else{
      if(res["message"]=="user details updated")
      {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: "user details updated succesfully",
        });
        this.router.navigate(['/userdashboard',this.userObj["username"]]);
      }
      else{
        Swal.fire({
          icon: 'error',
          text: res["message"],
        });  
      }
    }
    });
  }
  else{
    Swal.fire({
      icon: 'error',
      text: 'Fill all details!',
     
    });  
  }
}
edituser()
{
  this.editstatus=false;
  this.labelstatus="label";
  this.userstring="Edit "+this.userObj["username"];
}
isvalid(obj)
  {
    var f:boolean=true;
    for (var key in obj) {
      if(obj[key]==null || obj[key].trim()==""){
        f=false;
        break;
      }  
  }
  return f;
}
}
