import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net-bs4'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-viewbooks',
  templateUrl: './viewbooks.component.html',
  styleUrls: ['./viewbooks.component.css']
})
export class ViewbooksComponent implements OnInit {
  bookObj:any;
  temp: boolean=false; 
  constructor(private hc:HttpClient) { }

  ngOnInit() {
    this.hc.get('/admin/admindashboard/bookslist').subscribe((res)=>{
      this.bookObj=res["data"];
      this.temp = true;
      $(function() {
        $(document).ready(function() {
          $('#example').DataTable();
        });
      });
    })
  }

}
