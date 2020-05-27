import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
})
export class ManageusersComponent implements OnInit {
  labelstatus:string="labeltop";
  editstatus:boolean=true;
  userid:string;
  userObj:object;
  userobjstatus:boolean=false;
  constructor(private hc:HttpClient) { }

  ngOnInit() {
    
  }
  getuserid(userid) {
    this.userid=userid;
    console.log("user id is",this.userid);
    this.hc.get(`/admin/admindashboard/circulation/issuefinduser/${this.userid}`).subscribe((objOfres:object)=>{
      this.userObj=objOfres["data"];
      if(this.userObj!=null){
      this.userobjstatus=true;}
      else{
        this.userid="";
      alert("enter correct user details");}
  });
  }
  edituser(obj)
  {
    console.log("userid in edit",obj);
    if(this.isvalid(obj)){
      this.hc.put('admin/edituser',obj).subscribe((res)=>{
        if(res["message"]=="user details updated")
        {
          alert("user details updated succesfully");
        }
        else{
          alert(res["message"]);
        }
      });
        this.userobjstatus=false;  
    }
    else{
      alert("Please fill all details properly!");
    }
        }

   deluser(obj)
   {
    if(this.isvalid(obj)){
    console.log("userid in deluser func ts",obj);
     this.hc.delete(`/admin/deleteuser/${obj['userid']}`).subscribe((res=>{
      if(res["message"]=="user deleted")
      {
        alert("user deleted succesfully");
      }
      else{
        alert(res["message"]);
      }
     }));
    }
    else{
      alert("Please fill all details properly!");
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
