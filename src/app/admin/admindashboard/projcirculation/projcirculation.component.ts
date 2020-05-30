import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-projcirculation',
  templateUrl: './projcirculation.component.html',
  styleUrls: ['./projcirculation.component.css'],
  providers:[DatePipe]
})
export class ProjcirculationComponent implements OnInit {
  projid:string;
  userid:string; 
  userObj:object;
  projObj:object;
  iprojobjstatus:boolean=false;
  iuserobjstatus:boolean=false;
  
/*** */
projissueObj:object;
rprojobjstatus:boolean=false;
ruserobjstatus:boolean=false;
getprojissuedetailsstatus:boolean=false;

  myDate=new Date();
  issuedate:any;
  constructor(private hc:HttpClient,private datePipe:DatePipe) { }
  
  ngOnInit() {
      this.issuedate=this.datePipe.transform(this.myDate,'yyyy-MM-dd');
      console.log(this.issuedate);
  }
 
  getprojid(projid) {
    this.projid=projid;
    if(!(this.projid==null || this.projid.trim()=="")){
        this.hc.get(`/admin/findprojid/${this.projid}`).subscribe((objOfres:object)=>{
        this.projObj=objOfres["data"];
        if (this.projObj!=null){
          this.iprojobjstatus=true;}
        else{
          this.projid='';
          Swal.fire({
            icon: 'error',
            text: 'enter correct project Id!',
            }); 
            }
          });
        }
    else{
      this.iprojobjstatus=false;
      this.iuserobjstatus=false; 
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
    this.iuserobjstatus=true;}
    else{
      this.userid="";
      Swal.fire({
        icon: 'error',
        text: 'enter correct user id!',
       
      }); }
});}
else{
  this.iprojobjstatus=false;
  this.iuserobjstatus=false; 
  Swal.fire({
    icon: 'error',
    text: 'Fill all details!',
   
  });  
  
}
}

getrprojid(projid) {
  this.projid=projid;
  if(!(this.projid==null || this.projid.trim()=="")){
      this.hc.get(`/admin/findprojid/${this.projid}`).subscribe((objOfres:object)=>{
      this.projObj=objOfres["data"];
      if (this.projObj!=null){
        this.rprojobjstatus=true;
      }
      else{
        this.projid='';
        Swal.fire({
          icon: 'error',
          text: 'enter correct project Id!',
          }); 
          }
        });
        
      }
  else{
    this.rprojobjstatus=false;
    this.ruserobjstatus=false; 
    Swal.fire({
      icon: 'error',
      text: 'Fill all details!',
   });  
}
} 
getruserid(userid) {
this.userid=userid;
if(!(this.userid==null || this.userid.trim()=="")){
this.hc.get(`/admin/admindashboard/circulation/issuefinduser/${this.userid}`).subscribe((objOfres:object)=>{
  this.userObj=objOfres["data"];
  if(this.userObj!=null){
  this.ruserobjstatus=true;}
  else{
    this.userid="";
    Swal.fire({
      icon: 'error',
      text: 'enter correct user id!',
     
    }); }
});}
else{
this.rprojobjstatus=false;
this.ruserobjstatus=false; 
Swal.fire({
  icon: 'error',
  text: 'Fill all details!',
 
});  

}
}

getprojissuedetails(projid)
{
  if(!(projid==null || projid.trim()=="")){
  this.hc.get(`/admin/returnfindprojid/${projid}`).subscribe((objOfres:object)=>{
    this.projissueObj=objOfres["data"];
    console.log(this.projissueObj);
    if (this.projissueObj==null)
    { 
       Swal.fire({
        icon: 'error',
        text: objOfres["message"],
       
      });
      
    }
    else{
    this.getprojissuedetailsstatus=true;
    
  }
  });}else{
    this.getprojissuedetailsstatus=false;
    Swal.fire({
      icon: 'error',
      text: 'Fill all details!',
     
    });  
    
  }
}

/*

*/
issueproj(obj)
  {
    if(this.isvalid(obj)){
      this.hc.post('/admin/projissue',obj).subscribe((res)=>{
        if(res["message"]=="project issued"){
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'project Issued Successfully',
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
         this.issuedate=this.datePipe.transform(this.myDate,'yyyy-MM-dd');
         this.iprojobjstatus=false;
         this.iuserobjstatus=false;
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
  /************************************************ */

  returnproj(returnobj)
  {
    if(this.isvalid(returnobj)){
      this.hc.post('/admin/projreturn',returnobj).subscribe((res)=>{
        if(res["message"]=="project returned successfully"){
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'project Returned Successfully',
            showConfirmButton: false,
            timer: 1500
          });
          this.rprojobjstatus=false;
          this.ruserobjstatus=false;
          this.getprojissuedetailsstatus=false;
        }
          else{
            Swal.fire({
              icon: 'error',
              text: res["message"],
            });  
          }  
         });
        
        
         this.rprojobjstatus=false;
         this.ruserobjstatus=false;
         this.getprojissuedetailsstatus=false;
    }
    else{
      this.rprojobjstatus=false;
      this.ruserobjstatus=false;
      this.getprojissuedetailsstatus=false;
      Swal.fire({
        icon: 'error',
        text: 'Fill all details!',
       
      });  
    }
  }



  /************************** */
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
 