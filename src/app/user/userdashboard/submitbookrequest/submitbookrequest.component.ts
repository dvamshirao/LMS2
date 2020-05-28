import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserdashboardComponent } from '../userdashboard.component';
import { UserobjService } from 'src/app/userobj.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-submitbookrequest',
  templateUrl: './submitbookrequest.component.html',
  styleUrls: ['./submitbookrequest.component.css']
})
export class SubmitbookrequestComponent implements OnInit {
  

  constructor(private hc:HttpClient,private us:UserdashboardComponent,private uos:UserobjService) {}


  ngOnInit() {
  }
  submit(obj)
  { 
    obj["userid"]=this.us.userObj["userid"];
    obj["username"]=this.us.userObj["username"];
    this.uos.sendreq(obj).subscribe((res)=>{
      Swal.fire({
        icon: 'info',
        text: res["message"],
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

}
