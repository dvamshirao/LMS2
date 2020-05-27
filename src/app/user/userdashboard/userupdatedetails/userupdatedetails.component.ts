import { Component, OnInit } from '@angular/core';
import { UserdashboardComponent } from '../userdashboard.component';
import { UserobjService } from 'src/app/userobj.service';
import { Router } from '@angular/router';

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
  constructor(private us:UserdashboardComponent,private uos:UserobjService,private router:Router) {}
  ngOnInit() {
this.userObj=this.us.userObj;
this.displaystatus=true;
this.userstring=this.userObj["username"];
console.log("in profile",this.userObj)
  }
  submitform(userobj)
  {
    userobj["userid"]=this.us.userObj["userid"];
    console.log("in submot form",userobj);
    this.uos.edituserdetails(userobj).subscribe((res)=>{
      if(res["message"]=="user details updated")
      {
        alert("user details updated succesfully");
        this.router.navigate(['/userdashboard',this.userObj["username"]]);
      }
      else{
        alert(res["message"]);
      }
    });
  }
edituser()
{
  this.editstatus=false;
  this.labelstatus="label";
  this.userstring="Edit "+this.userObj["username"];
}
}
