import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { LoginService } from 'src/app/login.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor(private router:Router,private ls:LoginService) { }

  ngOnInit() {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
  });
  }
  changestatus()
  { 
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do You Wish to Logout!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Logout!',
        cancelButtonText: 'No, Stay here'
      }).then((result) => {
        if (result.value) {
        Swal.fire(
          'Logged Out!',
          'You have been Logged out.',
          'success'
        )
        this.ls.adminLoginStatus=false;
        this.ls.doLogout();
        this.router.navigate(['../../']);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'You are here :)',
          'error'
        )
        }
      })
}
}
