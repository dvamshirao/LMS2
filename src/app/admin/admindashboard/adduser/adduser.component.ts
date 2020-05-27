import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from 'src/app/register.service';
import { Router } from '@angular/router';

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
    this.rs.userRegister(userObj).subscribe((res)=>{
      if(res["message"]=="username already existed")
      {
        alert("username already existed");        
      }
      if(res["message"]=="register successfully")
      {
        alert("registered successfully")
        //navigate to login compoenent
        this.router.navigate(['./admindashboard/users/adduser'])
      }
    })
  }
  
    
   }

