import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { group } from '@angular/animations';

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
  constructor(private hc:HttpClient,private datePipe:DatePipe) { }
  
  ngOnInit() {
      this.issuedate=this.datePipe.transform(this.myDate,'yyyy-MM-dd');
      console.log(this.issuedate);
  }
 
  getbookid(bookid) {
    this.bookid=bookid;
    console.log("book id is",this.bookid);
  this.hc.get(`/admin/admindashboard/circulation/issuefindbook/${this.bookid}`).subscribe((objOfres:object)=>{
    this.bookObj=objOfres["data"];
    if (this.bookObj!=null){
    this.bookobjstatus=true;}
    else{
    this.bookid='';
    alert("enter correct book number");
  }
  });
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
/*

*/
submitForm(obj)
  {
    if(this.isvalid(obj)){
      this.hc.post('/admin/issue',obj).subscribe((res)=>{
        alert(res["message"]);   
         });
         this.issuedate=this.datePipe.transform(this.myDate,'yyyy-MM-dd');
         this.bookobjstatus=false;
         this.userobjstatus=false;
         this.issuedate=this.issuedate;
    }
    else{
      this.issuedate=this.issuedate;
     alert("Please fill all details properly!")
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
