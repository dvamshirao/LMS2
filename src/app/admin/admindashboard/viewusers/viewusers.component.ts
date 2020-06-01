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
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit {
  name = 'This is XLSX TO JSON CONVERTER';
willDownload = false;
viewcheck:boolean;
userObj:any;
temp: boolean=false; 
jsonData=null;
j;
filename:string="";
  constructor(private hc:HttpClient,private excelService:ExcelServiceService,private ls:LoginService,private router:Router) { }
  ngOnInit() {
    this.hc.get('/admin/admindashboard/manageusers/viewusers').subscribe((objOfres:object)=>{
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
      this.userObj=objOfres["data"];
      for(let i=0;i<this.userObj.length;i++)
      {
      delete this.userObj[i].secans;
      delete this.userObj[i].secques;
      delete this.userObj[i]._id;
     }
      this.temp = true;
     console.log("this is user obj",this.userObj);
     $(function() {
      $(document).ready(function() {
        $('#userexample').DataTable();
      });
    }); 
  }
});

  }
  exportAsXLSX1():void {
    this.excelService.exportAsExcelFile(this.userObj, 'userdetails');
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
  uploaduserdetails()
  {
    this.hc.post('admin/admindashboard/books/bookslist/uploadbooksdata',this.jsonData[this.j]).subscribe((objOfres:object)=>{
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
      Swal.fire({
        icon: 'success',
        title: 'Uploaded!',
        text: "user details uploaded succesfully",
      });
    });
  }

 
}
