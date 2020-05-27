import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  {
    var obj=obj.value;
    console.log(obj.changedusername);
    this.hc.post(`/admin/changeusername/${this.ls.adminid}`,obj).subscribe((res)=>{
      alert(res["message"]+"\nRelogin to continue");
      if(res["message"]=="username successfully updated")
      {

        this.ls.doLogout();
        this.router.navigate(['vnrlms']);

      }

    });
    
  }
  submitForm(obj1)
  {
    
   var obj=obj1.value;
    console.log(this.ls.adminid);
    
    this.hc.post(`/admin/verifysecuritykey/${this.ls.adminid}`,obj).subscribe((res)=>{
      alert(res["message"]);
      if(res["message"]=="security key successfully verified")
      {
        this.changepasswordstatus=true;
      }
      else{
      obj1.reset();
      }
      
    });
    console.log(obj);

   
  }
  submit(obj1)
  {
    var obj=obj1.value;
    if(obj.password==obj.reenteredpassword)
    {
      this.hc.post(`/admin/changepassword/${this.ls.adminid}`,obj).subscribe((res)=>{
        alert(res["message"]+"\nRelogin to continue");
        if(res["message"]=="password successfully updated")
        {

          this.ls.doLogout();
          this.router.navigate(['vnrlms']);

        }

      });
    }
    else{
      alert("passwords mismatch");
      obj1.reset();
    }
  }

}
