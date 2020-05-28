import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from 'src/app/register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
 

  constructor(private hc:HttpClient,private rs:RegisterService,private router:Router) { }

  ngOnInit() {
  } 
  submitForm(userObj){
    if(this.isvalid(userObj)){
    this.rs.userRegister(userObj).subscribe((res)=>{
      if(res["message"]=="userid already existed")
      {
        Swal.fire({
          icon: 'error',
          title: 'Invalid userid!',
          text: 'User already exists',
        });       
      }
      if(res["message"]=="register successfully")
      {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User Registered Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['./admindashboard/users/adduser'])
      }
    }) ;
  }
  else{
    Swal.fire({
      icon: 'error',
      title: 'Fill all details!',
     
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

