import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor(private ls:LoginService) { }

  ngOnInit() {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
  });
  }
  changestatus()
  {
    
    this.ls.adminLoginStatus=false;
    console.log("gotit",this.ls.adminLoginStatus);
    this.ls.doLogout();
  }

}
