import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net-bs4'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit {
userObj:any;
temp: boolean=false; 
  constructor(private hc:HttpClient) { }
  ngOnInit() {
    this.hc.get('/admin/admindashboard/manageusers/viewusers').subscribe((objOfres:object)=>{
      this.userObj=objOfres["data"];
      this.temp = true;
    // console.log("this is user obj",this.userObj);
     $(function() {
      $(document).ready(function() {
        $('#userexample').DataTable();
      });
    }); 
});

  }
 
}
