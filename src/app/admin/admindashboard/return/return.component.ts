import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css'],
  providers:[DatePipe]
})
export class ReturnComponent implements OnInit {
  bookid:string;
  userid1:string;
  userObj:object;
  bookObj:object;
  issueObj:object;
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
   console.log(this.dateofreturn);
  }
 
  getbookid(bookid) {
    this.bookid=bookid;
    console.log("book id is",this.bookid);
  this.hc.get(`/admin/admindashboard/circulation/issuefindbook/${this.bookid}`).subscribe((objOfres:object)=>{
    this.bookObj=objOfres["data"];
    if (this.bookObj==null)
    {
      alert(objOfres["message"]);
    }
    else{
      this.bookobjstatus=true;}
   console.log("this is book obj",this.bookObj);});
    
 } 
 getuserid(userid) {
  this.userid1=userid;
  console.log("user id is",this.userid1);
  this.hc.get(`/admin/admindashboard/circulation/issuefinduser/${this.userid1}`).subscribe((objOfres:object)=>{
    this.userObj=objOfres["data"];
    if (this.userObj==null)
    {
      alert(objOfres["message"]);
    }
    else{
      this.userobjstatus=true;}
});
}
getissuedetails(bid)
{
  this.bid=bid;
  console.log("bid id is",this.bid);
  this.hc.get(`/admin/admindashboard/circulation/returnfindbid/${this.bid}`).subscribe((objOfres:object)=>{
    this.issueObj=objOfres["data"];
    if (this.issueObj==null)
    {
      alert(objOfres["message"]);
    }
    else{
    this.getissuedetailsstatus=true;}
  });
}

  submitForm(returnobj)
  {
    if(this.isvalid(returnobj)){
      this.hc.post('/admin/return',returnobj).subscribe((res)=>{
        alert(res["message"]);   
         });
         this.bookobjstatus=false;
         this.userobjstatus=false;
         this.getissuedetailsstatus=false;
    }
    else{
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
