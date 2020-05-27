import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserdashboardComponent } from '../userdashboard.component';
import { UserobjService } from 'src/app/userobj.service';


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
      alert(res["message"]);
    });
  }

}
