import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss'


@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
})
export class ManageusersComponent implements OnInit {
  labelstatus:string="labeltop";
  editstatus:boolean=true;
  editbuttonstatus:boolean=false;
  userid:string;
  userObj:object;
  userobjstatus:boolean=false;
  constructor(private hc:HttpClient) { }
 
  ngOnInit() {
    
  }
  getuserid(userid) {
    this.userid=userid;
    if(!(this.userid==null || this.userid.trim()=="")){
    this.hc.get(`/admin/admindashboard/circulation/issuefinduser/${this.userid}`).subscribe((objOfres:object)=>{
      this.userObj=objOfres["data"];
      if(this.userObj!=null){
      this.userobjstatus=true;
      this.editbuttonstatus=true;
    }
      else{
        this.userid="";
        this.editbuttonstatus=false;
        Swal.fire({
          icon: 'error',
          title: 'Invalid details!',
          text: 'Enter correct userid',
        });  }
  });}
  else{
    Swal.fire({
      icon: 'error',
      title: 'Fill all details!',
     
    });  
  }
  }
  edituser(obj)
  {
    
    if(this.isvalid(obj)){
      this.hc.put('admin/edituser',obj).subscribe((res)=>{
        if(res["message"]=="user details updated")
        {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'User details edited Successfully',
            showConfirmButton: false,
            timer: 1500
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: res["message"]
          });  
        }
      });
        this.userobjstatus=false;  
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Fill all details!',
       
      });  
    }
        }
delswaluser(obj){
  if(this.isvalid(obj)){
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do You ant to delete User-'+obj["userid"] +'!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Delete!',
    cancelButtonText: 'No, back'
  }).then((result) => {
    if (result.value) {
     this.deluser(obj);

    } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'user not deleted :)',
      'error'
    )
    }
  })
}
else{
  Swal.fire({
    icon: 'error',
    title: 'Fill all details!',
   
  });  
}
}
   deluser(obj)
   {
     this.hc.delete(`/admin/deleteuser/${obj['userid']}`).subscribe((res=>{
      if(res["message"]=="user deleted")
      {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User deleted Successfully',
          showConfirmButton: false,
          timer: 1500
        });
      }
      else{
        Swal.fire({
          icon: 'error',
          title: res["message"]
        }); 
      }
     }));
 
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
