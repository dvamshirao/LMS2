import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net-bs4';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import {ExcelServiceService} from 'src/app/excel-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css']
})
export class ProjectlistComponent implements OnInit {
  projObj:any;
  temp: boolean=false;
  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;
  viewcheck:boolean;
  jsonData=null;
  j;
  filename:string="";
    constructor(private hc:HttpClient,private excelService:ExcelServiceService,private ls:LoginService,private router:Router) { }
    ngOnInit() {
      this.hc.get('admin/viewprojects').subscribe((objOfres:object)=>{
        if(objOfres["message"]=="Please relogin to continue...")
      {
        Swal.fire(
          'Session timed Out!',
          'please relogin to continue.',
          'success'
        )
      //  console.log("yes");
        this.ls.adminLoginStatus=false;
        this.ls.doLogout();
        this.router.navigate(['../../']);
        
      }
      else{
        
        this.projObj=objOfres["data"];
        console.log(this.projObj)
        this.temp = true;
       $(function() {
        $(document).ready(function() {
          $('#projexample').DataTable();
        });
      }); 
    }
  });
  
    }
    exportAsXLSX1():void {
      this.excelService.exportAsExcelFile(this.projObj, 'projdetails');
    }
    onFileChange(ev) {
      this.viewcheck=true;
      
      let workBook = null;
   //   let jsonData = null;
      const reader = new FileReader();
      const file = ev.target.files[0];
      this.filename=file.name;
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        this.jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
     //   const dataString = JSON.stringify(jsonData);
        for(var i in this.jsonData){
           this.j=i;
          break;
  
        }
        //var arr=jsonData[j];
        
        for(let i=0;i<this.jsonData[this.j].length;i++)
        {
          this.jsonData[this.j][i].secques="";
          this.jsonData[this.j][i].secans="";
        }
        console.log(this.jsonData[this.j]);
       // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
       
     //   this.hc.post('/admin/uploadbooks',jsonData[j]).subscribe((res)=>{
      //    alert(res["message"]);   
      //  });
      }
      reader.readAsBinaryString(file);
    }
    uploadprojdetails()
  {
    this.hc.post('admin/admindashboard/projects/projectslist/uploadprojects',this.jsonData[this.j]).subscribe((objOfres:object)=>{
      if(objOfres["message"]=="Please relogin to continue...")
      {
        Swal.fire(
          'Session timed Out!',
          'please relogin to continue.',
          'success'
        )
      //  console.log("yes");
        this.ls.adminLoginStatus=false;
        this.ls.doLogout();
        this.router.navigate(['../../']);
        
      }
      else{
        Swal.fire({
          icon: 'success',
          title: 'Uploaded!',
          text: "projects details uploaded succesfully",
        });
      }
    });
  }

   
  }
  