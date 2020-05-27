import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net-bs4'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notifydelays',
  templateUrl: './notifydelays.component.html',
  styleUrls: ['./notifydelays.component.css']
})

export class NotifydelaysComponent implements OnInit {
  userObj:any;
  temp: boolean=false; 
  constructor(private hc:HttpClient) { }

  ngOnInit() {
    this.hc.get('/admin/admindashboard/notifydelays').subscribe((res)=>{
      this.userObj=res["data"];
      this.temp = true;
      console.log(this.userObj);

      $(function() {
        $(document).ready(function() {
          $('#delaysexample').DataTable();
        });
      });
      

    })
  }

}