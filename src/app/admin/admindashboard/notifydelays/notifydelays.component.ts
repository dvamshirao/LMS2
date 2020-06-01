import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net-bs4'
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-notifydelays',
  templateUrl: './notifydelays.component.html',
  styleUrls: ['./notifydelays.component.css']
})

export class NotifydelaysComponent implements OnInit {
  userObj:any;
  temp: boolean=false; 
  constructor(private hc:HttpClient,private ls:LoginService,private router:Router) { }

  ngOnInit() {
    this.hc.get('/admin/admindashboard/notifydelays').subscribe((res)=>{
      if(res["message"]=="Please relogin to continue...")
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
      this.userObj=res["data"];
      this.temp = true;
      console.log(this.userObj);

      $(function() {
        $(document).ready(function() {
          $('#delaysexample').DataTable();
        });
      });
    }

    })
  }

}