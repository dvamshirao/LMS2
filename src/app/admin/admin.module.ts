import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { NotifydelaysComponent } from './admindashboard/notifydelays/notifydelays.component';
import { IssueComponent } from './admindashboard/issue/issue.component';
import { ReturnComponent } from './admindashboard/return/return.component';
import { ProjectlistComponent } from './admindashboard/projectlist/projectlist.component';
import { AddprojectsComponent } from './admindashboard/addprojects/addprojects.component';
import { AddbooksComponent } from './admindashboard/addbooks/addbooks.component';
import { BookslistComponent } from './admindashboard/bookslist/bookslist.component';
import { AdduserComponent } from './admindashboard/adduser/adduser.component';
import { ViewusersComponent } from './admindashboard/viewusers/viewusers.component';
import { ChangepasswordComponent } from './admindashboard/changepassword/changepassword.component';
import { ManageusersComponent } from './admindashboard/manageusers/manageusers.component';
import { ManagebooksComponent } from './admindashboard/managebooks/managebooks.component';
import { IssuedetailsComponent } from './admindashboard/issuedetails/issuedetails.component';
import { AdmindashComponent } from './admindashboard/admindash/admindash.component';
import { DisplaybookrequestsComponent } from './admindashboard/displaybookrequests/displaybookrequests.component';
import { ProjcirculationComponent } from './admindashboard/projcirculation/projcirculation.component';
import { ProjissuedetailsComponent } from './admindashboard/projissuedetails/projissuedetails.component';


@NgModule({
  declarations: [
    AdmindashboardComponent,
     NotifydelaysComponent, 
     IssueComponent, 
     ReturnComponent, 
     ProjectlistComponent, 
     AddprojectsComponent, 
     AddbooksComponent, 
     BookslistComponent, 
     AdduserComponent, 
     ViewusersComponent, 
     ChangepasswordComponent, 
     ManageusersComponent, 
     ManagebooksComponent, 
     IssuedetailsComponent, 
     AdmindashComponent, 
     DisplaybookrequestsComponent,
     ProjcirculationComponent,
     ProjissuedetailsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
