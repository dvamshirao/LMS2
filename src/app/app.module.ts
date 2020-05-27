import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { UserdashboardComponent } from './user/userdashboard/userdashboard.component';
import { AuthorizationService } from './authorization.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifydelaysComponent } from './admin/admindashboard/notifydelays/notifydelays.component';
import { IssueComponent } from './admin/admindashboard/issue/issue.component';
import { ReturnComponent } from './admin/admindashboard/return/return.component';
import { ProjectlistComponent } from './admin/admindashboard/projectlist/projectlist.component';
import { AddprojectsComponent } from './admin/admindashboard/addprojects/addprojects.component';
import { AddbooksComponent } from './admin/admindashboard/addbooks/addbooks.component';
import { BookslistComponent } from './admin/admindashboard/bookslist/bookslist.component';
import { AdduserComponent } from './admin/admindashboard/adduser/adduser.component';
import { ViewusersComponent } from './admin/admindashboard/viewusers/viewusers.component';
import { UpdatedetailsComponent } from './admin/admindashboard/updatedetails/updatedetails.component';
import { ChangepasswordComponent } from './admin/admindashboard/changepassword/changepassword.component';
import { UserupdatedetailsComponent } from './user/userdashboard/userupdatedetails/userupdatedetails.component';
import { UserchangepasswordComponent } from './user/userdashboard/userchangepassword/userchangepassword.component';
import { ViewissuedbooksComponent } from './user/userdashboard/viewissuedbooks/viewissuedbooks.component';
import { SubmitbookrequestComponent } from './user/userdashboard/submitbookrequest/submitbookrequest.component';
import { DataTablesModule } from 'angular-datatables';
import { ManageusersComponent } from './admin/admindashboard/manageusers/manageusers.component';
import { ManagebooksComponent } from './admin/admindashboard/managebooks/managebooks.component';
import { IssuedetailsComponent } from './admin/admindashboard/issuedetails/issuedetails.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { AdmindashComponent } from './admin/admindashboard/admindash/admindash.component';
import { UserdashComponent } from './user/userdashboard/userdash/userdash.component';
import { ViewbooksComponent } from './user/userdashboard/viewbooks/viewbooks.component';
import { DisplaybookrequestsComponent } from './admin/admindashboard/displaybookrequests/displaybookrequests.component';




@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    AdmindashboardComponent,
    UserdashboardComponent,
    NotifydelaysComponent,
    IssueComponent,
    ReturnComponent,
    IssuedetailsComponent,
    ProjectlistComponent,
    AddprojectsComponent,
    AddbooksComponent,
    BookslistComponent,
    ManagebooksComponent,
    AdduserComponent,
    ViewusersComponent,
    ManageusersComponent,
    UpdatedetailsComponent,
    ChangepasswordComponent,
    UserupdatedetailsComponent,
    UserchangepasswordComponent,
    ViewissuedbooksComponent,
    SubmitbookrequestComponent,
    AdmindashComponent,
    UserdashComponent,
    ViewbooksComponent,
    DisplaybookrequestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    DataTablesModule,
    Ng2PageScrollModule,
    BrowserAnimationsModule
   
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthorizationService,
      multi:true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
