import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RegisterService } from 'src/app/register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-addbooks',
  templateUrl: './addbooks.component.html',
  styleUrls: ['./addbooks.component.css']
})
export class AddbooksComponent implements OnInit {
  
  constructor(private hc:HttpClient,private rs:RegisterService,private router:Router) { }
 
  arra:Object[]=[];
  ngOnInit() {
  }
  submitForm(bookObj)
  {
    if(this.isvalid(bookObj)){
    
    console.log(bookObj["ids"]);
    var arr=bookObj["ids"].split(",");
    for(let i in arr)
    {
      console.log(arr[i]);
      var dat={};
      dat["bid"]=arr[i];
      dat["status"]=false;
      //dat[arr[i]]=false;
       
       console.log(dat);
       this.arra.push(dat);
 
    }
    bookObj.ids=this.arra;
    bookObj.count=arr.length;
    this.arra=[];
    //delete bookObj.Enterids;
    console.log(bookObj);
    //send useObj to register service
    this.rs.doRegistertest(bookObj).subscribe((res)=>{
      if(res["message"]=="book registered succsessfully")
      {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Book Registered Successfully',
          showConfirmButton: false,
          timer: 1500
        });
      }
      else
      {
        Swal.fire({ 
          icon: 'error',
          text: res["message"],
         
        });  
      }
    })
  }
  else{
    Swal.fire({ 
      icon: 'error',
      text: 'Fill all details!',
     
    });  
  }
  }
  submitForm1(bookObj)
  {
    if(this.isvalid(bookObj)){
    
    console.log(bookObj["ids"]);
    var arr=bookObj["ids"].split(",");
    for(let i in arr)
    {
      console.log(arr[i]);
      var dat={};
      dat["bid"]=arr[i];
      dat["status"]=false;
      //dat[arr[i]]=false;
       
       console.log(dat);
       this.arra.push(dat);
 
    }
    bookObj.ids=this.arra;
    bookObj.count=arr.length;
    this.arra=[];
    //delete bookObj.Enterids;
    console.log(bookObj);
    //send useObj to register service
    this.rs.doRegistertest1(bookObj).subscribe((res)=>{
      if(res["message"]=="book added to existed isbc")
      {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Book Added to existing Book Successfully',
          showConfirmButton: false,
          timer: 1500
        });
      }
      else
      {
        Swal.fire({ 
          icon: 'error',
          text: res["message"],
         
        });  
      }
    })
  }
  else{
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
