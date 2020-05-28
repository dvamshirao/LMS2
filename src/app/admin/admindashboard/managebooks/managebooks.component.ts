import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-managebooks',
  templateUrl: './managebooks.component.html',
  styleUrls: ['./managebooks.component.css']
})
export class ManagebooksComponent implements OnInit {
bookid:string;
bookObj:object;
editbuttonstatus:boolean=false;
bookobjstatus:boolean=false;
  constructor(private hc:HttpClient) { }

  ngOnInit() {
  }
  getbookid(bookid) {
    this.bookid=bookid;
    if(!(this.bookid==null || this.bookid.trim()=="")){
    this.hc.get(`/admin/admindashboard/circulation/issuefindbook/${this.bookid}`).subscribe((objOfres:object)=>{
    this.bookObj=objOfres["data"];
    if (this.bookObj!=null){
    this.bookobjstatus=true;}
    else{
    this.bookid='';
    alert("enter correct book number");
  }
  });}
  else{
    Swal.fire({
      icon: 'error',
      title: 'Fill all details!',
     
    });  
  }
 }
 editbook(obj)
 {
   if(this.isvalid(obj)){
     this.hc.put('admin/editbook',obj).subscribe((res)=>{
       if(res["message"]=="book details updated")
       {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Book details edited Successfully',
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
       this.bookobjstatus=false;  
   }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Fill all details!',
     
    });  
   }
  }
    delswalbook(obj){
        if(this.isvalid(obj)){
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do You ant to delete Book-'+obj["bookid"] +'!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Delete!',
          cancelButtonText: 'No, back'
        }).then((result) => {
          if (result.value) {
           this.delbook(obj);
      
          } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'book not deleted :)',
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
  delbook(obj)
  {
    this.hc.put('/admin/deletebookid',obj).subscribe((res=>{
     if(res["message"]=="book deleted")
     {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Book deleted Successfully',
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
