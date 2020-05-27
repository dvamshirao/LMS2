import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net-bs4'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-displaybookrequests',
  templateUrl: './displaybookrequests.component.html',
  styleUrls: ['./displaybookrequests.component.css']
})
export class DisplaybookrequestsComponent implements OnInit {
 bookrequestsobj:any;
 temp: boolean=false;
  constructor(private hc:HttpClient) { }

  ngOnInit() {
    this.hc.get('/admin/displaybookrequests').subscribe((res)=>{
      this.bookrequestsobj=res["data"];
      this.temp=true;
      $(function() {
        $(document).ready(function() {
          $('#displayreqexample').DataTable();
        });
      });

     
    });

  }

}
