import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net-bs4'
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-displaybookrequests',
  templateUrl: './displaybookrequests.component.html',
  styleUrls: ['./displaybookrequests.component.css']
})
export class DisplaybookrequestsComponent implements OnInit {
 bookrequestsobj:any;
 temp: boolean=false;
  constructor(private hc:HttpClient,private ls:LoginService,private router:Router) { }

  ngOnInit() {
    this.hc.get('/admin/displaybookrequests').subscribe((res)=>{
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
      this.bookrequestsobj=res["data"];
      this.temp=true;
      $(function() {
        $(document).ready(function() {
          $('#displayreqexample').DataTable();
        });
      });

    }
    });

  }

}
