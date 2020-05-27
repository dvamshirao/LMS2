import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net-bs4'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-issuedetails',
  templateUrl: './issuedetails.component.html',
  styleUrls: ['./issuedetails.component.css']
})
export class IssuedetailsComponent implements OnInit {
issueObj:object;
returnissueObj:object;
temp1:boolean=false;
temp2:boolean=false;
  constructor(private hc:HttpClient) { }

  ngOnInit() {
    this.hc.get('admin/getissuedetails').subscribe((objOfres:object)=>{
      this.issueObj=objOfres["data"];
      this.temp1 = true;
      $(function() {
        $(document).ready(function() {
          $('#example1').DataTable();
        });
      }); 
      
});
this.hc.get('admin/getissuereturndetails').subscribe((objOfres:object)=>{
  this.returnissueObj=objOfres["data"];
  this.temp2 = true;
  $(function() {
    $(document).ready(function() {
      $('#example2').DataTable();
    });
  }); 
}); 
     
  } 
}
