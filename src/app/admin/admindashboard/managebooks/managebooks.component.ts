import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-managebooks',
  templateUrl: './managebooks.component.html',
  styleUrls: ['./managebooks.component.css']
})
export class ManagebooksComponent implements OnInit {
bookid:string;
bookObj:object;
bookobjstatus:boolean=false;
  constructor(private hc:HttpClient) { }

  ngOnInit() {
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
 editbook(obj)
 {
   if(this.isvalid(obj)){
     this.hc.put('admin/editbook',obj).subscribe((res)=>{
       if(res["message"]=="book details updated")
       {
         alert("book details updated succesfully");
       }
       else{
         alert(res["message"]);
       }
     });
       this.bookobjstatus=false;  
   }
   else{
     alert("Please fill all details properly!");
   }
       }

  delbook(obj)
  {
    console.log("in del book fun",obj['ISBNnumber'],obj['bookid'])
   if(this.isvalid(obj)){
    this.hc.put('/admin/deletebookid',obj).subscribe((res=>{
     if(res["message"]=="book deleted")
     {
       alert("book deleted succesfully");
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
