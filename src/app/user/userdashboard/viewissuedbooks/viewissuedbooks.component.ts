import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net-bs4'
import { HttpClient } from '@angular/common/http';
import { UserdashboardComponent } from '../userdashboard.component';

@Component({
  selector: 'app-viewissuedbooks',
  templateUrl: './viewissuedbooks.component.html',
  styleUrls: ['./viewissuedbooks.component.css']
})
export class ViewissuedbooksComponent implements OnInit {
  userissueObj:any;
  username:string;
  viewusertemp:boolean=false;
  constructor(private hc:HttpClient,private us:UserdashboardComponent) { }

  ngOnInit() {
    this.username=this.us.username;
    this.hc.get(`user/viewissuedbooks/${this.us.userObj["userid"]}`).subscribe((objOfres:object)=>{
      this.userissueObj=objOfres["data"];
      this.viewusertemp = true;
     console.log("this is userissue obj",this.userissueObj);
     $(function() {
      $(document).ready(function() {
        $('#userissueexample').DataTable();
      });
    }); 
});
  }
 
}
