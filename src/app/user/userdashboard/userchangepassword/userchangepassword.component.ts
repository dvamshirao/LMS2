import { Component, OnInit } from '@angular/core';
import { UserdashboardComponent } from '../userdashboard.component';
import { UserobjService } from 'src/app/userobj.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userchangepassword',
  templateUrl: './userchangepassword.component.html',
  styleUrls: ['./userchangepassword.component.css']
})
export class UserchangepasswordComponent implements OnInit {
  constructor(private us:UserdashboardComponent,private uos:UserobjService,private router:Router) { }
userObj:object;
secquestatus:boolean=false;
secquestatusverify:boolean=false;
changepasswordstatus:boolean=false;
secques:string="";
  ngOnInit() {
    this.userObj=this.us.userObj;
    if (this.userObj["secques"]==null)
    {
      this.secquestatus=true;
    }
    else{
      this.secques=this.userObj["secques"];
      this.secquestatusverify=true;
    }
  }
  submitsecques2(secqobj){
    if (this.userObj["secans"]==secqobj.secans)
    {
      alert("verification succesful");
     this.changepasswordstatus=true;
     this.secquestatusverify=false;
    }
    else{
      alert("Wrong Answer");
    }
  }
  submitsecques1(secqobj){
    secqobj["userid"]=this.userObj["userid"];
    console.log(secqobj);
    this.uos.addsecques(secqobj).subscribe((res)=>{
      if(res["message"]=="added successfully")
      {
        alert("Added successfully");
        this.secquestatus=false;
        this.router.navigate(['/userdashboard',this.userObj["username"]]);
      }
      else{

        console.log("here is error in uscg",res);
      }
    }) 
    this.userObj=this.us.getuserobjfromDb();
  }
  submitcp(secqobj){
    secqobj["userid"]=this.userObj["userid"];
    console.log("cp fun obj",secqobj);
    this.uos.changepasswrd(secqobj).subscribe((res)=>{
      if(res["message"]=="password successfully updated")
      {
        alert("password successfully updated");
        this.secquestatus=false;
        this.secquestatusverify=true;
        this.changepasswordstatus=false;
      }
      else{
        alert(res["message"]);
        console.log("here is error in uscg",res);
      }
    });
  }
}
