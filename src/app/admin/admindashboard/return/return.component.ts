import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css'],
  providers:[DatePipe]
})
export class ReturnComponent implements OnInit {
  bookid:string;
  userid:string;
  userObj:object;
  bookObj:object;
  issueObj:object;
  disablebid:boolean=false;
  disablebno:boolean=false;
  disableuno:boolean=false;
  bookobjstatus:boolean=false;
  userobjstatus:boolean=false;
  getissuedetailsstatus:boolean=false;
  myDate=new Date();
  bid:string;
dateofreturn:any;
  constructor(private hc:HttpClient,private datePipe:DatePipe) { }
  inputText :string = "I am sample text";
  ngOnInit() {
   this.dateofreturn=this.datePipe.transform(this.myDate,'yyyy-MM-dd');
   //console.log(this.dateofreturn);
  }
 
  getbookid(bookid) {
    this.bookid=bookid;
    if(!(this.bookid==null || this.bookid.trim()=="")){
        this.hc.get(`/admin/admindashboard/circulation/issuefindbook/${this.bookid}`).subscribe((objOfres:object)=>{
        this.bookObj=objOfres["data"];
        if (this.bookObj!=null){
          this.disablebno=true;
          this.bookobjstatus=true;}
        else{
          this.bookid='';
          Swal.fire({
            icon: 'error',
            text: 'enter correct book number!',
            }); 
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
    this.userObj=objOfres["data"];
    if(this.userObj!=null){
      this.disableuno=true;
    this.userobjstatus=true;}
    else{
      this.userid="";
      Swal.fire({
        icon: 'error',
        text: 'enter correct user id!',
       
      }); }
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
getissuedetails(bid)
{
  this.bid=bid;
  if(!(this.bid==null || this.bid.trim()=="")){
  this.hc.get(`/admin/admindashboard/circulation/returnfindbid/${this.bid}`).subscribe((objOfres:object)=>{
    this.issueObj=objOfres["data"];
    if (this.issueObj==null)
    { 
       Swal.fire({
        icon: 'error',
        text: objOfres["message"],
       
      });
    }
    else{
    this.disablebid=true;
    this.getissuedetailsstatus=true;}
  });}else{
    this.disablebno=false;
    this.disablebid=false;
    this.disableuno=false;
    this.bookobjstatus=false;
    this.userobjstatus=false; 
    Swal.fire({
      icon: 'error',
      text: 'Fill all details!',
     
    });  
    
  }
}

  submitForm(returnobj)
  {
    if(this.isvalid(returnobj)){
      this.hc.post('/admin/return',returnobj).subscribe((res)=>{
        if(res["message"]=="bookreturned successfully"){
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Book Returned Successfully',
            showConfirmButton: false,
            timer: 1500
          });}
          else{
            Swal.fire({
              icon: 'error',
              text: res["message"],
            });  
          }  
         });
         this.disablebno=false;
         this.disablebid=false;
         this.disableuno=false;
         this.bookobjstatus=false;
         this.userobjstatus=false;
         this.getissuedetailsstatus=false;
    }
    else{
      this.disablebno=false;
      this.disablebid=false;
      this.disableuno=false;
      this.bookobjstatus=false;
      this.userobjstatus=false;
      this.getissuedetailsstatus=false;
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
