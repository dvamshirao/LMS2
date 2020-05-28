import { Component, OnInit } from '@angular/core';
import { UserdashboardComponent } from '../userdashboard.component';
import { UserobjService } from 'src/app/userobj.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss'

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
    if(this.isvalid(secqobj)){
    if (this.userObj["secans"]==secqobj.secans)
    {
      Swal.fire({
        icon: 'success',
        title: 'Correct!',
        text: "verification succesful",
        showConfirmButton: false,
        timer: 1500
      });
     this.changepasswordstatus=true;
     this.secquestatusverify=false;
    }
    else{
      Swal.fire({
        icon: 'error',
        text: 'Wrong Answer!',
       
      });
    }
  }
  else{
    Swal.fire({
      icon: 'error',
      text: 'Fill all details!',
     
    });  
  }
  }
  submitsecques1(secqobj){
    if(this.isvalid(secqobj)){
    secqobj["userid"]=this.userObj["userid"];
    this.uos.addsecques(secqobj).subscribe((res)=>{
      if(res["message"]=="added successfully")
      {
        Swal.fire({
          icon: 'success',
          title: 'Succes!',
          text: "Security Question Added",
          showConfirmButton: false,
          timer: 1500
        });
        this.secquestatus=false;
        this.router.navigate(['/userdashboard',this.userObj["username"]]);
      }
      else{

        console.log("here is error in uscg",res);
      }
    }) 
    this.userObj=this.us.getuserobjfromDb();
  }
  else{
    Swal.fire({
      icon: 'error',
      text: 'Fill all details!',
     
    });  
  }
  }
  submitcp(secqobj){
    if(this.isvalid(secqobj)){
    secqobj["userid"]=this.userObj["userid"];
    console.log("cp fun obj",secqobj);
    this.uos.changepasswrd(secqobj).subscribe((res)=>{
      if(res["message"]=="password successfully updated")
      {
        Swal.fire({
          icon: 'success',
          title: 'Succes!',
          text: "Password Updated",
          showConfirmButton: false,
          timer: 1500
        });
        this.secquestatus=false;
        this.secquestatusverify=true;
        this.changepasswordstatus=false;
      }
      else{
        Swal.fire({
          icon: 'error',
          text: res["message"],
         
        });
       
      }
    });}
    else{
      Swal.fire({
        icon: 'error',
        text: 'Fill all details!',
       
      });  
    }
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
