import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net-bs4'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bookslist',
  templateUrl: './bookslist.component.html',
  styleUrls: ['./bookslist.component.css']
})
export class BookslistComponent implements OnInit {
  bookObj:any;
  temp: boolean=false; 
  constructor(private hc:HttpClient) { }

  ngOnInit() {
    this.hc.get('/admin/admindashboard/bookslist').subscribe((res)=>{
      this.bookObj=res["data"];
      this.temp = true; 
      $(function() {
        $(document).ready(function() {
          $('#booksexample').DataTable();
        });
      });
    })
  }

}