import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
  providers:[DatePipe]
})
export class IssueComponent implements OnInit {
  bookid:string;
  userid:string; 
  userObj:object;
  bookObj:object;
  bookobjstatus:boolean=false;
  userobjstatus:boolean=false;
  myDate=new Date();
  issuedate:any;
  constructor(private hc:HttpClient,private datePipe:DatePipe,private ls:LoginService,private router:Router) { }
  
  ngOnInit() {
      this.issuedate=this.datePipe.transform(this.myDate,'yyyy-MM-dd');
      console.log(this.issuedate);
  }
 
  getbookid(bookid) {
    this.bookid=bookid;
    if(!(this.bookid==null || this.bookid.trim()=="")){
        this.hc.get(`/admin/admindashboard/circulation/issuefindbook/${this.bookid}`).subscribe((objOfres:object)=>{
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
        this.bookObj=objOfres["data"];
        if (this.bookObj!=null){
          this.bookobjstatus=true;}
        else{
          this.bookid='';
          Swal.fire({
            icon: 'error',
            text: 'enter correct book number!',
            }); 
            }
          }
          });
        }
    else{
      this.bookobjstatus=false;
      this.userobjstatus=false; 
      Swal.fire({
        icon: 'error',
        text: 'Fill all details!',
     });  
  }
 } 
 getuserid(userid) {
  this.userid=userid;
  if(!(this.userid==null || this.userid.trim()=="")){
  this.hc.get(`/admin/admindashboard/circulation/issuefinduser/${this.userid}`).subscribe((objOfres:object)=>{
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
    this.userObj=objOfres["data"];
    if(this.userObj!=null){
    this.userobjstatus=true;}
    else{
      this.userid="";
      Swal.fire({
        icon: 'error',
        text: 'enter correct user id!',
       
      }); }
    }
});}
else{
  this.bookobjstatus=false;
  this.userobjstatus=false; 
  Swal.fire({
    icon: 'error',
    text: 'Fill all details!',
   
  });  
  
}
}
/*

*/
submitForm(obj)
  {
    if(this.isvalid(obj)){
      this.hc.post('/admin/issue',obj).subscribe((res)=>{
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
        if(res["message"]=="book issued"){
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Book Issued Successfully',
          showConfirmButton: false,
          timer: 1500
        });}
        else{
          Swal.fire({
            icon: 'error',
            text: res["message"],
          });  
        }
      }
         });
         this.issuedate=this.datePipe.transform(this.myDate,'yyyy-MM-dd');
         this.bookobjstatus=false;
         this.userobjstatus=false;
         this.issuedate=this.issuedate;
    }
    else{
      this.issuedate=this.issuedate;
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
