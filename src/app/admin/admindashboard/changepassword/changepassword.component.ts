import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})

export class ChangepasswordComponent implements OnInit {
  adminid:string;
  username:String;
  
  changepasswordstatus:boolean=false;
  constructor(private ls:LoginService,private hc:HttpClient,private router:Router) { }
 
  ngOnInit() {
    this.username=this.ls.username;
  }
  sub(obj)
  { if(this.isvalid(obj)){
    console.log(obj.changedusername);
    this.hc.post(`/admin/changeusername/${this.ls.adminid}`,obj).subscribe((res)=>{
      if(res["message"]=="username successfully updated")
      {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: res["message"]+"- Relogin to continue",
        });
        this.ls.doLogout();
        this.router.navigate(['vnrlms']);

      }

    });}
    else{
      Swal.fire({
        icon: 'error',
        title: 'Fill all details!',
       
      });  
    }
    
  }
  submitForm(obj)
  {
    if(this.isvalid(obj)){
    console.log(this.ls.adminid);
    
    this.hc.post(`/admin/verifysecuritykey/${this.ls.adminid}`,obj).subscribe((res)=>{
      if(res["message"]=="security key successfully verified")
      {
        Swal.fire({
          icon: 'success',
          title: 'Correct!',
          text: res["message"],
          showConfirmButton: false,
          timer: 1500
        });
        this.changepasswordstatus=true;
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
  submit(obj)
  {
    if(this.isvalid(obj)){
    
    if(obj.password==obj.reenteredpassword)
    {
      this.hc.post(`/admin/changepassword/${this.ls.adminid}`,obj).subscribe((res)=>{

        if(res["message"]=="password successfully updated")
        {
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: res["message"]+"- Relogin to continue",
          });
          this.ls.doLogout();
          this.router.navigate(['vnrlms']);

        }

      });
    }
    else{
      Swal.fire({
        icon: 'error',
        text: "Password Missmatch",
      }); 
    }}
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
