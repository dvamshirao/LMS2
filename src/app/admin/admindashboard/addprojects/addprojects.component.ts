import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss'
import { RegisterService } from 'src/app/register.service';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addprojects',
  templateUrl: './addprojects.component.html',
  styleUrls: ['./addprojects.component.css']
})
export class AddprojectsComponent implements OnInit {
  projid:string;
  projObj:object;
  editbuttonstatus:boolean=false;
  projobjstatus:boolean=false;
  constructor(private hc:HttpClient,private rs:RegisterService,private ls:LoginService,private router:Router) { }

  ngOnInit() {
  }

  addproj(projObj){
    if(this.isvalid(projObj)){
      projObj["status"]=false;
    this.rs.projRegister(projObj).subscribe((res)=>{
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
      if(res["message"]=="project already exists")
      {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Project Id!',
          text: 'Project already exists',
        });       
      }
      if(res["message"]=="project registered succsessfully")
      {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Project Registered Successfully',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    }) ;
  }
  else{
    Swal.fire({
      icon: 'error',
      text: 'Fill all details!',
     
    });  
  }
  }

  /*********************************************** */
  getprojid(projid) {
    this.projid=projid;
    if(!(this.projid==null || this.projid.trim()=="")){
    this.hc.get(`/admin/findprojid/${this.projid}`).subscribe((objOfres:object)=>{
      if(objOfres["message"]=="Please relogin to continue...")
      {
        Swal.fire(
          'Session timed Out!',
          'please relogin to continue.',
          'success'
        )
      //  console.log("yes");
        this.ls.adminLoginStatus=false;
        this.ls.doLogout();
        this.router.navigate(['../../']);
        
      }
      else{
    this.projObj=objOfres["data"];
    if (this.projObj!=null){
    this.projobjstatus=true;
    this.editbuttonstatus=true;
  }
    else{
    this.projid='';
    Swal.fire({
      icon: 'error',
      text: 'Enter correct Project Id!',
     
    });  
  }
}
  });}
  else{
    Swal.fire({
      icon: 'error',
      text: 'Fill all details!',
     
    });   
  }}
/************************************************************** */
  editproj(obj)
 {
   if(this.isvalid(obj)){
     this.hc.put('admin/editproj',obj).subscribe((res)=>{
      if(res["message"]=="Please relogin to continue...")
      {
        Swal.fire(
          'Session timed Out!',
          'please relogin to continue.',
          'success'
        )
      //  console.log("yes");
        this.ls.adminLoginStatus=false;
        this.ls.doLogout();
        this.router.navigate(['../../']);
        
      }
      else{
       if(res["message"]=="project details updated")
       {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Project details edited Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.projobjstatus=false;
        this.editbuttonstatus=false;
       }
       else{
        Swal.fire({
          icon: 'error',
          text: res["message"]
        });  
       }
      }
     });
       this.projobjstatus=false;  
   }
   else{
    Swal.fire({
      icon: 'error',
      text: 'Fill all details!',
     
    });  
   }
  }
  editpid(obj)
 {
   if(this.isvalid(obj)){
     this.hc.put('admin/editpid',obj).subscribe((res)=>{
      if(res["message"]=="Please relogin to continue...")
      {
        Swal.fire(
          'Session timed Out!',
          'please relogin to continue.',
          'success'
        )
      //  console.log("yes");
        this.ls.adminLoginStatus=false;
        this.ls.doLogout();
        this.router.navigate(['../../']);
        
      }
      else{
       if(res["message"]=="project details updated")
       {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Project Id updated Successfully',
          showConfirmButton: false,
          timer: 1500
        });
       }
       else{
        Swal.fire({
          icon: 'error',
          text: res["message"]
        });  
       }
      }
     });
       this.projobjstatus=false;  
   }
   else{
    Swal.fire({
      icon: 'error',
      text: 'Fill all details!',
     
    });  
   }
  }
/************************************************************** */
delswalproj(obj){
  if(this.isvalid(obj)){
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do You ant to delete Project-'+obj["projid"] +'!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Delete!',
    cancelButtonText: 'No, back'
  }).then((result) => {
    if (result.value) {
     this.delproj(obj);

    } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'project not deleted :)',
      'error'
    )
    }
  })
}
else{
  Swal.fire({
    icon: 'error',
    text: 'Fill all details!',
   
  });  
}
}
delproj(obj)
{
  this.hc.delete(`/admin/deleteproj/${obj['projid']}`).subscribe((res=>{
    if(res["message"]=="Please relogin to continue...")
      {
        Swal.fire(
          'Session timed Out!',
          'please relogin to continue.',
          'success'
        )
      //  console.log("yes");
        this.ls.adminLoginStatus=false;
        this.ls.doLogout();
        this.router.navigate(['../../']);
        
      }
      else{
if(res["message"]=="project deleted")
{
Swal.fire({
  icon: 'success',
  title: 'Success!',
  text: 'Project deleted Successfully',
  showConfirmButton: false,
  timer: 1500
});
}
else{
Swal.fire({
  icon: 'error',
  text: res["message"]
}); 
}}
}));
}  

/****************************************************************** */
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
