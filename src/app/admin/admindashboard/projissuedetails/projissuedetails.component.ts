import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net-bs4'
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projissuedetails',
  templateUrl: './projissuedetails.component.html',
  styleUrls: ['./projissuedetails.component.css']
})
export class ProjissuedetailsComponent implements OnInit {
  issueObj:object;
  returnissueObj:object;
  temp1:boolean=false;
  temp2:boolean=false;
  constructor(private hc:HttpClient,private ls:LoginService,private router:Router) { }

  ngOnInit() {
    this.hc.get('admin/getprojissuedetails').subscribe((objOfres:object)=>{
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
      this.issueObj=objOfres["data"];
      this.temp1 = true;
      $(function() {
        $(document).ready(function() {
          $('#example1').DataTable();
        });
      }); 
    }
      
});
this.hc.get('admin/getprojissuereturndetails').subscribe((objOfres:object)=>{
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
  this.returnissueObj=objOfres["data"];
  this.temp2 = true;
  $(function() {
    $(document).ready(function() {
      $('#example2').DataTable();
    });
  }); 
}
}); 
     
  }

}
