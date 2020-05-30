import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net-bs4'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css']
})
export class ProjectlistComponent implements OnInit {
  projObj:any;
  temp: boolean=false; 
    constructor(private hc:HttpClient) { }
    ngOnInit() {
      this.hc.get('admin/viewprojects').subscribe((objOfres:object)=>{
        this.projObj=objOfres["data"];
        this.temp = true;
       $(function() {
        $(document).ready(function() {
          $('#projexample').DataTable();
        });
      }); 
  });
  
    }
   
  }
  