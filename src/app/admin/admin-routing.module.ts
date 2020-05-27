import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { NotifydelaysComponent } from './admindashboard/notifydelays/notifydelays.component';
import { IssueComponent } from './admindashboard/issue/issue.component';
import { ReturnComponent } from './admindashboard/return/return.component';
import { ProjectlistComponent } from './admindashboard/projectlist/projectlist.component';
import { AddprojectsComponent } from './admindashboard/addprojects/addprojects.component';
import { BookslistComponent } from './admindashboard/bookslist/bookslist.component';
import { AddbooksComponent } from './admindashboard/addbooks/addbooks.component';
import { AdduserComponent } from './admindashboard/adduser/adduser.component';
import { ViewusersComponent } from './admindashboard/viewusers/viewusers.component';
import { ChangepasswordComponent } from './admindashboard/changepassword/changepassword.component';
import { ManageusersComponent } from './admindashboard/manageusers/manageusers.component';
import { ManagebooksComponent } from './admindashboard/managebooks/managebooks.component';
import { IssuedetailsComponent } from './admindashboard/issuedetails/issuedetails.component';
import { AdmindashComponent } from './admindashboard/admindash/admindash.component';
import { DisplaybookrequestsComponent } from './admindashboard/displaybookrequests/displaybookrequests.component';



const routes: Routes = [
  {path:'admindashboard',component:AdmindashboardComponent,children:[
    {path:'dashboard',component:AdmindashComponent},
    {path:'notifydelays',component:NotifydelaysComponent},
    {path:'circulation/issue',component:IssueComponent},
    {path:'circulation/return',component:ReturnComponent},
    {path:'circulation/issuedetails',component:IssuedetailsComponent},
    {path:'projects/projectslist',component:ProjectlistComponent},
    {path:'projects/addproject',component:AddprojectsComponent},
    {path:'books/bookslist',component:BookslistComponent},
    {path:'books/addbooks',component:AddbooksComponent},
    {path:'books/managebooks',component:ManagebooksComponent},
    {path:'users/adduser',component:AdduserComponent},
    {path:'users/viewusers',component:ViewusersComponent},
    {path:'users/manageusers',component:ManageusersComponent},
    {path:'profile/changepassword',component:ChangepasswordComponent},
    {path:'displaybookrequests',component:DisplaybookrequestsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
