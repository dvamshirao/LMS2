import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RegisterService } from 'src/app/register.service';
import { Router } from '@angular/router';

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
      if(res["message"]=="book added to existed isbc")
      {
        alert("book added to existed isbc");
      }
      if(res["message"]=="book registered succsessfully")
      {
        alert("book register successful")
        //navigate to login compoenent
        this.router.navigate(['./admindashboard/books/addbooks'])
      }
    })
  }
}
