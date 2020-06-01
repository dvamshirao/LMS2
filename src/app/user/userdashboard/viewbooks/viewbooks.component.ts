import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net-bs4'
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-viewbooks',
  templateUrl: './viewbooks.component.html',
  styleUrls: ['./viewbooks.component.css']
})
export class ViewbooksComponent implements OnInit {
  bookObj:any;
  temp: boolean=false; 
  constructor(private hc:HttpClient,private router:Router,private ls:LoginService) { }

  ngOnInit() {
    this.hc.get('/admin/admindashboard/bookslist').subscribe((res)=>{
      if(res["message"]=="Please relogin to continue...")
      {
        Swal.fire(
          'Session timed Out!',
          'please relogin to continue.',
          'success'
        )
      //  console.log("yes");
        this.ls.userLoginStatus=false;
        this.ls.doLogout();
        this.router.navigate(['../../']);
        
      }
      else{
      this.bookObj=res["data"];
      this.temp = true;
      $(function() {
        $(document).ready(function() {
          $('#example').DataTable();
        });
      });
    }
    })
  }

}
